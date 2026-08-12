namespace BugTrack.API.DTOs
{
    public class BugUpdateDto
    {
        public string? Title { get; set; }

        public string? Description { get; set; }

        public string? Status { get; set; }

        public string? Priority { get; set; }

        public int? AssignedToId { get; set; }
    }
}