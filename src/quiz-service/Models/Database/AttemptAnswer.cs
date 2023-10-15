using System.ComponentModel.DataAnnotations;

namespace quiz_service.Models.Database;

public class AttemptAnswer
{
    [Key]
    public Guid Id { get; set; }

    public virtual Answer Answer { get; set; }
    
    public virtual QuizAttempt QuizAttempt { get; set; }
    
    public DateTime AnsweredAt { get; set; }
    
    public bool Score { get; set; }
}