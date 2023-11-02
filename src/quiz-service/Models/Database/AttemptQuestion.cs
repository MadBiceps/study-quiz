using System.ComponentModel.DataAnnotations;

namespace quiz_service.Models.Database;

public class AttemptQuestion
{
    [Key]
    public Guid Id { get; set; }

    public int Order { get; set; }

    public virtual Question Question { get; set; }
    
    public virtual AttemptAnswer? Answer { get; set; }

}