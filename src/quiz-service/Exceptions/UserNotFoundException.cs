using quiz_service.Exceptions.BaseExceptions;

namespace quiz_service.Exceptions;

public class UserNotFoundException : NotFoundException
{
    public UserNotFoundException(string username)
        : base($"User with the username: {username} not found")
    {
        
    }
}