using Microsoft.EntityFrameworkCore;
using quiz_service.Attributes;
using quiz_service.Exceptions;
using quiz_service.Models.Database;
using quiz_service.Persistence;

namespace quiz_service.Services.Quiz;

[InjectableProvider]
public class QuizService : IQuizService
{
    private readonly ApplicationDbContext _dbContext;

    public QuizService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Models.Database.Quiz>> GetAsync(int? page, int? pageSize, string? searchTerm, ApplicationUser? user = null)
    {
        List<Models.Database.Quiz> quizzes;
        if (searchTerm != null)
        {
            quizzes = await _dbContext.Quizzes.Where(x =>
                    x.Title.ToLower().Contains(searchTerm.ToLower()) ||
                    x.Description.ToLower().Contains(searchTerm.ToLower())).Include(quiz => quiz.Attempts)
                .ThenInclude(quizAttempt => quizAttempt.User).ToListAsync();
        }
        else
        {
            quizzes = await _dbContext.Quizzes.Include(quiz => quiz.Attempts)
                .ThenInclude(quizAttempt => quizAttempt.User).ToListAsync();
        }

        if (page != null && pageSize != null)
            quizzes = quizzes.Skip((int)(pageSize * (page - 1))).Take((int)pageSize).ToList();
        return quizzes;
    }

    public async Task<Models.Database.Quiz> GetByIdAsync(Guid id, ApplicationUser? user = null)
    {
        var quiz = await _dbContext.Quizzes.Include(quiz => quiz.Attempts)
            .ThenInclude(quizAttempt => quizAttempt.User)
            .FirstOrDefaultAsync(x => x.Id.Equals(id));
        if (quiz == null)
            throw new QuizNotFoundException(id);
        return quiz;
    }

    public async Task<Models.Database.Quiz> CreateAsync(Models.Database.Quiz quiz, ApplicationUser user)
    {
        quiz.Id = Guid.NewGuid();
        quiz.CreatedAt = DateTime.Now;
        quiz.UpdatedAt = null;
        quiz.UpdatedBy = null;
        quiz.Creator = user;
        var dbQuiz = await _dbContext.AddAsync(quiz);
        await _dbContext.SaveChangesAsync();
        return dbQuiz.Entity;
    }

    public async Task<Models.Database.Quiz> UpdateAsync(Guid id, Models.Database.Quiz quiz, ApplicationUser user)
    {
        var quizDb = await _dbContext.Quizzes.FirstOrDefaultAsync(x => x.Id.Equals(id));
        if (quizDb == null)
            throw new QuizNotFoundException(id);
        quizDb.UpdatedAt = DateTime.Now;
        quizDb.UpdatedBy = user;
        quizDb.Title = quiz.Title;
        quizDb.Description = quiz.Description;

        var result = _dbContext.Update(quizDb);
        await _dbContext.SaveChangesAsync();
        return result.Entity;
    }

    public async Task DeleteAsync(Guid id)
    {
        var quiz = await GetByIdAsync(id);
        _dbContext.Remove(quiz);
        await _dbContext.SaveChangesAsync();
    }
}