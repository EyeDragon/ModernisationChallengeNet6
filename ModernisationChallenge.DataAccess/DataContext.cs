using Microsoft.EntityFrameworkCore;

namespace ModernisationChallenge.DataAccess
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Task> Tasks { get; set; }
    }
}