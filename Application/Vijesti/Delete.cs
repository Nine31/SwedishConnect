using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vijesti
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Slug { get; set; }
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
                var vijest = await _context.Vijests
                    .Include(v => v.Reactions)
                    .FirstOrDefaultAsync(v => v.Slug == request.Slug);
                
                if (vijest == null)
                {
                    throw new Exception("Vijest nije pronađena.");
                }

                _context.Remove(vijest);

                await _context.SaveChangesAsync();
            }
        }
    }
}