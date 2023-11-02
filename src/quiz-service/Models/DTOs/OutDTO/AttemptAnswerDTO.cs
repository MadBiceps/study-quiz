namespace quiz_service.Models.DTOs.OutDTO;

public class AttemptAnswerDTO
{
    public Guid Id { get; set; }
    public AnswerDTO Answer { get; set; }
    public DateTime AnsweredAt { get; set; }
    public int Score { get; set; }
}