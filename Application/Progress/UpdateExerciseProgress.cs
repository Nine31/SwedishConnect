using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Progress
{
    public class UpdateExerciseProgress
    {
        public class Command : IRequest
        {
            public ExerciseProgress ExerciseProgress { get; set; }
            public UserProgress UserProgress { get; set; }
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
                var existingProgress = await _context.ExerciseProgresses
                    .FirstOrDefaultAsync(ep => ep.UserProgressId == request.UserProgress.Id && ep.ExerciseId == request.ExerciseProgress.ExerciseId, cancellationToken);

                if (existingProgress != null)
                {
                    existingProgress.Points = request.ExerciseProgress.Points;
                }
                else
                {
                    _context.ExerciseProgresses.Add(request.ExerciseProgress);
                }

                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}