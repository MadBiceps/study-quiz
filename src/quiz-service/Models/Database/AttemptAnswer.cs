using System.ComponentModel.DataAnnotations;

namespace quiz_service.Models.Database;

public class AttemptAnswer
{
    [Key]
    public Guid Id { get; set; }

    public Guid AttemptQuestionId { get; set; }

    public virtual Answer Answer { get; set; }
    
    public virtual QuizAttempt QuizAttempt { get; set; }
    
    public virtual AttemptQuestion AttemptQuestion { get; set; }
    
    public DateTime AnsweredAt { get; set; }
    
    public int Score { get; set; }
}