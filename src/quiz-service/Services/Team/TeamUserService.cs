using Microsoft.EntityFrameworkCore;
using quiz_service.Attributes;
using quiz_service.Exceptions;
using quiz_service.Models.Database;
using quiz_service.Persistence;

namespace quiz_service.Services.Team;

[InjectableProvider]
public class TeamUserService : ITeamUserService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly ITeamService _teamService;
    
    public TeamUserService(ApplicationDbContext dbContext, ITeamService teamService)
    {
        _dbContext = dbContext;
        _teamService = teamService;
    }

    public async Task<Models.Database.Team> AddAsync(Guid teamId, ApplicationUser user)
    {
        // Check if user already in team
        if (user.Memberships.Any(x => x.Left == null))
        {
            var activeMembership = user.Memberships.First(x => x.Left == null);
            activeMembership.Left = DateTime.Now;
            _dbContext.Update(activeMembership);
            await _dbContext.SaveChangesAsync();
        }
        
        var team = await _teamService.GetByIdAsync(teamId);

        if (team.Member.Count(x => x.Left == null) >= 10)
            throw new TooManyTeamMemberException(teamId);
        
        await _dbContext.AddAsync(new TeamMembership
        {
            Id = Guid.NewGuid(),
            Joined = DateTime.Now,
            User = user,
            Team = team,
            Left = null
        });

        await _dbContext.SaveChangesAsync();

        return team;
    }

    public async Task<Models.Database.Team> RemoveAsync(Guid teamId, ApplicationUser user)
    {
        var teamMembership = await _dbContext.TeamMemberships.FirstOrDefaultAsync(x =>
            x.User.UserName != null && x.Team.Id.Equals(teamId) && x.User.UserName.Equals(user.UserName) && x.Left == null);

        if (teamMembership == null)
            throw new MembershipNotFoundException(user.UserName ?? string.Empty, teamId);
        
        teamMembership.Left = DateTime.Now;
        _dbContext.Update(teamMembership);
        await _dbContext.SaveChangesAsync();

        return await _teamService.GetByIdAsync(teamId);
    }
}