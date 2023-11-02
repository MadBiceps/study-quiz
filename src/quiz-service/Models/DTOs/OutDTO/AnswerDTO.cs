namespace quiz_service.Models.DTOs.OutDTO;

public class AnswerDTO
{
    public Guid Id { get; set; }
    
    public string Label { get; set; }
    
    public string Reason { get; set; }

    public bool? IsCorrect { get; set; }

    public UserDTO Creator { get; set; }

    public DateTime CreatedAt { get; set; }

    public UserDTO? EditedBy { get; set; }

    public DateTime? EditedAt { get; set; }
}