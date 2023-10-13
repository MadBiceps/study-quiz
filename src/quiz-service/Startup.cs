using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Prometheus;
using quiz_service.Extensions;
using quiz_service.Middleware;
using quiz_service.Persistence;
using Serilog;
using Serilog.Exceptions;
using ILogger = Serilog.ILogger;

namespace quiz_service;

public class Startup
{
    public Startup(IConfiguration configuration, IWebHostEnvironment env)
    {
        Configuration = configuration;
        Env = env;
        Log.Logger = new LoggerConfiguration()
            .Enrich.FromLogContext()
            .Enrich.WithExceptionDetails()
            .Enrich.WithMachineName()
            .WriteTo.Debug()
            .WriteTo.Console()
            .Enrich.WithProperty("Environment", env.EnvironmentName)
            .ReadFrom.Configuration(configuration)
            .CreateLogger();
    }

    public IConfiguration Configuration { get; }

    public IWebHostEnvironment Env { get; set; }

    public readonly ILogger Logger = Log.Logger;

    public void ConfigureServices(IServiceCollection services)
    {
        // register HttpClientFactoryService
        services.AddHttpClient();
        services.AddDataProvider(Configuration);
        services.AddController();
        services.AddSwagger();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbContext dbContext)
    {
        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseSerilogRequestLogging();
        app.UseHttpsRedirection();
        //app.UseMiddleware<RequestResponseLoggingMiddleware>();
        app.UseMiddleware<ExceptionHandlingMiddleware>();

        app.UseHealthChecks("/api/health", new HealthCheckOptions
        {
            ResultStatusCodes =
            {
                [HealthStatus.Healthy] = StatusCodes.Status200OK,
                [HealthStatus.Degraded] = StatusCodes.Status200OK,
                [HealthStatus.Unhealthy] = StatusCodes.Status503ServiceUnavailable
            },
            ResponseWriter = HealthCheckExtensions.WriteResponse
        });

        if (!env.IsDevelopment())
        {
            app.UseCors(
                options => options.WithOrigins(Configuration.GetValue<string>("Host") ?? "localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
        }
        else
        {
            app.UseCors(
                options => options.WithOrigins("localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
        }

        app.UseRouting();
        app.UseHttpMetrics();
        // app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapMetrics("/api/metrics");
        });

        // Migrate EF Core
        try
        {
            if (dbContext.Database.IsRelational())
            {
                dbContext.Database.MigrateAsync().Wait();
            }
        }
        catch (Exception e)
        {
            Logger.Error(e, e.Message);
        }
    }
}