using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Vijest, Vijest>()
                .ForMember(d => d.Id, o => o.Ignore()) // 🚀 Ignorišemo ID da ga AutoMapper ne mijenja
                .ForMember(d => d.Reactions, o => o.Ignore()); // 🛑 Sprečavamo prepisivanje reakcija na null
        }
    }
}