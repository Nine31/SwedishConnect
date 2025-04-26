using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // DbSet za vijesti
        public DbSet<Vijest> Vijests { get; set; }

        // DbSet za reakcije
        public DbSet<Reaction> Reactions { get; set; }

        // DbSet za kurseve
        public DbSet<Course> Courses { get; set; }
        
        // DbSet za module kurseva
        public DbSet<CourseModule> CourseModules { get; set; }
        
        // DbSet za lekcije
        public DbSet<LessonItem> LessonItems { get; set; }

        // DbSet za vježbe
        public DbSet<Exercise> Exercises { get; set; }

        // DbSet za opcije odgovora
        public DbSet<AnswerOption> AnswerOptions { get; set; }

        // DbSet za napredak korisnika
        public DbSet<UserProgress> UserProgresses { get; set; }

        // DbSet za napredak korisnika po vježbama
        public DbSet<ExerciseProgress> ExerciseProgresses { get; set; }

        // Definisanje relacija i podešavanje baze
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Veza između Course i CourseModule
            builder.Entity<Course>()
                .HasMany(c => c.Modules)
                .WithOne(cm => cm.Course)
                .HasForeignKey(cm => cm.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            // Veza između CourseModule i LessonItem
            builder.Entity<CourseModule>()
                .HasMany(cm => cm.LessonItems)
                .WithOne(li => li.CourseModule)
                .HasForeignKey(li => li.CourseModuleId)
                .OnDelete(DeleteBehavior.Cascade);

            // Veza između LessonItem i Exercise
            builder.Entity<LessonItem>()
                .HasMany(li => li.Exercises)
                .WithOne(e => e.LessonItem)
                .HasForeignKey(e => e.LessonItemId)
                .OnDelete(DeleteBehavior.Cascade);

            // Veza između Exercise i AnswerOption
            builder.Entity<Exercise>()
                .HasMany(e => e.AnswerOptions)
                .WithOne(ao => ao.Exercise)
                .HasForeignKey(ao => ao.ExerciseId)
                .OnDelete(DeleteBehavior.Cascade);

            // Veza između UserProgress i ExerciseProgress i AppUser
            builder.Entity<UserProgress>()
                .HasMany(up => up.ExerciseProgresses)
                .WithOne(ep => ep.UserProgress)
                .HasForeignKey(ep => ep.UserProgressId)
                .OnDelete(DeleteBehavior.Cascade);

            // Veza između ExerciseProgress i Exercise
            builder.Entity<ExerciseProgress>()
                .HasOne(ep => ep.Exercise)
                .WithMany()
                .HasForeignKey(ep => ep.ExerciseId)
                .OnDelete(DeleteBehavior.Cascade);

            // Veza između UserProgress i AppUser (via AppUserId)
            builder.Entity<UserProgress>()
                .HasOne(up => up.AppUser)
                .WithMany(u => u.UserProgresses)
                .HasForeignKey(up => up.AppUserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}