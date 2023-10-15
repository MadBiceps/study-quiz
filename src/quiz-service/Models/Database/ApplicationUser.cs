using Microsoft.AspNetCore.Identity;

namespace quiz_service.Models.Database;

public class ApplicationUser : IdentityUser
{
    public List<QuizAttempt> Attempts { get; set; }
    public List<TeamMembership> Memberships { get; set; }
}