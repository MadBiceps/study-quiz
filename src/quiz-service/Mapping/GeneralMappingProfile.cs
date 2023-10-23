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

        CreateMap<InQuestionDTO, QuestionDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => Guid.Empty))
            .ForMember(dest => dest.Label, opt => opt.MapFrom(x => x.Label))
            .ForMember(dest => dest.Hint, opt => opt.MapFrom(x => x.Hint))
            .ForMember(dest => dest.Answers, opt => opt.MapFrom(x => x.Answers));

        CreateMap<InAnswerDTO, Answer>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => x.Id ?? Guid.Empty))
            .ForMember(dest => dest.Label, opt => opt.MapFrom(x => x.Label))
            .ForMember(dest => dest.Reason, opt => opt.MapFrom(x => x.Reason))
            .ForMember(dest => dest.IsCorrect, opt => opt.MapFrom(x => x.IsCorrect)) ;

        CreateMap<InQuizDTO, Quiz>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => Guid.Empty))
            .ForMember(dest => dest.Title, opt => opt.MapFrom(x => x.Title))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(x => x.Description));

        // Out Mapping
        CreateMap<ApplicationUser, UserDTO>()
            .ForMember(dest => dest.Username, opt => opt.MapFrom(x => x.UserName))
            .ForMember(dest => dest.Mail, opt => opt.MapFrom(x => x.Email));

        CreateMap<Team, TeamDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => x.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(x => x.Name))
            .ForMember(dest => dest.Creator, opt => opt.MapFrom(x => x.Creator))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(x => x.CreatedAt))
            .ForMember(dest => dest.MaxMemberCount, opt => opt.MapFrom(x => 10))
            .ForMember(dest => dest.MemberCount, opt => opt.MapFrom(x => x.Member.Count(x => x.Left != null)))
            .ForMember(dest => dest.TeamMember, opt => opt.MapFrom(x => x.Member))
            .ForMember(dest => dest.Scores, opt => opt.MapFrom(x => x.QuizAttempts));

        CreateMap<QuizAttempt, TeamScoreDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => x.Id))
            .ForMember(dest => dest.Score,
                opt => opt.MapFrom(x => x.Questions.Sum(y => y.Answer != null ? y.Answer.Score : 0)))
            .ForMember(dest => dest.Member,
                opt => opt.MapFrom(x => x.User.Memberships.First(y => x.Team != null && x.Team.Id.Equals(x.Team.Id))))
            .ForMember(dest => dest.DateTime, opt => opt.MapFrom(x => x.CreatedAt));

        CreateMap<TeamMembership, TeamMemberDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => x.Id))
            .ForMember(dest => dest.Username, opt => opt.MapFrom(x => x.User.UserName))
            .ForMember(dest => dest.Mail, opt => opt.MapFrom(x => x.User.Email))
            .ForMember(dest => dest.Joined, opt => opt.MapFrom(x => x.Joined));

        CreateMap<QuizAttempt, QuizAttemptDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => x.Id))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(x => x.CreatedAt))
            .ForMember(dest => dest.User, opt => opt.MapFrom(x => x.User))
            .ForMember(dest => dest.Questions, opt => opt.MapFrom(x => x.Questions))
            .ForMember(dest => dest.TeamId, opt => opt.MapFrom(x => x.Team != null ? x.Team.Id : Guid.Empty))
            .ForMember(dest => dest.QuizId, opt => opt.MapFrom(x => x.Quiz.Id))
            .ForMember(dest => dest.FinishedAt, opt => opt.MapFrom(x => x.FinishedAt));

        CreateMap<AttemptQuestion, AttemptQuestionDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => x.Id))
            .ForMember(dest => dest.Answer, opt => opt.MapFrom(x => x.Answer))
            .ForMember(dest => dest.Order, opt => opt.MapFrom(x => x.Order))
            .ForMember(dest => dest.Question, opt => opt.MapFrom(x => x.Question));

        CreateMap<AttemptAnswer, AttemptAnswerDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => x.Id))
            .ForMember(dest => dest.Answer, opt => opt.MapFrom(x => x.Answer))
            .ForMember(dest => dest.Score, opt => opt.MapFrom(x => x.Score))
            .ForMember(dest => dest.AnsweredAt, opt => opt.MapFrom(x => x.AnsweredAt));

        CreateMap<Question, QuestionDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => x.Id))
            .ForMember(dest => dest.Label, opt => opt.MapFrom(x => x.Hint))
            .ForMember(dest => dest.Hint, opt => opt.MapFrom(x => x.Hint))
            .ForMember(dest => dest.Answers, opt => opt.MapFrom(x => x.Answers))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(x => x.Answers))
            .ForMember(dest => dest.Creator, opt => opt.MapFrom(x => x.Creator))
            .ForMember(dest => dest.EditedAt, opt => opt.MapFrom(x => x.EditedAt))
            .ForMember(dest => dest.EditedBy, opt => opt.MapFrom(x => x.EditedBy));

        CreateMap<Answer, AnswerDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => x.Id))
            .ForMember(dest => dest.Label, opt => opt.MapFrom(x => x.Label))
            .ForMember(dest => dest.Reason, opt => opt.MapFrom(x => x.Reason))
            .ForMember(dest => dest.IsCorrect, opt => opt.MapFrom(x => x.IsCorrect))
            .ForMember(dest => dest.Creator, opt => opt.MapFrom(x => x.Creator))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(x => x.CreatedAt))
            .ForMember(dest => dest.EditedBy, opt => opt.MapFrom(x => x.EditedBy))
            .ForMember(x => x.EditedAt, opt => opt.MapFrom(x => x.EditedAt));

        CreateMap<Quiz, QuizDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(x => x.Id))
            .ForMember(dest => dest.Title, opt => opt.MapFrom(x => x.Title))
            .ForMember(dest => dest.Creator, opt => opt.MapFrom(x => x.Creator))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(x => x.CreatedAt))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(x => x.Description))
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(x => x.UpdatedAt))
            .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(x => x.UpdatedBy))
            .ForMember(dest => dest.Attempts, opt => opt.MapFrom(x => x.Attempts));
    }
}