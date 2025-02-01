using Application.Vijesti;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class VijestiController : BaseAPIController
    {
        [HttpGet] //api/vijesti
        public async Task<ActionResult<List<Vijest>>> GetVijesti()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{slug}")] //api/vijesti/test-vijest
        public async Task<ActionResult<Vijest>> GetVijest(string slug)
        {
            return await Mediator.Send(new Details.Query{Slug = slug});
        }

        [HttpPost]
        public async Task<IActionResult> CreateVijest(Vijest vijest)
        {
            await Mediator.Send(new Create.Command {Vijest = vijest});

            return Ok();
        }

        [HttpPut("{slug}")]
        public async Task<IActionResult> EditVijest(string slug, Vijest vijest)
        {
            vijest.Slug = slug;

            await Mediator.Send(new Edit.Command {Vijest = vijest});

            return Ok();
        }

        [HttpDelete("{slug}")]
        public async Task<IActionResult> DeleteVijest(string slug)
        {
            await Mediator.Send(new Delete.Command {Slug = slug});

            return Ok();
        }
    }
}