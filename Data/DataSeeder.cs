using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using SaveOurFood.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace SaveOurFood.Data
{
    public class DataSeeder
    {
        public static async void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            context.Database.EnsureCreated();
            if (!context.Users.Any())
            {
                ApplicationUser user = new ApplicationUser()
                {
                    Email = "elias.kokkinos@outlook.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "Elias"
                };
                await userManager.CreateAsync(user, "P@ssword13");
                user = new ApplicationUser()
                {
                    Email = "admin@outlook.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "Admin"
                };
                await userManager.CreateAsync(user, "P@ssword13");
                user = new ApplicationUser()
                {
                    Email = "superAdmin@outlook.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "SuperAdmin"
                };
                await userManager.CreateAsync(user, "P@ssword13");
            }

            if (!context.Roles.Any())
            {
                List<IdentityRole> roles = new List<IdentityRole>
                {
                    new IdentityRole {Name = Globals.SuperAdmin, NormalizedName = "SUPERADMIN"},
                    new IdentityRole {Name = Globals.Admin, NormalizedName = "ADMIN"},
                    new IdentityRole {Name = Globals.User, NormalizedName = "USER"},
                    new IdentityRole {Name = Globals.Owner, NormalizedName = "OWNER"}
                };
                context.AddRange(roles);
                context.SaveChanges();
            }
        }
    }
}
