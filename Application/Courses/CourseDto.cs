namespace Application.Courses
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsLocked { get; set; }

        public List<CourseModuleDto> Modules { get; set; } = new();
    }

    public class CourseModuleDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public List<LessonItemDto> LessonItems { get; set; } = new();
    }

    #nullable enable
    public class LessonItemDto
    {
        public int Id { get; set; }
        public string SwedishText { get; set; } = string.Empty;
        public string EnglishTranslation { get; set; } = string.Empty;
        public string BosnianTranslation { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string? AudioUrl { get; set; }
        public string? ExampleSentence { get; set; }
    }
}

#nullable restore