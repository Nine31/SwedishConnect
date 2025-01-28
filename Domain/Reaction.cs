namespace Domain
{
    public class Reaction
    {
        public Guid Id { get; set; }
        public string ReactionType { get; set; } // Tip reakcije (npr. "like", "love", "wow")
        public int Count { get; set; } // Broj puta kada je ta reakcija odabrana
        public Guid EntityId { get; set; } // ID entiteta (vijest, komentar, post, itd.)
        public string EntityType { get; set; } // Tip entiteta (npr. "Vijest", "Komentar")
    }
}