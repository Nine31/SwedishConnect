using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Courses
{
    public class List
    {
        public class Query : IRequest<List<CourseDto>> { }

        public class Handler : IRequestHandler<Query, List<CourseDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<CourseDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Courses
                    .ProjectTo<CourseDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
            }
        }
    }
}