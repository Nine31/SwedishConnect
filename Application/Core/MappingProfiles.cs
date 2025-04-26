using Application.Courses;
using Application.Exercises;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Vijesti
            CreateMap<Vijest, Vijest>()
                .ForMember(d => d.Id, o => o.Ignore()) // 🚀 Ignorišemo ID da ga AutoMapper ne mijenja
                .ForMember(d => d.Reactions, o => o.Ignore()); // 🛑 Sprečavamo prepisivanje reakcija na null

            // Courses
            CreateMap<Course, CourseDto>();
            CreateMap<CourseModule, CourseModuleDto>();
            CreateMap<LessonItem, LessonItemDto>();

            // Exercise
            CreateMap<Exercise, ExerciseDto>();
            CreateMap<AnswerOption, AnswerOptionDto>();
        }
    }
}