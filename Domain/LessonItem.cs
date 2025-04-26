#nullable enable

namespace Domain
{
    public class LessonItem
    {
        public int Id { get; set; }

        public string SwedishText { get; set; } = string.Empty;
        public string EnglishTranslation { get; set; } = string.Empty;
        public string BosnianTranslation { get; set; } = string.Empty;

        public string? ImageUrl { get; set; }
        public string? AudioUrl { get; set; }
        public string? ExampleSentence { get; set; }

        // Relacija sa modulom kursa
        public int CourseModuleId { get; set; }
        public CourseModule CourseModule { get; set; } = default!;

        // Relacija sa vježbama
        public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
    }
}

#nullable restore