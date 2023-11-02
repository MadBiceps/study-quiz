using quiz_service.Attributes;
using quiz_service.Models.Database;

namespace quiz_service.Services.Quiz;

[InjectableInterface]
public interface IQuizAttemptService
{
    public Task<QuizAttempt> SetupAsync(Guid quizId, ApplicationUser user);
    public Task<QuizAttempt> GetByIdAsync(Guid quizAttemptId);
    public Task<List<QuizAttempt>> GetByUserAsync(ApplicationUser user);
    public Task<List<QuizAttempt>> GetByTeamAsync(Guid teamId);
    public Task<List<QuizAttempt>> GetByQuizAsync(Guid quizId);
    public Task<List<QuizAttempt>> GetByUserAndQuizAsync(Guid quizId, ApplicationUser user);

    public Task<QuizAttempt> AnswerQuestionAsync(Guid quizAttemptId, Guid questionId, Guid answerId,
        ApplicationUser user);
}