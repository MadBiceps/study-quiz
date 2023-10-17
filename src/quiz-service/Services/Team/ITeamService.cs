using quiz_service.Attributes;
using quiz_service.Models.Database;

namespace quiz_service.Services.Team;

[InjectableInterface]
public interface ITeamService
{
    public Task<List<Models.Database.Team>> GetAsync(int? pageSize, int? page, string? searchTerm);
    
    public Task<Models.Database.Team> GetByIdAsync(Guid id);

    public Task<Models.Database.Team> CreateAsync(Models.Database.Team team, ApplicationUser user);

    public Task<Models.Database.Team> UpdateAsync(Models.Database.Team team, ApplicationUser user);

    public Task DeleteAsync(Guid id);
}