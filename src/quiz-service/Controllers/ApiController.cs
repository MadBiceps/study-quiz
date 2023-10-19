using Microsoft.AspNetCore.Mvc;
using quiz_service.Models.Database;
using quiz_service.Services.User;

namespace quiz_service.Controllers;

[ApiVersion("1.0", Deprecated = false)]
[ApiController]
public class ApiController : ControllerBase
{
    public ApiController()
    {
    }
}