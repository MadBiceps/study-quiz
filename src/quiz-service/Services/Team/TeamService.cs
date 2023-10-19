using Microsoft.EntityFrameworkCore;
using quiz_service.Attributes;
using quiz_service.Exceptions;
using quiz_service.Models.Database;
using quiz_service.Persistence;

namespace quiz_service.Services.Team;

[InjectableProvider]
public class TeamService : ITeamService
{
    private readonly ApplicationDbContext _dbContext;
    
    public TeamService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Models.Database.Team>> GetAsync(int? pageSize, int? page, string? searchTerm)
    {
        var element = await _dbContext.Teams.ToListAsync();

        if (searchTerm != null)
            element = element.Where(x => x.Name.ToLower().Contains(searchTerm.ToLower())).ToList();

        if (pageSize is >= 1 && page is >= 1)
            element = element.Skip((int)((int) pageSize * (page - 1))).Take((int) pageSize).ToList();

        return element;
    }

    public async Task<Models.Database.Team> GetByIdAsync(Guid id)
    {
        var team = await _dbContext.Teams.FirstOrDefaultAsync(x => x.Id.Equals(id));
        if (team == null)
            throw new TeamNotFoundException(id);
        return team;
    }

    public async Task<Models.Database.Team> CreateAsync(Models.Database.Team team, ApplicationUser user)
    {
        team.Id = Guid.NewGuid();
        team.Creator = user;

        var result = await _dbContext.AddAsync(team);
        await _dbContext.SaveChangesAsync();
        return result.Entity;
    }

    public async Task<Models.Database.Team> UpdateAsync(Models.Database.Team team, ApplicationUser user)
    {
        var dbTeam = await GetByIdAsync(team.Id);
        dbTeam.Name = team.Name;

        var result = _dbContext.Update(dbTeam);
        await _dbContext.SaveChangesAsync();
        return result.Entity;
    }

    public async Task DeleteAsync(Guid id)
    {
        var team = await GetByIdAsync(id);
        _dbContext.Remove(team);
        await _dbContext.SaveChangesAsync();
    }
}