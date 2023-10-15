using System.ComponentModel.DataAnnotations;

namespace quiz_service.Models.Database;

public class Question
{
    [Key]
    public Guid Id { get; set; }

    public string Label { get; set; }

    public string? Hint { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public virtual ApplicationUser Creator { get; set; }
    
    public DateTime? EditedAt { get; set; }
    
    public virtual ApplicationUser? EditedBy { get; set; }
    
    public virtual List<Answer> Answers { get; set; }
    
    public virtual Quiz Quiz { get; set; }
    
    public virtual List<AttemptQuestion> Attempts { get; set; } 
}