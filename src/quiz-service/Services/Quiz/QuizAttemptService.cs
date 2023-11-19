using Microsoft.EntityFrameworkCore;
using quiz_service.Attributes;
using quiz_service.Exceptions;
using quiz_service.Models.Database;
using quiz_service.Persistence;

namespace quiz_service.Services.Quiz;

[InjectableProvider]
public class QuizAttemptService : IQuizAttemptService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IQuizService _quizService;

    public QuizAttemptService(ApplicationDbContext dbContext, IQuizService quizService)
    {
        _dbContext = dbContext;
        _quizService = quizService;
    }

    public async Task<QuizAttempt> SetupAsync(Guid quizId, ApplicationUser user)
    {
        var quiz = await _quizService.GetByIdAsync(quizId);
        if (quiz.Questions.Count < 10)
            throw new NotEnoughQuestionException(quizId);

        var quizAttempt = new QuizAttempt
        {
            Id = Guid.NewGuid(),
            User = user,
            Quiz = quiz,
            CreatedAt = DateTime.Now,
            FinishedAt = null,
            Team = user.Memberships.FirstOrDefault(x => x.Left == null)?.Team,
            Questions = quiz.Questions.OrderBy(x => Random.Shared.Next()).Take(10).Select(x => new AttemptQuestion
            {
                Id = Guid.NewGuid(),
                Question = x,
                Answer = null,
                Order = 0
            }).ToList()
        };

        for (var i = 0; i < quizAttempt.Questions.Count; i++)
        {
            quizAttempt.Questions[i].Order = i + 1;
        }

        var attemptDb = await _dbContext.AddAsync(quizAttempt);
        await _dbContext.SaveChangesAsync();
        return attemptDb.Entity;
    }

    public async Task<QuizAttempt> GetByIdAsync(Guid quizAttemptId)
    {
        var quizAttempt = await _dbContext.QuizAttempts.FirstOrDefaultAsync(x => x.Id.Equals(quizAttemptId));
        if (quizAttempt == null)
            throw new AttemptNotFoundException(quizAttemptId);
        return quizAttempt;
    }

    public async Task<List<QuizAttempt>> GetByUserAsync(ApplicationUser user)
    {
        return await _dbContext.QuizAttempts.Where(x => x.User.Id.Equals(user.Id)).ToListAsync();
    }

    public async Task<List<QuizAttempt>> GetByTeamAsync(Guid teamId)
    {
        return await _dbContext.QuizAttempts.Where(x => x.Team != null && x.Team.Id.Equals(teamId)).ToListAsync();
    }

    public async Task<List<QuizAttempt>> GetByQuizAsync(Guid quizId)
    {
        return await _dbContext.QuizAttempts.Where(x => x.Quiz.Id.Equals(quizId)).ToListAsync();
    }

    public async Task<List<QuizAttempt>> GetByUserAndQuizAsync(Guid quizId, ApplicationUser user)
    {
        return await _dbContext.QuizAttempts.Where(x => x.Quiz.Id.Equals(quizId) && x.User.Id.Equals(user.Id))
            .ToListAsync();
    }

    public async Task<QuizAttempt> AnswerQuestionAsync(Guid quizAttemptId, Guid questionId, Guid answerId,
        ApplicationUser user)
    {
        var quizAttempt = await GetByIdAsync(quizAttemptId);
        if (quizAttempt.User.Id != user.Id)
            throw new WrongUserForQuestionAttemptException(quizAttemptId, user.Id);
        var question = quizAttempt.Questions.FirstOrDefault(x => x.Question.Id.Equals(questionId));
        if (question == null)
            throw new Exception("Question not found");
        var order = question.Order;
        if (quizAttempt.Questions.Where(x => x.Order < order).Any(x => x.Answer == null))
            throw new Exception("Not in correct order");

        var answer = question.Question.Answers.FirstOrDefault(x => x.Id == answerId);
        if (answer == null)
            throw new Exception("The selected answer is not in the question");

        var answerAttempt = new AttemptAnswer
        {
            Answer = answer,
            AnsweredAt = DateTime.Now,
            Id = Guid.NewGuid(),
            QuizAttempt = quizAttempt,
            Score = answer.IsCorrect ? 5 : -3,
            AttemptQuestion = question,
            AttemptQuestionId = question.Id,
        };
        await _dbContext.AddAsync(answerAttempt);
        await _dbContext.SaveChangesAsync();

        quizAttempt = await GetByIdAsync(quizAttemptId);

        if (quizAttempt.Questions.Any(x => x.Answer == null))
            return quizAttempt;
        quizAttempt.FinishedAt = DateTime.Now;
        quizAttempt = _dbContext.Update(quizAttempt).Entity;
        await _dbContext.SaveChangesAsync();
        return quizAttempt;
    }
}