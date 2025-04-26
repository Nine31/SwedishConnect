using Application.Exercises;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/vjezbe")]
    public class ExercisesController : BaseAPIController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<ExerciseDto>>> GetExercises(CancellationToken cancellationToken)
        {
            return await Mediator.Send(new List.Query(), cancellationToken);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<ExerciseDto>> GetExerciseDetails(int id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new Details.Query { Id = id }, cancellationToken);

            if (result == null)
                return NotFound();

            return result;
        }

        [HttpPost]
        public async Task<IActionResult> CreateExercise(Create.Command command, CancellationToken cancellationToken)
        {
            var createdId = await Mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetExerciseDetails), new { id = createdId }, createdId);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditExercise(int id, Edit.Command command, CancellationToken cancellationToken)
        {
            if (id != command.Id)
                return BadRequest("ID u URL-u i tijelo se ne podudaraju.");

            await Mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExercise(int id, CancellationToken cancellationToken)
        {
            await Mediator.Send(new Delete.Command { Id = id }, cancellationToken);
            return NoContent();
        }
    }
}