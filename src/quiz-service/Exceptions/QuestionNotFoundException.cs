using quiz_service.Exceptions.BaseExceptions;

namespace quiz_service.Exceptions;

public class QuestionNotFoundException : NotFoundException
{
    public QuestionNotFoundException(Guid quizId, Guid questionId)
        : base($"Question with id { questionId } can't found in the quiz with the id { quizId }")
    {
        
    }
}