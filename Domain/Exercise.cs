namespace Domain
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; } // Tačan odgovor

        // Relacija sa opcijama odgovora
        public ICollection<AnswerOption> AnswerOptions { get; set; } = new List<AnswerOption>();

        // Relacija sa lekcijom
        public int LessonItemId { get; set; }
        public LessonItem LessonItem { get; set; }

        public int Points { get; set; } // Poeni koje korisnik može osvojiti za ovu vježbu
    }
}