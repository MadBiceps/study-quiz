using quiz_service.Exceptions.BaseExceptions;

namespace quiz_service.Exceptions;

public class WrongUserForQuestionAttemptException : BadRequestException
{
    public WrongUserForQuestionAttemptException(Guid quizAttemptId, string userId)
        : base($"The user with the id { userId } don't have access to the quiz attempt with id { quizAttemptId }")
    {
        
    }
}