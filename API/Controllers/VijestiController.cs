using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class VijestiController : BaseAPIController
    {
        private readonly DataContext _context;
        public VijestiController(DataContext context)
        {
            _context = context; 
        }

        [HttpGet]
        public async Task<ActionResult<List<Vijest>>> GetVijesti()
        {
            return await _context.Vijests.ToListAsync();
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<Vijest>> GetVijest(string slug)
        {
            var vijest = await _context.Vijests.FirstOrDefaultAsync(v => v.Slug == slug);

            if (vijest == null)
            {
                return NotFound();
            }

            return Ok(vijest);
        }

    }
}