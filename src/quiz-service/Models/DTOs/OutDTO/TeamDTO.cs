namespace quiz_service.Models.DTOs.OutDTO;

public class TeamDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<TeamMemberDTO>? TeamMember { get; set; }
    public DateTime CreatedAt { get; set; }
    public UserDTO Creator { get; set; }
    public int MemberCount { get; set; }
    public int MaxMemberCount { get; set; } = 10;
    public List<TeamScoreDTO>? Scores { get; set; }
    public int CurrentScore { get; set; }
}