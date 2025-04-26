using Domain;
using MediatR;
using Persistence;

namespace Application.Progress
{
    public class CreateUserProgress
    {
        public class Command : IRequest<UserProgressDto>
        {
            public string AppUserId { get; set; }
        }

        public class Handler : IRequestHandler<Command, UserProgressDto>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<UserProgressDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var userProgress = new UserProgress
                {
                    AppUserId = request.AppUserId,
                    DateCompleted = DateTime.Now
                };

                _context.UserProgresses.Add(userProgress);
                await _context.SaveChangesAsync(cancellationToken);

                return new UserProgressDto
                {
                    AppUserId = userProgress.AppUserId,
                    TotalPoints = 0,
                    CompletedAll = false,
                    DateCompleted = userProgress.DateCompleted
                };
            }
        }
    }
}