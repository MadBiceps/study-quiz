using quiz_service.Exceptions.BaseExceptions;

namespace quiz_service.Exceptions;

public class QuizNotFoundException : NotFoundException
{
    public QuizNotFoundException(Guid id)
        : base($"Quiz with id { id } not found")
    {
        
    }
}