using Microsoft.EntityFrameworkCore;
using quiz_service.Attributes;
using quiz_service.Exceptions;
using quiz_service.Models.Database;
using quiz_service.Persistence;

namespace quiz_service.Services.User;

[InjectableProvider]
public class UserService : IUserService
{
    private readonly ApplicationDbContext _dbContext;

    public UserService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ApplicationUser> GetByUsernameAsync(string username)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName != null && x.UserName.Equals(username));
        if (user == null)
            throw new UserNotFoundException(username);
        return user;
    }
}