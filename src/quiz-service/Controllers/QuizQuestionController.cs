using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using quiz_service.Models.Database;
using quiz_service.Models.DTOs.InDTO;
using quiz_service.Models.DTOs.OutDTO;
using quiz_service.Services.Quiz;

namespace quiz_service.Controllers;

[Route("quizzes/{quizId:guid}/questions")]
public class QuizQuestionController : ApiController
{
    private readonly IQuizQuestionService _quizQuestionService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;

    public QuizQuestionController(IQuizQuestionService quizQuestionService, UserManager<ApplicationUser> userManager,
        IMapper mapper)
    {
        _quizQuestionService = quizQuestionService;
        _userManager = userManager;
        _mapper = mapper;
    }

    [Authorize]
    [HttpGet("")]
    public async Task<IActionResult> GetAsync(Guid quizId)
    {
        var questions = await _quizQuestionService.GetAsync(quizId: quizId);
        return Ok(_mapper.Map<List<QuestionDTO>>(questions));
    }

    [Authorize]
    [HttpGet("{questionId:guid}")]
    public async Task<IActionResult> GetByIdAsync(Guid quizId, Guid questionId)
    {
        var question = await _quizQuestionService.GetByIdAsync(quizId, questionId);
        return Ok(_mapper.Map<QuestionDTO>(question));
    }

    [Authorize]
    [HttpPost("")]
    public async Task<IActionResult> CreateAsync(Guid quizId, [FromBody] InQuestionDTO questionModel)
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
            return Unauthorized();
        
        var question = _mapper.Map<Question>(questionModel);
        var questionDb = await _quizQuestionService.AddAsync(quizId, question, currentUser);
        return Ok(_mapper.Map<QuestionDTO>(questionDb));
    }
    
    
    [Authorize]
    [HttpPut("{questionId:guid}")]
    public async Task<IActionResult> UpdateAsync(Guid quizId, Guid questionId, [FromBody] InQuestionDTO questionModel)
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
            return Unauthorized();

        var question = _mapper.Map<Question>(questionModel);
        question.Id = questionId;
        var questionDb = await _quizQuestionService.UpdateAsync(quizId, question, currentUser);

        return Ok(_mapper.Map<QuestionDTO>(questionDb));
    }

    [Authorize]
    [HttpDelete("{questionId:guid}")]
    public async Task<IActionResult> DeleteAsync(Guid quizId, Guid questionId)
    {
        await _quizQuestionService.DeleteAsync(quizId, questionId);
        return Ok();
    }
}