using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vijesti
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Vijest Vijest { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;  
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var vijest = await _context.Vijests
                    .Include(v => v.Reactions)
                    .FirstOrDefaultAsync(v => v.Slug == request.Vijest.Slug);

                if (vijest == null) throw new Exception("Vijest nije pronađena");

                _mapper.Map(request.Vijest, vijest);

                if (request.Vijest.Reactions != null)
                {
                    // Brišemo stare reakcije koje više ne postoje u novom requestu
                    
                    var reactionsToRemove = vijest.Reactions
                        .Where(r => !request.Vijest.Reactions.Any(nr => nr.ReactionType == r.ReactionType))
                        .ToList();

                    foreach (var reaction in reactionsToRemove)
                    {
                        _context.Reactions.Remove(reaction);
                    }

                    // Ažuriramo postojeće i dodajemo nove reakcije

                    foreach (var newReaction in request.Vijest.Reactions)
                    {
                        var existingReaction = vijest.Reactions
                            .FirstOrDefault(r => r.ReactionType == newReaction.ReactionType);
                        
                        if (existingReaction != null)
                        {
                            existingReaction.Count = newReaction.Count;
                            existingReaction.EntityId = vijest.Id;
                            existingReaction.EntityType = "Vijest";
                        }
                        else
                        {
                            var reaction = new Reaction
                            {
                                Id = Guid.NewGuid(),
                                ReactionType = newReaction.ReactionType,
                                Count = newReaction.Count,
                                EntityId = vijest.Id,
                                EntityType = "Vijest"
                            };
                            _context.Reactions.Add(reaction);
                            vijest.Reactions.Add(reaction);
                        }
                    }
                }
                await _context.SaveChangesAsync();
            }
        }
    }
}