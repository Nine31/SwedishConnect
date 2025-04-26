using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Exercises
{
    public class List
    {
        public class Query : IRequest<List<ExerciseDto>> { }

        public class Handler : IRequestHandler<Query, List<ExerciseDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<ExerciseDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Exercises
                    .Include(e => e.AnswerOptions)
                    .ProjectTo<ExerciseDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
            }
        }
    }
}