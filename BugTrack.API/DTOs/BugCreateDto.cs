using System.ComponentModel.DataAnnotations;

namespace BugTrack.API.DTOs
{
    public class BugCreateDto
    {
        [Required]
        [MaxLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(2000)]
        public string Description { get; set; } = string.Empty;

        public string Priority { get; set; } = "Medium";

        public int? AssignedToId { get; set; }
    }
}