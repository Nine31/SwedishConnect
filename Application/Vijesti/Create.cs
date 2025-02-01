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
                _context.Vijests.Add(request.Vijest);

                await _context.SaveChangesAsync();
            }
        }
    }
}