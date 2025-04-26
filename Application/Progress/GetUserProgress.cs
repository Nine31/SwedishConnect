using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Progress
{
    public class GetUserProgress
    {
        public class Query : IRequest<UserProgressDto>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserProgressDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<UserProgressDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var userProgress = await _context.UserProgresses
                    .Where(up => up.AppUserId == request.UserId)
                    .Include(up => up.ExerciseProgresses)
                    .FirstOrDefaultAsync(cancellationToken);

                if (userProgress == null)
                    return null;

                return _mapper.Map<UserProgressDto>(userProgress);
            }
        }
    }
}