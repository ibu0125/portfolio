// ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;

namespace backendApp.Models {
    public class ApplicationDbContext : DbContext {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) {
        }

        public DbSet<Infomation> UserInfo {
            get; set;
        } // UserInfo モデルの DbSet

    }
}
