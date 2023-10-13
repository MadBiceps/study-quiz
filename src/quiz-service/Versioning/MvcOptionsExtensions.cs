using Microsoft.AspNetCore.Mvc;

namespace quiz_service.Versioning;

public static class MvcOptionsExtensions
{
    public static void UseCentralRoutePrefix(this MvcOptions opts, RouteAttribute routeAttribute)
    {
        opts.Conventions.Insert(0, new RouteConventions(routeAttribute));
    }
}
