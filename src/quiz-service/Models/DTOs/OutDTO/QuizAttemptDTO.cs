namespace quiz_service.Models.DTOs.OutDTO;

public class QuizAttemptDTO
{
    public Guid Id { get; set; }
    public Guid QuizId { get; set; }
    public string QuizTitle { get; set; }
    public List<AttemptQuestionDTO> Questions { get; set; }
    public UserDTO User { get; set; }
    public Guid? TeamId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
}