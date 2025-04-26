namespace Domain
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; } 
        public string Description { get; set; }
        public bool IsLocked { get; set; } = false;
        public int? UnlocksAfterCourseId { get; set; }

        public ICollection<CourseModule> Modules { get; set; } = new List<CourseModule>();
        public Course UnlocksAfterCourse { get; set; }
    }
}