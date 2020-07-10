using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SaveOurFood.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Save_Our_Food.Models;

namespace SaveOurFood.Data
{

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Country> Countries { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>(b =>
            {
                // Each User can have many entries in the UserRole join table
                b.HasMany(e => e.UserRoles)
                    .WithOne()
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
                b.HasIndex(u => u.Endpoint)
                .IsUnique();
            });

        }
    }
}
