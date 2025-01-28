namespace Domain
{
    public class Vijest
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Summary { get; set; }
        public string Slug { get; set; }
        public string Author { get; set; }
        public string PictureUrl { get; set; }
        public string Category { get; set; }
        public DateTime PublishedDate { get; set; }
        public int Views { get; set; } = 0;
        public bool IsFeatured { get; set; }
        public string[] Tags { get; set; }

        // Kolekcija svih reakcija na vijest
        public ICollection<Reaction> Reactions { get; set; }
    }
}