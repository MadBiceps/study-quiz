using System.ComponentModel.DataAnnotations;

namespace quiz_service.Models.Database;

public class Quiz
{
    [Key]
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }
    
    public virtual List<Question> Questions { get; set; }
    
    public virtual ApplicationUser Creator { get; set; }
    
    public virtual ApplicationUser UpdatedBy { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    
    public virtual List<QuizAttempt> Attempts { get; set; }
}