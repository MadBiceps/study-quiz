using Microsoft.AspNetCore.Identity;

namespace quiz_service.Models.Database;

public class ApplicationUser : IdentityUser
{
    public virtual List<QuizAttempt> Attempts { get; set; }
    public virtual List<TeamMembership> Memberships { get; set; }
}