using System.ComponentModel.DataAnnotations;

namespace BugTrack.API.DTOs
{
    public class CommentCreateDto
    {
        [Required]
        [MaxLength(1000)]
        public string Content { get; set; } = string.Empty;
    }
}