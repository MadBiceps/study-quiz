
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using static Microsoft.AspNetCore.Mvc.Versioning.ApiVersionMapping;

namespace quiz_service.Swagger;

public class SwaggerDefaultValues : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var apiDescription = context.ApiDescription;
        var apiVersion = apiDescription.GetApiVersion();
        var model = apiDescription.ActionDescriptor.GetApiVersionModel(Explicit | Implicit);

        operation.Deprecated = model.DeprecatedApiVersions.Contains(apiVersion);

        if (operation.Parameters == null)
        {
            return;
        }

        // REF: https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/412
        // REF: https://github.com/domaindrivendev/Swashbuckle.AspNetCore/pull/413
        foreach (var parameter in operation.Parameters)
        {
            var description = apiDescription.ParameterDescriptions.First(p => p.Name == parameter.Name);

            parameter.Description ??= description.ModelMetadata?.Description;

            parameter.Required |= description.IsRequired;
        }
    }
    
    
}
