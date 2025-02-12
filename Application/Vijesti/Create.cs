using Domain;
using MediatR;
using Persistence;

namespace Application.Vijesti
{
    public class Create
    {
        public class Command : IRequest
        {
            public Vijest Vijest { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;  
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // Automatski generiši slug ako nije postavljen
                if (string.IsNullOrWhiteSpace(request.Vijest.Slug))
                {
                    request.Vijest.Slug = GenerateSlug(request.Vijest.Title);
                }
                _context.Vijests.Add(request.Vijest);

                await _context.SaveChangesAsync();
            }

            private string GenerateSlug(string title)
            {
                return title.ToLower()
                            .Replace(" ", "-")
                            .Replace("č", "c")
                            .Replace("ć", "c")
                            .Replace("š", "s")
                            .Replace("đ", "dj")
                            .Replace("ž", "z");
            }
        }
    }
}