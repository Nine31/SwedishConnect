using Domain;
using MediatR;
using Persistence;

namespace Application.Exercises
{
    public class Create
    {
        public class Command : IRequest<int> // Vraćamo ID kreirane vježbe
        {
            public string Question { get; set; }
            public string Answer { get; set; }
            public int LessonItemId { get; set; }
            public int Points { get; set; }
            public List<AnswerOption> AnswerOptions { get; set; } = new List<AnswerOption>(); // Opcije odgovora
        }

        public class Handler : IRequestHandler<Command, int>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                // Kreiramo vježbu
                var exercise = new Exercise
                {
                    Question = request.Question,
                    Answer = request.Answer,
                    LessonItemId = request.LessonItemId,
                    Points = request.Points,
                    AnswerOptions = request.AnswerOptions // Dodajemo odgovarajuće opcije
                };

                // Dodajemo u bazu
                _context.Exercises.Add(exercise);
                await _context.SaveChangesAsync(cancellationToken);

                return exercise.Id;
            }
        }
    }
}