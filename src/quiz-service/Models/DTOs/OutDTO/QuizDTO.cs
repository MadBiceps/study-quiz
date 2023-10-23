namespace quiz_service.Models.DTOs.OutDTO;

public class QuizDTO
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public List<QuestionDTO>? Questions { get; set; }
    public UserDTO Creator { get; set; }
    public UserDTO? UpdatedBy { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public List<QuizAttemptDTO>? Attempts { get; set; }
}