namespace Domain
{
    public class CourseModule
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        // Relacija sa kursom
        public int CourseId { get; set; }
        public Course Course { get; set; }

        // Relacija sa lekcijama modula
        public ICollection<LessonItem> LessonItems { get; set; } = new List<LessonItem>();
    }
}