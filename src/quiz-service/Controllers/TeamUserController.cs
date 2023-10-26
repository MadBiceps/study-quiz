using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using quiz_service.Models.Database;
using quiz_service.Models.DTOs.OutDTO;
using quiz_service.Services.Team;
using quiz_service.Services.User;

namespace quiz_service.Controllers;

[Route("teams/{teamId:guid}/users")]
public class TeamUserController : ApiController
{
    private readonly ITeamService _teamService;
    private readonly ITeamUserService _teamUserService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public TeamUserController(ITeamService teamService, ITeamUserService teamUserService,
        UserManager<ApplicationUser> userManager, IUserService userService, IMapper mapper)
    {
        _teamService = teamService;
        _teamUserService = teamUserService;
        _userManager = userManager;
        _userService = userService;
        _mapper = mapper;
    }

    [Authorize]
    [HttpGet("")]
    public async Task<IActionResult> GetAsync(Guid teamId)
    {
        var team = await _teamService.GetByIdAsync(teamId);
        return Ok(_mapper.Map<List<TeamMemberDTO>>(team.Member));
    }

    [Authorize]
    [HttpPost("")]
    public async Task<IActionResult> JoinAsync(Guid teamId)
    {
        var currentUserName = User.Identity?.Name;
        if (currentUserName == null)
            return Unauthorized();
        var currentUser = await _userManager.FindByNameAsync(currentUserName);
        if (currentUser == null)
            return Unauthorized();
        var team = await _teamUserService.AddAsync(teamId, currentUser);
        return Ok(_mapper.Map<List<TeamMemberDTO>>(team.Member));
    }

    [Authorize]
    [HttpDelete("{username}")]
    public async Task<IActionResult> RemoveAsync(Guid teamId, string username)
    {
        var user = await _userService.GetByUsernameAsync(username); 
        var team = await _teamUserService.RemoveAsync(teamId, user);
        return Ok(_mapper.Map<List<TeamMemberDTO>>(team.Member));
    }
}