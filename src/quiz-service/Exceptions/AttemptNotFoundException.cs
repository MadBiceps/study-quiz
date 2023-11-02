using quiz_service.Exceptions.BaseExceptions;

namespace quiz_service.Exceptions;

public class AttemptNotFoundException : NotFoundException
{
    public AttemptNotFoundException(Guid attemptId)
        : base($"Attempt with id {attemptId} not found")
    {

    }
}