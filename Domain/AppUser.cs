using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }

        public ICollection<UserProgress> UserProgresses { get; set; } = new List<UserProgress>();
    }
}