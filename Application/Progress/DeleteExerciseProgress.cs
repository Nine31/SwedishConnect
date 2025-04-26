using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Progress
{
    public class DeleteExerciseProgress
    {
        public class Command : IRequest
        {
            public string UserId { get; set; }
            public int ExerciseId { get; set; }
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
                var exerciseProgress = await _context.ExerciseProgresses
                    .FirstOrDefaultAsync(ep => ep.UserProgress.AppUserId == request.UserId && ep.ExerciseId == request.ExerciseId, cancellationToken);

                if (exerciseProgress != null)
                {
                    _context.ExerciseProgresses.Remove(exerciseProgress);
                    await _context.SaveChangesAsync(cancellationToken);
                }
            }
        }
    }
}