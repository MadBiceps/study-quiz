using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using quiz_service.Attributes;
using quiz_service.Mapping;
using quiz_service.Middleware;
using quiz_service.Persistence;
using quiz_service.Swagger;
using quiz_service.Versioning;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace quiz_service.Extensions;

public static class DataExtensions
{
    public static void AddDataProvider(this IServiceCollection services, IConfiguration configuration)
    {
        if (string.IsNullOrEmpty(configuration.GetValue<string>("Database:ConnectionString")))
        {
            // Add InMemory Database for testing
            services.AddDbContext<ApplicationDbContext>(opt =>
            {
                opt.UseLazyLoadingProxies()
                    .UseInMemoryDatabase("quiz-api")
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging();
            });
            
            services.AddDbContextFactory<ApplicationDbContext>(opt =>
                opt
                    .UseLazyLoadingProxies()
                    .UseInMemoryDatabase("quiz-api")
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging(), ServiceLifetime.Scoped);
        }
        else
        {
            // Add db to ef core
            services.AddDbContext<ApplicationDbContext>(opt =>
            {
                opt.UseLazyLoadingProxies()
                    .UseNpgsql(configuration.GetValue<string>("Database:ConnectionString"),
                        x => x.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName))
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging();
            });
        
            // Create db factory
            services.AddDbContextFactory<ApplicationDbContext>(opt =>
                opt
                    .UseLazyLoadingProxies()
                    .UseNpgsql(configuration.GetValue<string>("Database:ConnectionString"),
                        x => x.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName))
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging(), ServiceLifetime.Scoped);
        }
        
        // Add services from portal-service.infrastructure
        var infrastructureLayerAssembly = Assembly.GetAssembly(typeof(InjectableInterfaceAttribute));
        if (infrastructureLayerAssembly != null)
        {
            services.AddProviders(infrastructureLayerAssembly);
        }
        
        // Add services from portal-service.core.api
        services.AddProviders(Assembly.GetExecutingAssembly());
        services
            .AddHealthChecks()
            .AddDbContextCheck<ApplicationDbContext>();
    }

    public static void AddMapper(this IServiceCollection service)
    {
        service.AddAutoMapper(typeof(GeneralMappingProfile));
    }
    
    public static void AddController(this IServiceCollection service)
    {
        service.AddMvc(config =>
        {
            config.UseCentralRoutePrefix(new RouteAttribute("api/v{version:apiVersion}"));
            config.AllowEmptyInputInBodyModelBinding = true;

            foreach (var formatter in config.InputFormatters)
            {
                if (formatter.GetType() == typeof(SystemTextJsonInputFormatter))
                    ((SystemTextJsonInputFormatter)formatter).SupportedMediaTypes.Add(
                        MediaTypeHeaderValue.Parse("text/plain"));
            }
        }).AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        });

        service.AddControllers().AddNewtonsoftJson();
        service.AddApiVersioning(options =>
        {
            options.ReportApiVersions = true;
        });
        service.AddVersionedApiExplorer(options =>
        {
            options.GroupNameFormat = "'v'VVV";
            options.SubstituteApiVersionInUrl = true;
        });
    }
    
    public static void AddSwagger(this IServiceCollection services)
    {
        services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

        services.AddSwaggerGen(options =>
        {
            options.OperationFilter<SwaggerDefaultValues>();
            options.DocumentFilter<HealthChecksFilter>();
        });
    }
    
    private static void AddProviders(this IServiceCollection services, Assembly assembly)
    {
        var injectableProviders = assembly?.DefinedTypes
            .Where(x =>
            {
                var dipAttr = x.GetCustomAttributes()
                    .FirstOrDefault(y => y.GetType() == typeof(InjectableProviderAttribute));
                return dipAttr != null;
            }).Select(x =>
                new
                {
                    Info = x,
                    LifeTime = (((InjectableProviderAttribute)x.GetCustomAttributes()
                        .FirstOrDefault(y => y.GetType() == typeof(InjectableProviderAttribute))!)!).Type
                }).ToList();

        if (injectableProviders == null)
            return;
        foreach (var injectableProvider in injectableProviders)
        {
            var injectProviderType = injectableProvider.Info.UnderlyingSystemType;
            var injectInterface = injectProviderType.GetInterfaces().SingleOrDefault(x =>
                x.GetCustomAttributes()
                .FirstOrDefault(y => y.GetType() == typeof(InjectableInterfaceAttribute)) != null);
            if(injectInterface == null)
                continue;
            var injectInterfaceType = injectInterface.UnderlyingSystemType;
            services.Add(
                new ServiceDescriptor(injectInterfaceType, injectProviderType, injectableProvider.LifeTime));
        }
      
        services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddScoped<ExceptionHandlingMiddleware>();
        services.AddMapper();
    }
}