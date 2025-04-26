using Domain;
using MediatR;
using Persistence;

namespace Application.Courses
{
    public class Create
    {
        public class Command : IRequest
        {
            public Course Course { get; set; }
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
                _context.Courses.Add(request.Course);
                await _context.SaveChangesAsync();
            }
        }
    }
}