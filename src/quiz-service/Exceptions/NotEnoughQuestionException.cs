using quiz_service.Exceptions.BaseExceptions;

namespace quiz_service.Exceptions;

public class NotEnoughQuestionException : CustomException
{
    public NotEnoughQuestionException(Guid quizId)
        : base($"Can't setup a attempt for the quiz with id { quizId } because not enough questions are available")
    {
        
    }
}