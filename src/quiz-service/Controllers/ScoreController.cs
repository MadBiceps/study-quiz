using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using quiz_service.Models.Database;
using quiz_service.Models.DTOs.OutDTO;
using quiz_service.Services.Score;

namespace quiz_service.Controllers;

[Route("score")]
public class ScoreController : ApiController
{
    private readonly IScoreService _scoreService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    
    public ScoreController(IScoreService scoreService, UserManager<ApplicationUser> userManager, IMapper mapper)
    {
        _scoreService = scoreService;
        _userManager = userManager;
        _mapper = mapper;
    }

    [Authorize]
    [HttpGet("")]
    public async Task<IActionResult> GetUserScoreAsync()
    {
        var currentUserName = User.Identity?.Name;
        if (currentUserName == null)
            return Unauthorized();
        var currentUser = await _userManager.FindByNameAsync(currentUserName);
        if (currentUser == null)
            return Unauthorized();
        return Ok(new DashboardDTO
        {
            MonthlyScore = _scoreService.GetCurrentUserScore(currentUser),
            TeamScore = _scoreService.GetCurrentUserTeamScore(currentUser),
            TimeScore = _scoreService.GetUserScoreOnTime(currentUser).Select(x => new TimeScoreDTO
            {
                Time = x.Key,
                Value = x.Value
            }).ToList()
        });
    }

    [Authorize]
    [HttpGet("quizzes")]
    public async Task<IActionResult> GetUserQuizzesAsync()
    {
        var currentUserName = User.Identity?.Name;
        if (currentUserName == null)
            return Unauthorized();
        var currentUser = await _userManager.FindByNameAsync(currentUserName);
        if (currentUser == null)
            return Unauthorized();
        var mapped = _mapper.Map<List<QuizAttemptDTO>>(currentUser.Attempts).OrderByDescending(x => x.CreatedAt);
        return Ok(mapped);
    }

    [Authorize]
    [HttpGet("leaderboard/user")]
    public async Task<IActionResult> GetUserLeaderboardAsync([FromQuery] int? count)
    {
        var board = await _scoreService.GetUserLeaderboardAsync(count ?? 10);
        return Ok(board.Select(x => new LeaderboardElementDTO<UserDTO>
        {
            Position = board.FindIndex(y => y.UserName == x.UserName) + 1,
            Score = x.Attempts
                .Where(y => y.CreatedAt.Year == DateTime.Now.Year && y.CreatedAt.Month == DateTime.Now.Month)
                .Sum(y => y.Questions.Sum(z => z.Answer?.Score ?? 0)),
            Data = _mapper.Map<UserDTO>(x)
        }).OrderByDescending(x => x.Score));
    }

    [Authorize]
    [HttpGet("leaderboard/team")]
    public async Task<IActionResult> GetTeamLeaderboardAsync([FromQuery] int? count)
    {
        var board = await _scoreService.GetTeamLeaderboardAsync(count ?? 10);
        return Ok(board.Select(x => new LeaderboardElementDTO<TeamDTO>
        {
            Position = board.FindIndex(y => y.Id == x.Id) + 1,
            Score = x.QuizAttempts
                .Where(y => y.CreatedAt.Year == DateTime.Now.Year && y.CreatedAt.Month == DateTime.Now.Month)
                .Sum(y => y.Questions.Sum(z => z.Answer?.Score ?? 0)),
            Data = _mapper.Map<TeamDTO>(x)
        }).OrderByDescending(x => x.Score));
    }
    
    
}