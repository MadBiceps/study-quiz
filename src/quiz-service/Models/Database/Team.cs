using System.ComponentModel.DataAnnotations;

namespace quiz_service.Models.Database;

public class Team
{
    [Key]
    public Guid Id { get; set; }

    public string Name { get; set; }

    public virtual List<TeamMembership> Member { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ApplicationUser Creator { get; set; }
}