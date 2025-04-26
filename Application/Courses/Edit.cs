using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Courses
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Course Course { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var course = await _context.Courses
                    .Include(c => c.Modules)
                    .FirstOrDefaultAsync(x => x.Id == request.Course.Id);

                if (course == null)
                    throw new Exception("Kurs nije pronađen.");

                _mapper.Map(request.Course, course);

                await _context.SaveChangesAsync();
            }
        }
    }
}