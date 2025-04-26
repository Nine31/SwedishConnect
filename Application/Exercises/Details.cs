using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Exercises
{
    public class Details
    {
        public class Query : IRequest<ExerciseDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ExerciseDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ExerciseDto> Handle(Query request, CancellationToken cancellationToken)
            {
                // Uključivanje LessonItem sa povezanim Exercises
                var exercise = await _context.Exercises
                    .Where(e => e.Id == request.Id)
                    .Include(e => e.LessonItem)  // Ovo uključuje povezani LessonItem
                    .Include(e => e.AnswerOptions) // Uključujemo odgovarajuće opcije odgovora
                    .FirstOrDefaultAsync(cancellationToken);

                if (exercise == null)
                    throw new Exception("Exercise nije pronađen.");

                // Mapiranje na ExerciseDto
                return _mapper.Map<ExerciseDto>(exercise);
            }
        }
    }
}