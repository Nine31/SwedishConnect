using Application.Progress;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/napredak")]
    public class ProgressController : BaseAPIController
    {
        // GET: api/napredak/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<UserProgressDto>> GetUserProgress(string userId, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new GetUserProgress.Query { UserId = userId }, cancellationToken);
            if (result == null) return NotFound();
            return Ok(result);
        }

        // POST: api/napredak
        [HttpPost]
        public async Task<IActionResult> CreateUserProgress(CreateUserProgress.Command command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetUserProgress), new { userId = result.AppUserId }, result);
        }

        // PUT: api/napredak/{userId}/vjezbe/{exerciseId}
        [HttpPut("{userId}/vjezbe/{exerciseId}")]
        public async Task<IActionResult> UpdateExerciseProgress(string userId, int exerciseId, UpdateExerciseProgress.Command command, CancellationToken cancellationToken)
        {
            if (userId != command.UserProgress.AppUserId || exerciseId != command.ExerciseProgress.ExerciseId)
                return BadRequest("Neusklađeni ID parametri.");

            await Mediator.Send(command, cancellationToken);
            return NoContent();
        }

        // DELETE: api/napredak/{userId}/vjezbe/{exerciseId}
        [HttpDelete("{userId}/vjezbe/{exerciseId}")]
        public async Task<IActionResult> DeleteExerciseProgress(string userId, int exerciseId, CancellationToken cancellationToken)
        {
            var command = new DeleteExerciseProgress.Command { UserId = userId, ExerciseId = exerciseId };
            await Mediator.Send(command, cancellationToken);
            return NoContent();
        }
    }
}