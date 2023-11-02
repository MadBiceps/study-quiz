namespace quiz_service.Models.DTOs.OutDTO;

public class TeamScoreDTO
{
    public Guid Id { get; set; }
    public int Score { get; set; }
    public DateTime DateTime { get; set; }
    public TeamMemberDTO Member { get; set; }
}