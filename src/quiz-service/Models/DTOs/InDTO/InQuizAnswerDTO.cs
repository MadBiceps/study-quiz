namespace quiz_service.Models.DTOs.InDTO;

public class InQuizAnswerDTO
{
    public Guid QuestionId { get; set; }
    public Guid AnswerId { get; set; }
}