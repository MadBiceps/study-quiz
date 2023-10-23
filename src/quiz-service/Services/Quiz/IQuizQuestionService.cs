using quiz_service.Attributes;
using quiz_service.Models.Database;

namespace quiz_service.Services.Quiz;

[InjectableInterface]
public interface IQuizQuestionService
{

    public Task<List<Question>> GetAsync(Guid quizId);
    public Task<Question> GetByIdAsync(Guid quizId, Guid questionId);
    public Task<Question> AddAsync(Guid quizId, Question question, ApplicationUser user);
    public Task<Question> UpdateAsync(Guid quizId, Question question, ApplicationUser user);
    public Task DeleteAsync(Guid quizId, Guid questionId);
}