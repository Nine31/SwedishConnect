namespace Domain
{
    public class UserProgress
    {
        public int Id { get; set; }

        public string AppUserId { get; set; }  // FK za korisnika
        public AppUser AppUser { get; set; }

        // Kolekcija koja sadrži napredak po vježbama
        public ICollection<ExerciseProgress> ExerciseProgresses { get; set; } = new List<ExerciseProgress>();

        // Ukupni poeni koji je korisnik osvojio
        public int TotalPoints => ExerciseProgresses.Sum(ep => ep.Points);

        public bool CompletedAll { get; set; }  // Da li je korisnik završio sve lekcije i vježbe

        public DateTime DateCompleted { get; set; }
    }
}