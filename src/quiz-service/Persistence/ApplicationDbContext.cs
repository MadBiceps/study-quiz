using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using quiz_service.Models.Database;

namespace quiz_service.Persistence;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{

    public DbSet<Answer> Answers { get; set; }
    public DbSet<AttemptAnswer> AttemptAnswers { get; set; }
    public DbSet<AttemptQuestion> AttemptQuestions { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<QuizAttempt> QuizAttempts { get; set; }
    public DbSet<TeamMembership> TeamMemberships { get; set; }
    public DbSet<Team> Teams { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        
    }
}