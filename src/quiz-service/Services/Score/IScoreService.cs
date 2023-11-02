using quiz_service.Attributes;
using quiz_service.Models.Database;

namespace quiz_service.Services.Score;

[InjectableInterface]
public interface IScoreService
{
    public int GetCurrentUserScore(ApplicationUser user);
    public int? GetCurrentUserTeamScore(ApplicationUser user);
    public Dictionary<DateTime, int> GetUserScoreOnTime(ApplicationUser user);
    public Task<List<ApplicationUser>> GetUserLeaderboardAsync(int count);
    public Task<List<Models.Database.Team>> GetTeamLeaderboardAsync(int count);
}