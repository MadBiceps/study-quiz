using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using quiz_service.Models.Database;
using quiz_service.Models.DTOs.OutDTO;

namespace quiz_service.Controllers;

[Route("users")]
public class UserController : ApiController
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    public UserController(UserManager<ApplicationUser> userManager, IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    [Authorize]
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentUserAsync()
    {
        var currentUserName = User.Identity?.Name;
        if (currentUserName == null)
            return Unauthorized();
        var currentUser = await _userManager.FindByNameAsync(currentUserName);
        if (currentUser == null)
            return Unauthorized();
        return Ok(_mapper.Map<UserDTO>(currentUser));
    }
}