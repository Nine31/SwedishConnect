using Application.Courses;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/kurs")]
    public class CoursesController : BaseAPIController
    {
        [AllowAnonymous]
        [HttpGet] // api/kurs
        public async Task<ActionResult<List<CourseDto>>> GetCourses()
        {
            return await Mediator.Send(new List.Query());
        }

        [AllowAnonymous]
        [HttpGet("{id}")] // api/kursevi/1
        public async Task<ActionResult<CourseDto>> GetCourse(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        // [Authorize(Policy = "IsAdmin")]
        [HttpPost]
        public async Task<IActionResult> CreateCourse(Course course)
        {
            await Mediator.Send(new Create.Command { Course = course });
            return Ok();
        }

        // [Authorize(Policy = "IsAdmin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCourse(int id, Course course)
        {
            course.Id = id;
            await Mediator.Send(new Edit.Command { Course = course });
            return Ok();
        }

        // [Authorize(Policy = "IsAdmin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
    }
}