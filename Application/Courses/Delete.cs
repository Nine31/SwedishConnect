using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Courses
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
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
                var course = await _context.Courses
                    .Include(c => c.Modules)
                    .ThenInclude(m => m.LessonItems)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (course == null)
                    throw new Exception("Kurs nije pronađen.");

                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();
            }
        }
    }
}