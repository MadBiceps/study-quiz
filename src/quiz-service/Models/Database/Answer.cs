using System.ComponentModel.DataAnnotations;

namespace quiz_service.Models.Database;

public class Answer
{
    [Key]
    public Guid Id { get; set; }
    
    public string Label { get; set; }
    
    public string Reason { get; set; }

    public bool IsCorrect { get; set; }

    public virtual ApplicationUser Creator { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ApplicationUser? EditedBy { get; set; }

    public DateTime? EditedAt { get; set; }
    
    public virtual Question Question { get; set; }
}