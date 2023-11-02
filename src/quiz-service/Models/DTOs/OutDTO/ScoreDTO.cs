namespace quiz_service.Models.DTOs.OutDTO;

public class ScoreDTO
{
    public int CurrentScore { get; set; }
    public List<TimeScoreDTO> ScoreOverTime { get; set; }
}

public class TimeScoreDTO
{
    public int Value { get; set; }
    public DateTime Time { get; set; }
}