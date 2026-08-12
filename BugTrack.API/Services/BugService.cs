using BugTrack.API.Data;
using BugTrack.API.DTOs;
using BugTrack.API.Interfaces;
using BugTrack.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrack.API.Services
{
    public class BugService : IBugService
    {
        private readonly AppDbContext _context;

        public BugService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Bug>> GetAllAsync()
        {
            return await _context.Bugs
                .Include(b => b.CreatedBy)
                .Include(b => b.Comments)
                .ThenInclude(c => c.User)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<Bug?> GetByIdAsync(int id)
        {
            return await _context.Bugs
                .Include(b => b.CreatedBy)
                .Include(b => b.Comments)
                .ThenInclude(c => c.User)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<Bug> CreateAsync(
            BugCreateDto dto,
            int userId)
        {
            var bug = new Bug
            {
                Title = dto.Title,
                Description = dto.Description,
                Priority = dto.Priority,
                Status = "Open",
                AssignedToId = dto.AssignedToId,
                CreatedById = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Bugs.Add(bug);

            await _context.SaveChangesAsync();

            return bug;
        }

        public async Task<Bug?> UpdateAsync(
            int id,
            BugUpdateDto dto)
        {
            var bug = await _context.Bugs.FindAsync(id);

            if (bug == null)
                return null;

            if (!string.IsNullOrWhiteSpace(dto.Title))
                bug.Title = dto.Title;

            if (!string.IsNullOrWhiteSpace(dto.Description))
                bug.Description = dto.Description;

            if (!string.IsNullOrWhiteSpace(dto.Status))
                bug.Status = dto.Status;

            if (!string.IsNullOrWhiteSpace(dto.Priority))
                bug.Priority = dto.Priority;

            if (dto.AssignedToId.HasValue)
                bug.AssignedToId = dto.AssignedToId;

            bug.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return bug;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var bug = await _context.Bugs.FindAsync(id);

            if (bug == null)
                return false;

            _context.Bugs.Remove(bug);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}