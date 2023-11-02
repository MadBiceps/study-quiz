namespace quiz_service.Models.DTOs.OutDTO;

public class LeaderboardElementDTO<T>
{
    public int Position { get; set; }
    public int Score { get; set; }
    public T Data { get; set; }
}