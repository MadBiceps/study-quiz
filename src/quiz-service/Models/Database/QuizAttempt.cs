using System.ComponentModel.DataAnnotations;

namespace quiz_service.Models.Database;

public class QuizAttempt
{
    [Key]
    public Guid Id { get; set; }

    public virtual Quiz Quiz { get; set; }
    
    [MaxLength(10)]
    [MinLength(10)]
    public virtual List<AttemptQuestion> Questions { get; set; }

    public virtual ApplicationUser User { get; set; }
    
    public virtual Team? Team { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? FinishedAt { get; set; }
}