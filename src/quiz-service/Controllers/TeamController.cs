using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using quiz_service.Models.Database;
using quiz_service.Models.DTOs.InDTO;
using quiz_service.Models.DTOs.OutDTO;
using quiz_service.Services.Team;

namespace quiz_service.Controllers;
[Route("teams")]
public class TeamController : ApiController
{
    private readonly ITeamService _teamService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;

    public TeamController(ITeamService teamService, IMapper mapper,
        UserManager<ApplicationUser> userManager)
    {
        _teamService = teamService;
        _mapper = mapper;
        _userManager = userManager;
    }

    [Authorize]
    [HttpGet("")]
    public async Task<IActionResult> GetTeamsAsync([FromQuery] int? pageSize, [FromQuery] int? page,
        [FromQuery] string? searchTerm)
    {
        var teams = await _teamService.GetAsync(pageSize, page, searchTerm);
        return Ok(_mapper.Map<List<TeamDTO>>(teams));
    }

    [Authorize]
    [HttpGet("{teamId:guid}")]
    public async Task<IActionResult> GetTeamByIdAsync(Guid teamId)
    {
        var team = await _teamService.GetByIdAsync(teamId);
        return Ok(_mapper.Map<TeamDTO>(team));
    }

    [Authorize]
    [HttpPost("")]
    public async Task<IActionResult> CreateTeamAsync([FromBody] InTeamDTO teamDto)
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
            return Unauthorized();
        
        var team = await _teamService.CreateAsync(_mapper.Map<Team>(teamDto), currentUser);
        return Ok(_mapper.Map<TeamDTO>(team));
    }

    [Authorize]
    [HttpPut("{teamId:guid}")]
    public async Task<IActionResult> UpdateTeamAsync(Guid teamId, [FromBody] InTeamDTO teamDto)
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
            return Unauthorized();
        var teamDb = await _teamService.GetByIdAsync(teamId);
        if (!teamDb.Creator.Id.Equals(currentUser.Id))
            return Forbid();
        var mappedTeam = _mapper.Map<Team>(teamDto);
        mappedTeam.Id = teamId;
        var team = await _teamService.UpdateAsync(mappedTeam, currentUser);
        return Ok(_mapper.Map<TeamDTO>(team));
    }

    [Authorize]
    [HttpDelete("{teamId:guid}")]
    public async Task<IActionResult> DeleteTeamAsync(Guid teamId)
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
            return Unauthorized();
        var teamDb = await _teamService.GetByIdAsync(teamId);
        if (!teamDb.Creator.Id.Equals(currentUser.Id))
            return Forbid();
        await _teamService.DeleteAsync(teamId);
        return Ok();
    }
}