using Microsoft.AspNetCore.Mvc;
using quiz_service.Attributes;
using quiz_service.Exceptions;
using quiz_service.Models.Database;
using quiz_service.Persistence;

namespace quiz_service.Services.Quiz;

[InjectableProvider]
public class QuizQuestionService : IQuizQuestionService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IQuizService _quizService;
    public QuizQuestionService(ApplicationDbContext dbContext, IQuizService quizService)
    {
        _dbContext = dbContext;
        _quizService = quizService;
    }

    public async Task<List<Question>> GetAsync(Guid quizId)
    {
        var quiz = await _quizService.GetByIdAsync(quizId);
        return quiz.Questions;
    }

    public async Task<Question> GetByIdAsync(Guid quizId, Guid questionId)
    {
        var questions = await GetAsync(quizId);
        var question = questions.FirstOrDefault(x => x.Id.Equals(questionId));
        if (question == null)
            throw new QuestionNotFoundException(quizId: quizId, questionId: questionId);
        return question;
    }

    public async Task<Question> AddAsync(Guid quizId, Question question, ApplicationUser user)
    {
        var quiz = await _quizService.GetByIdAsync(quizId);
        question.Id = Guid.NewGuid();
        question.Creator = user;
        question.CreatedAt = DateTime.Now;
        question.Quiz = quiz;
        question.Id = Guid.NewGuid();
        var result = await _dbContext.AddAsync(question);
        await _dbContext.SaveChangesAsync();
        return result.Entity;
    }

    public async Task<Question> UpdateAsync(Guid quizId, Question question, ApplicationUser user)
    {
        var questionDb = await GetByIdAsync(quizId, question.Id);
        
        _dbContext.RemoveRange(questionDb.Answers);
        await _dbContext.SaveChangesAsync();

        questionDb = await GetByIdAsync(quizId, question.Id);
        
        questionDb.Answers = question.Answers;
        questionDb.EditedAt = DateTime.Now;
        questionDb.EditedBy = user;
        questionDb.Label = question.Label;
        questionDb.Hint = question.Hint;
        
        var result = _dbContext.Update(questionDb);
        await _dbContext.SaveChangesAsync();
        return result.Entity;
    }

    public async Task DeleteAsync(Guid quizId, Guid questionId)
    {
        var question = await GetByIdAsync(quizId, questionId);
        _dbContext.Remove(question);
        await _dbContext.SaveChangesAsync();
    }
}