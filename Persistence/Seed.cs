using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            await SeedUsers(context, userManager);
            await SeedVijesti(context);
        }

        public static async Task SeedUsers(DataContext context, UserManager<AppUser> userManager)
        {
            if (userManager.Users.Any()) return;

            var users = new List<AppUser>
            {
                new AppUser
                {
                    DisplayName = "Amer",
                    UserName = "amer",
                    Email = "amer@swedishconnect.com"
                },
                new AppUser
                {
                    DisplayName = "Josip",
                    UserName = "josip",
                    Email = "josip@swedishconnect.com"
                },
                new AppUser
                {
                    DisplayName = "Tamara",
                    UserName = "tamara",
                    Email = "tamara@swedishconnect.com"
                },
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

        private static async Task SeedVijesti(DataContext context)
        {
            if (context.Vijests.Any()) return;

            var vijesti = new List<Vijest>
            {
                new Vijest
                {
                    Title = "DF: Umjesto što traži da ga mi spašavamo, Konakoviću preporučujemo da se obrati onima koji su ga i izabrali, neka krene od Čovića",
                    Content = "Konaković nije imao podršku DF-a ni kada je izabran a samim tim nema je ni sada. DF će glasati za njegovu smjenu iz već poznatih razloga, navedenih u inicijativi, poručili su iz DF-a. <br> - Konakoviću toplo preporučujemo da spas za sebe potraži kod onih koji su ga izabrali a ne kod onih koji ga svakako nikada nisu ni podražavali, uključujući i DF. <br> S obzirom da i sam kaže kako između njega i HDZ-a nema nikakve razlike jer “misli i živi” isto što i HDZ, neka krene upravo od HDZ-a. <br> Sigurni smo da mu Čović, zahvaljujući svojim vezama svake vrste sa Dodikom, može pomoći kod Dodika da mu podari milost i sačuva ga na funkciji - navodi se u saopćenju DF-a.",
                    Summary = "Sigurni smo da mu Čović, zahvaljujući svojim vezama svake vrste sa Dodikom, može pomoći kod Dodika da mu podari milost i sačuva ga na funkciji.",
                    Slug = "df-umjesto-sto-trazi-da-ga-mi-spasavamo-konakovicu-preporucujemo-da-se-obrati-onima-koji-su-ga-i-izabrali-neka-krene-od-covica",
                    Author = "Admin",
                    PictureUrl = "https://res.cloudinary.com/dv57qyqlm/image/upload/v1738096603/Konakovic_hkayzh.jpg",
                    Category = "BIH",
                    PublishedDate = DateTime.UtcNow,
                    Views = 0,
                    IsFeatured = true,
                    Tags = new string[] {"Konakovic", "DF", "Dodik", "Covic"}
                },
                new Vijest
                {
                    Title = "Uhapšen Benjamin Aganović zbog silovanja djevojke na Ilidži",
                    Content = "Benjamin Aganović i još jedna osoba uhapšeni su zbog silovanja djevojke na Ilidži prošlog vikenda, potvrđeno je za portal Avaza. <br> Jučer je uhapšena jedna osoba zbog istog slučaja, a danas je uhapšen i Aganović. <br> Aganović je od ranije bio poznat i po zloupotrebi droga, a i druga osoba, čiji identitet još uvijek nepoznat, navodno je od ranije poznata policiji. <br> On je svojevremeno hapšen pa pušten zbog sumnje da je bio umiješan u bacanje bombe na kuću načelnika Općine Stari Grad Irfana Čengića. <br> Kako smo objavili sinoć, oni su djevojku protivpravno lišili slobode, silovali, maltretirali i zlostavljali. Kako smo uspjeli saznati od izvora bliskog istrazi, djevojka je u teškom stanju i još nije saslušana.",
                    Summary = "On je svojevremeno hapšen pa pušten zbog sumnje da je bio umiješan u bacanje bombe na kuću načelnika Općine Stari Grad Irfana Čengića",
                    Slug = "uhapsen-benjamin-aganovic-zbog-silovanja-djevojke-na-ilidzi",
                    Author = "Admin",
                    PictureUrl = "https://res.cloudinary.com/dv57qyqlm/image/upload/v1738096816/Hapsenje_rjuych.jpg",
                    Category = "Crna Hronika",
                    PublishedDate = DateTime.UtcNow,
                    Views = 0,
                    IsFeatured = true,
                    Tags = new string[] {"Hapsenje", "Silovanje", "Benjamin", "Aganovic", "Ilidža"}
                },
                new Vijest
                {
                    Title = "Hemmapublikens stora irritation – och nu är LHC nere på kvalplats",
                    Content = "BOTTENKÄNNINGLHC föll tungt mot Luleå – och samtidigt vann Modo klart mot HV. Det betyder att LHC nu är nere på kvalplats i den så jämna tabellen.MATCHENJämnt där det tände till mer i tredje perioden.",
                    Summary = "2–3 för Linköping HC i hemmamötet med Luleå. Här är våra punkter och betyg.",
                    Slug = "hemmapublikens-stora-irritation-och-nu-ar-lhc-nere-pa-kvalplats",
                    Author = "Admin",
                    PictureUrl = "https://res.cloudinary.com/dv57qyqlm/image/upload/v1665868227/cld-sample-3.jpg",
                    Category = "Sport",
                    PublishedDate = DateTime.UtcNow,
                    Views = 0,
                    IsFeatured = false,
                    Tags = new string[] {"LHC", "Hockey", "Kvalplats"}
                },
            };

            await context.Vijests.AddRangeAsync(vijesti);
            await context.SaveChangesAsync();

        }
    }
}