using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using quiz_service.Models.Database;
using quiz_service.Models.DTOs.InDTO;
using quiz_service.Models.DTOs.OutDTO;
using quiz_service.Services.Quiz;

namespace quiz_service.Controllers;

[Route("quizzes")]
public class QuizController : ApiController
{
    private readonly IQuizService _quizService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;

    public QuizController(IQuizService quizService, UserManager<ApplicationUser> userManager, IMapper mapper)
    {
        _quizService = quizService;
        _userManager = userManager;
        _mapper = mapper;
    }

    [Authorize]
    [HttpGet("")]
    public async Task<IActionResult> GetQuizzesAsync([FromQuery] int? page, [FromQuery] int? pageSize,
        [FromQuery] string? searchTerm)
    {
        var quizzes = await _quizService.GetAsync(page, pageSize, searchTerm);
        return Ok(_mapper.Map<List<QuizDTO>>(quizzes));
    }

    [Authorize]
    [HttpGet("{quizId:guid}")]
    public async Task<IActionResult> GetQuizByIdAsync(Guid quizId)
    {
        var quiz = await _quizService.GetByIdAsync(quizId);
        return Ok(_mapper.Map<QuizDTO>(quiz));
    }

    [Authorize]
    [HttpPost("")]
    public async Task<IActionResult> CreateQuizAsync([FromBody] InQuizDTO quizDto)
    {
        var currentUserName = User.Identity?.Name;
        if (currentUserName == null)
            return Unauthorized();
        var currentUser = await _userManager.FindByNameAsync(currentUserName);
        if (currentUser == null)
            return Unauthorized();
        var quiz = await _quizService.CreateAsync(_mapper.Map<Quiz>(quizDto), currentUser);
        return Ok(_mapper.Map<QuizDTO>(quiz));
    }

    [Authorize]
    [HttpPut("{quizId:guid}")]
    public async Task<IActionResult> UpdateQuizAsync(Guid quizId, [FromBody] InQuizDTO quizDto)
    {
        var currentUserName = User.Identity?.Name;
        if (currentUserName == null)
            return Unauthorized();
        var currentUser = await _userManager.FindByNameAsync(currentUserName);
        if (currentUser == null)
            return Unauthorized();
        var quizDb = await _quizService.GetByIdAsync(quizId);
        if (!quizDb.Creator.Id.Equals(currentUser.Id))
            return Unauthorized();
        var quiz = await _quizService.UpdateAsync(quizId, _mapper.Map<Quiz>(quizDto), currentUser);
        return Ok(_mapper.Map<QuizDTO>(quiz));
    }

    [Authorize]
    [HttpDelete("{quizId:guid}")]
    public async Task<IActionResult> DeleteQuizAsync(Guid quizId)
    {
        var currentUserName = User.Identity?.Name;
        if (currentUserName == null)
            return Unauthorized();
        var currentUser = await _userManager.FindByNameAsync(currentUserName);
        if (currentUser == null)
            return Unauthorized();
        var quizDb = await _quizService.GetByIdAsync(quizId);
        if (!quizDb.Creator.Id.Equals(currentUser.Id))
            return Unauthorized();
        await _quizService.DeleteAsync(quizId);
        return Ok();
    }
}