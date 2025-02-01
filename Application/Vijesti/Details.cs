using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vijesti
{
    public class Details
    {
        public class Query : IRequest<Vijest>
        {
            public string Slug { get; set; }
        }

        public class Handler : IRequestHandler<Query, Vijest>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;  
            }
            public async Task<Vijest> Handle(Query request, CancellationToken cancellationToken)
            {
                var vijest = await _context.Vijests
                    .Include(v => v.Reactions)
                    .FirstOrDefaultAsync(v => v.Slug == request.Slug);

                if (vijest == null)
                {
                    throw new Exception($"Vijest sa slugom '{request.Slug}' nije pronađena.");
                }

                return vijest;
            }
        }
    }
}