namespace quiz_service.Models.DTOs.OutDTO;

public class QuestionDTO
{
    public Guid Id { get; set; }
    public string Label { get; set; }
    public string? Hint { get; set; }
    public DateTime CreatedAt { get; set; }
    public UserDTO Creator { get; set; }
    public DateTime? EditedAt { get; set; }
    public UserDTO? EditedBy { get; set; }
    public List<AnswerDTO> Answer { get; set; }
}