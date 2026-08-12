using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace BugTrack.API.Models
{
    public class Bug
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(2000)]
        public string Description { get; set; } = string.Empty;

        public string Status { get; set; } = "Open";

        public string Priority { get; set; } = "Medium";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public int CreatedById { get; set; }

        public User? CreatedBy { get; set; }

        public int? AssignedToId { get; set; }

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}