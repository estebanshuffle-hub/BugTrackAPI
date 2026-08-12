using BugTrack.API.DTOs;
using BugTrack.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BugTrack.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BugsController : ControllerBase
    {
        private readonly IBugService _bugService;

        public BugsController(IBugService bugService)
        {
            _bugService = bugService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var bugs = await _bugService.GetAllAsync();

            return Ok(bugs);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            var bug = await _bugService.GetByIdAsync(id);

            if (bug == null)
                return NotFound();

            return Ok(bug);
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            BugCreateDto dto)
        {
            var userIdValue =
                User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(userIdValue, out int userId))
                return Unauthorized();

            var bug =
                await _bugService.CreateAsync(dto, userId);

            return CreatedAtAction(
                nameof(GetById),
                new { id = bug.Id },
                bug
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            BugUpdateDto dto)
        {
            var bug =
                await _bugService.UpdateAsync(id, dto);

            if (bug == null)
                return NotFound();

            return Ok(bug);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool deleted =
                await _bugService.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}