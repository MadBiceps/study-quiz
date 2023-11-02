namespace quiz_service.Models.DTOs.OutDTO;

public class TeamMemberDTO : UserDTO
{
    public Guid Id { get; set; }
    public DateTime Joined { get; set; }
}