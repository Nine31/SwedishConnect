using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Courses
{
    public class Details
    {
        public class Query : IRequest<CourseDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, CourseDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<CourseDto> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Courses
                    .Where(c => c.Id == request.Id)
                    .Include(c => c.Modules)
                        .ThenInclude(m => m.LessonItems)
                    .ProjectTo<CourseDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(cancellationToken);
            }
        }
    }
}