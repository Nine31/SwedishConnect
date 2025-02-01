using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vijesti
{
    public class List
    {
        public class Query : IRequest<List<Vijest>> {}

        public class Handler : IRequestHandler<Query, List<Vijest>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Vijest>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Vijests
                    .Include(v => v.Reactions)
                    .ToListAsync();
            }
        }
    }
}