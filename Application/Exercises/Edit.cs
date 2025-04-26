using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Exercises
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; } // Id vježbe koju želimo da izmenimo
            public string Question { get; set; }
            public string Answer { get; set; }
            public int LessonItemId { get; set; }
            public int Points { get; set; }
            public List<AnswerOption> AnswerOptions { get; set; } = new List<AnswerOption>(); // Novi odgovori
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
                // Pronalazimo vežbu koju želimo da izmenimo
                var exercise = await _context.Exercises
                    .Include(e => e.AnswerOptions) // Uključujemo odgovore da bismo ih ažurirali
                    .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

                if (exercise == null)
                    throw new Exception("Vježba nije pronađena.");

                // Ažuriramo podatke
                exercise.Question = request.Question;
                exercise.Answer = request.Answer;
                exercise.LessonItemId = request.LessonItemId;
                exercise.Points = request.Points;

                // Ažuriramo odgovore
                // (ako želimo da ažuriramo ili dodamo nove odgovore, to radimo ovde)
                exercise.AnswerOptions.Clear(); // Brisanje postojećih odgovora
                foreach (var option in request.AnswerOptions)
                {
                    exercise.AnswerOptions.Add(option); // Dodavanje novih odgovora pojedinačno
                }

                // Spremamo promene u bazi
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}