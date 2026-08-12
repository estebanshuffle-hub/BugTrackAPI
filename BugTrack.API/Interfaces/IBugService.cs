using BugTrack.API.DTOs;
using BugTrack.API.Models;

namespace BugTrack.API.Interfaces
{
    public interface IBugService
    {
        Task<IEnumerable<Bug>> GetAllAsync();

        Task<Bug?> GetByIdAsync(int id);

        Task<Bug> CreateAsync(BugCreateDto dto, int userId);

        Task<Bug?> UpdateAsync(int id, BugUpdateDto dto);

        Task<bool> DeleteAsync(int id);
    }
}