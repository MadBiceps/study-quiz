using quiz_service.Exceptions.BaseExceptions;

namespace quiz_service.Exceptions;

public class TeamNotFoundException : NotFoundException
{
    public TeamNotFoundException(Guid id)
        : base($"Team with { id.ToString() } not found")
    {
        
    }
}