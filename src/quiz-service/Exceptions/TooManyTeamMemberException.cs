using quiz_service.Exceptions.BaseExceptions;

namespace quiz_service.Exceptions;

public class TooManyTeamMemberException : BadRequestException
{
    public TooManyTeamMemberException(Guid teamId)
        : base(
            $"The team with the id {teamId} reached already the max team member cap. " +
            $"Please remove somebody from the team or join a other team")
    {
    }
}