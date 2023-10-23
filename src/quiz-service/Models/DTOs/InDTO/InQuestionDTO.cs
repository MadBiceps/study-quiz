namespace quiz_service.Models.DTOs.InDTO;

public class InQuestionDTO
{
    public string Label { get; set; }
    public string? Hint { get; set; }
    public List<InAnswerDTO> Answers { get; set; }
}

public class InAnswerDTO
{
    public Guid? Id { get; set; }
    public string Label { get; set; }
    public string Reason { get; set; }
    public bool IsCorrect { get; set; }
}