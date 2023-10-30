using quiz_service.Attributes;
using quiz_service.Models.Database;

namespace quiz_service.Services.Quiz;

[InjectableInterface]
public interface IQuizService
{
    public Task<List<Models.Database.Quiz>> GetAsync(int? page, int? pageSize, string? searchTerm, ApplicationUser? user = null);
    public Task<Models.Database.Quiz> GetByIdAsync(Guid id, ApplicationUser? user = null);
    public Task<Models.Database.Quiz> CreateAsync(Models.Database.Quiz quiz, ApplicationUser user);
    public Task<Models.Database.Quiz> UpdateAsync(Guid id, Models.Database.Quiz quiz, ApplicationUser user);
    public Task DeleteAsync(Guid id);
}