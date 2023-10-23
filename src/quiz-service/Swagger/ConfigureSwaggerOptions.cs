using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace quiz_service.Swagger;

public class ConfigureSwaggerOptions : IConfigureOptions<SwaggerGenOptions>
{
    readonly IApiVersionDescriptionProvider provider;
    
    public ConfigureSwaggerOptions(IApiVersionDescriptionProvider provider) => this.provider = provider;

    /// <inheritdoc />
    public void Configure(SwaggerGenOptions options)
    {
        // add a swagger document for each discovered API version
        // note: you might choose to skip or document deprecated API versions differently
        foreach (var description in provider.ApiVersionDescriptions)
        {
            options.SwaggerDoc(description.GroupName, CreateInfoForApiVersion(description));
        }

    }

    static OpenApiInfo CreateInfoForApiVersion(ApiVersionDescription description)
    {
        // TODO: Add here infos for api
        var info = new OpenApiInfo
        {
            Title = "Study Quiz API",
            Version = description.ApiVersion.ToString(),
            Description = "API Description of the Study-Quiz API",
            Contact = new OpenApiContact { Name = "Fabian Fischer", Email = "fabian@fischerdev.com" },
            TermsOfService = new Uri("https://study-quiz.com"),
        };

        if (description.IsDeprecated)
        {
            info.Description += " This API version has been deprecated.";
        }

        return info;
    }
}
