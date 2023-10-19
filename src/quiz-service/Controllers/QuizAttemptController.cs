using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using quiz_service.Models.Database;
using quiz_service.Models.DTOs.InDTO;
using quiz_service.Models.DTOs.OutDTO;
using quiz_service.Services.Quiz;

namespace quiz_service.Controllers;

[Route("quiz-attempts")]
public class QuizAttemptController : ApiController
{
    private readonly IQuizAttemptService _quizAttemptService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;

    public QuizAttemptController(IQuizAttemptService quizAttemptService, UserManager<ApplicationUser> userManager,
        IMapper mapper)
    {
        _quizAttemptService = quizAttemptService;
        _userManager = userManager;
        _mapper = mapper;
    }

    [Authorize]
    [HttpGet("")]
    public async Task<IActionResult> GetByUserAsync()
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
            return Unauthorized();
        var attempts = await _quizAttemptService.GetByUserAsync(currentUser);
        return Ok(_mapper.Map<List<QuizAttemptDTO>>(attempts));
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        var attempt = await _quizAttemptService.GetByIdAsync(id);
        return Ok(_mapper.Map<QuizAttemptDTO>(attempt));
    }

    [Authorize]
    [HttpGet("team/{teamId:guid}")]
    public async Task<IActionResult> GetByTeamAsync(Guid teamId)
    {
        var attempts = await _quizAttemptService.GetByTeamAsync(teamId);
        return Ok(_mapper.Map<List<QuizAttemptDTO>>(attempts));
    }

    [Authorize]
    [HttpGet("quiz/{quizId:guid}")]
    public async Task<IActionResult> GetByQuizAsync(Guid quizId)
    {
        var attempts = await _quizAttemptService.GetByQuizAsync(quizId);
        return Ok(_mapper.Map<List<QuizAttemptDTO>>(attempts));
    }

    [Authorize]
    [HttpPost("")]
    public async Task<IActionResult> CreateAsync([FromBody] InQuizAttemptDTO quizAttemptDto)
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
            return Unauthorized();
        var attempt = await _quizAttemptService.SetupAsync(quizAttemptDto.QuizId, currentUser);
        return Ok(_mapper.Map<QuizAttemptDTO>(attempt));
    }

    [Authorize]
    [HttpPut("{attemptId:guid}")]
    public async Task<IActionResult> QuizAsync(Guid attemptId, [FromBody] InQuizAnswerDTO quizAnswer)
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
            return Unauthorized();
        var attempt =
            await _quizAttemptService.AnswerQuestionAsync(attemptId, quizAnswer.QuestionId, quizAnswer.AnswerId,
                currentUser);
        return Ok(_mapper.Map<QuizAttemptDTO>(attempt));
    }
}