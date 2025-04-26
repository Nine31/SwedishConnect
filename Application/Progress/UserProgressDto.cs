namespace Application.Progress
{
    public class UserProgressDto
    {
        public string AppUserId { get; set; }
        public int TotalPoints { get; set; }
        public bool CompletedAll { get; set; }
        public DateTime DateCompleted { get; set; }
    }
}