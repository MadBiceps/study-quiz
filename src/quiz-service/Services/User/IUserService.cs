using quiz_service.Attributes;
using quiz_service.Models.Database;

namespace quiz_service.Services.User;

[InjectableInterface]
public interface IUserService
{
    public Task<ApplicationUser> GetByUsernameAsync(string username);
}