namespace Domain
{
    public class AnswerOption
    {
        public int Id { get; set; }
        public string Text { get; set; } // Opcija odgovora

        public bool IsCorrect { get; set; } // Da li je tačan odgovor

        // Relacija sa vježbom
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }
    }
}