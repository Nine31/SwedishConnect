using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Vijest> Vijests { get; set; }
        public DbSet<Reaction> Reactions { get; set; }
    }
}