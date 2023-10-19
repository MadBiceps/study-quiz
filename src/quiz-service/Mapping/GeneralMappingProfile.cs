using AutoMapper;
using quiz_service.Models.Database;
using quiz_service.Models.DTOs.InDTO;
using quiz_service.Models.DTOs.OutDTO;

namespace quiz_service.Mapping;

public class GeneralMappingProfile : Profile
{
    public GeneralMappingProfile()
    {
        // In Mapping
        CreateMap<InTeamDTO, Team>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => Guid.Empty))
            .ForMember(dest => dest.Member, opt => opt.MapFrom(x => new List<TeamMembership>()))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(x => x.Name))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(x => DateTime.MinValue));
        
        // Out Mapping
    }
}