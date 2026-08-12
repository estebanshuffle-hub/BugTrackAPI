using BugTrack.API.Data;
using BugTrack.API.DTOs;
using BugTrack.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BugTrack.API.Controllers
{
    [ApiController]
    [Route("api/bugs/{bugId}/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetComments(int bugId)
        {
            var comments = await _context.Comments
                .Where(c => c.BugId == bugId)
                .Include(c => c.User)
                .OrderBy(c => c.CreatedAt)
                .ToListAsync();

            return Ok(comments);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateComment(
            int bugId,
            CommentCreateDto dto)
        {
            bool bugExists =
                await _context.Bugs.AnyAsync(b => b.Id == bugId);

            if (!bugExists)
                return NotFound(new
                {
                    message = "Bug not found."
                });

            var userIdValue =
                User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(userIdValue, out int userId))
                return Unauthorized();

            var comment = new Comment
            {
                BugId = bugId,
                UserId = userId,
                Content = dto.Content,
                CreatedAt = DateTime.UtcNow
            };

            _context.Comments.Add(comment);

            await _context.SaveChangesAsync();

            return Ok(comment);
        }

        [HttpDelete("{commentId}")]
        [Authorize]
        public async Task<IActionResult> DeleteComment(
            int bugId,
            int commentId)
        {
            var comment = await _context.Comments
                .FirstOrDefaultAsync(c =>
                    c.Id == commentId &&
                    c.BugId == bugId);

            if (comment == null)
                return NotFound();

            _context.Comments.Remove(comment);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}