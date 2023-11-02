using quiz_service.Attributes;
using quiz_service.Models.Database;

namespace quiz_service.Services.Team;

[InjectableInterface]
public interface ITeamUserService
{
    public Task<Models.Database.Team> AddAsync(Guid teamId, ApplicationUser user);

    public Task<Models.Database.Team> RemoveAsync(Guid teamId, ApplicationUser user);
}