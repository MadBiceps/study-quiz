using System.Reflection.PortableExecutable;

namespace quiz_service.Models.DTOs.OutDTO;

public class AttemptQuestionDTO
{
    public Guid Id { get; set; }
    public int Order { get; set; }
    public QuestionDTO Question { get; set; }
    public AttemptAnswerDTO Answer { get; set; }
}