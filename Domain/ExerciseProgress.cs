namespace Domain
{
    public class ExerciseProgress
    {
        public int Id { get; set; }

        public int ExerciseId { get; set; }  // FK za vježbu
        public Exercise Exercise { get; set; }

        public int Points { get; set; }  // Poeni koje korisnik ostvaruje za ovu vježbu

        public int UserProgressId { get; set; }  // FK za UserProgress
        public UserProgress UserProgress { get; set; }
    }
}