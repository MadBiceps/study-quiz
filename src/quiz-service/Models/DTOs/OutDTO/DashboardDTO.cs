namespace quiz_service.Models.DTOs.OutDTO;

public class DashboardDTO
{
    public int MonthlyScore { get; set; }
    public int? TeamScore { get; set; }
    public List<TimeScoreDTO> TimeScore  { get; set; }
}