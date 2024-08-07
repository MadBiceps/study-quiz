using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.IdentityModel.Tokens;
using Prometheus;
using quiz_service.Extensions;
using quiz_service.Middleware;
using quiz_service.Models.Database;
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
        
        // Add authentication
        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidAudience = Configuration["JWT:ValidAudience"],
                ValidIssuer = Configuration["JWT:ValidIssuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"] ?? "122eec266463b500b8dd7819f0ce84e0d2f3302c13bb08746d52bdc210bce93c"))
            };
        });
        
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
                options => options
                    .WithOrigins(Configuration.GetValue<string[]>("Host") ?? new[] { "localhost:4200", "localhost:5152" })
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
        }
        else
        {
            app.UseCors(
                options => options
                    .WithOrigins("http://localhost:4200", "http://localhost:5152")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
        }

        app.UseRouting();
        app.UseHttpMetrics();
        app.UseAuthentication();
        app.UseAuthorization();
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