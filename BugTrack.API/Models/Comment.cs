using System.ComponentModel.DataAnnotations;

namespace BugTrack.API.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int BugId { get; set; }

        public Bug? Bug { get; set; }

        public int UserId { get; set; }

        public User? User { get; set; }
    }
}