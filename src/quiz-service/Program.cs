using System.Reflection;
using Serilog;
using Serilog.Exceptions;

namespace quiz_service;

public static class Program
{
    public static void Main(string[] args)
    {
        ConfigureLogging();
        CreateHost(args);
    }

    private static void CreateHost(string[] args)
    {
        try
        {
            Log.Information($"Starting {Assembly.GetExecutingAssembly().GetName().Name}");
            CreateHostBuilder(args).ConfigureAppConfiguration(conf => {
                conf.AddEnvironmentVariables("QUIZ-API_");
            }).Build().Run();
        }
        catch (Exception ex)
        {
            Log.Fatal($"Failed to start {Assembly.GetExecutingAssembly().GetName().Name}", ex);
            throw;
        }
    }

    private static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args).UseSerilog()
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
    
    private static void ConfigureLogging()
    {
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile(
                $"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json",
                optional: true)
            .Build();

        Log.Logger = new LoggerConfiguration()
            .Enrich.FromLogContext()
            .Enrich.WithExceptionDetails()
            .Enrich.WithMachineName()
            .WriteTo.Debug()
            .WriteTo.Console()
            .Enrich.WithProperty("Environment", environment)
            .ReadFrom.Configuration(configuration)
            .CreateLogger();
    }
}