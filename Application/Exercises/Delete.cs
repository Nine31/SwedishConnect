using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Exercises
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; } // ID vježbe koju želimo da obrišemo
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
                // Pronalazimo vježbu prema ID-u
                var exercise = await _context.Exercises
                    .Include(e => e.AnswerOptions) // Uključujemo odgovore u slučaju da želimo da ih obrišemo (ako je potrebno)
                    .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

                if (exercise == null)
                    throw new Exception("Vježba nije pronađena.");

                // Uklanjamo vezane odgovore (ako je potrebno)
                _context.AnswerOptions.RemoveRange(exercise.AnswerOptions);

                // Uklanjamo vježbu iz baze
                _context.Exercises.Remove(exercise);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}