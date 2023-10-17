using quiz_service.Exceptions.BaseExceptions;

namespace quiz_service.Exceptions;

public class MembershipNotFoundException : NotFoundException
{
    public MembershipNotFoundException(string username, Guid teamId)
        : base($"Membership of { username } in Team with id { teamId } not found.")
    {
        
    }
}