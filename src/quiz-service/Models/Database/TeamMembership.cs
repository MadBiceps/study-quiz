using System.ComponentModel.DataAnnotations;

namespace quiz_service.Models.Database;

public class TeamMembership
{
    [Key]
    public Guid Id { get; set; }

    public virtual ApplicationUser User { get; set; }

    public virtual Team Team { get; set; }

    public DateTime Joined { get; set; }

    public DateTime? Left { get; set; }
}