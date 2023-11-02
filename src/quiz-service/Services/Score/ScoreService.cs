using Microsoft.EntityFrameworkCore;
using quiz_service.Attributes;
using quiz_service.Models.Database;
using quiz_service.Models.DTOs.OutDTO;
using quiz_service.Persistence;

namespace quiz_service.Services.Score;

[InjectableProvider]
public class ScoreService : IScoreService
{
    private ApplicationDbContext _dbContext;

    public ScoreService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public int GetCurrentUserScore(ApplicationUser user)
    {
        return user.Attempts.Where(x =>
                        x.CreatedAt.Month == DateTime.Now.Month && x.CreatedAt.Year == DateTime.Now.Year)
                    .Sum(x => x.Questions.Sum(y => y.Answer?.Score ?? 0));
    }

    public int? GetCurrentUserTeamScore(ApplicationUser user)
    {
        var team = user.Memberships.FirstOrDefault(x => x.Left == null);
        return team?.Team.QuizAttempts.Sum(x => x.Questions.Sum(y => y.Answer?.Score ?? 0));
    }

    public Dictionary<DateTime, int> GetUserScoreOnTime(ApplicationUser user)
    {
        var scores = new Dictionary<DateTime, int>();
        var attemptsByYear = user.Attempts.GroupBy(x => x.CreatedAt.Year);

        var attemptByYears = attemptsByYear as IGrouping<int, QuizAttempt>[] ?? attemptsByYear.ToArray();
        foreach (var attemptByYear in attemptByYears)
        {
            foreach (var attemptByMonth in attemptByYears.SelectMany(x => x).GroupBy(x => x.CreatedAt.Month))
            {
                scores.Add(new DateTime(attemptByYear.Key, attemptByMonth.Key, 1),
                    attemptByMonth.Sum(x => x.Questions.Sum(y => y.Answer?.Score ?? 0)));
            }
        }

        return scores;
    }

    public async Task<List<Models.Database.Team>> GetTeamLeaderboardAsync(int count)
    {
        return await _dbContext.Teams
            .OrderByDescending(x => x.QuizAttempts
                .Where(attempt => attempt.CreatedAt.Year == DateTime.Now.Year && attempt.CreatedAt.Month == DateTime.Now.Year)
                .Sum(attempt => attempt.Questions
                    .Where(y => y.Answer != null)
                    .Sum(y => y.Answer!.Score)))
            .Take(count).ToListAsync();
    }

    public async Task<List<ApplicationUser>> GetUserLeaderboardAsync(int count)
    {
        return await _dbContext.Users
            .OrderByDescending(x => x.Attempts
                .Where(attempt => attempt.CreatedAt.Year == DateTime.Now.Year && attempt.CreatedAt.Month == DateTime.Now.Year)
                .Sum(attempt => attempt.Questions
                    .Where(y => y.Answer != null)
                    .Sum(y => y.Answer!.Score)))
            .Take(count).ToListAsync();
    }
}