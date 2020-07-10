using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Save_Our_Food.Models;

namespace SaveOurFood.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public string DeviceId { get; set; }
        public string Surname { get; set; }
        public string FullName => Name + " " + Surname;

        public string? Endpoint { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string ProfilePicture { get; set; }
        public string BackgroundPicture { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Instagram { get; set; }
        public Country Country { get; set; }
        public int? CountryId { get; set; }

        public ICollection<IdentityUserRole<string>> UserRoles { get; set; }
    }

    public class ApplicationUserDTO : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string FullName => Name + " " + Surname;

        public string Endpoint { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string ProfilePicture { get; set; }
        public string BackgroundPicture { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Instagram { get; set; }
        public Country Country { get; set; }
        public int CountryId { get; set; }
        public string ReferrerId { get; set; }

        public override string PasswordHash => "";
        public override string SecurityStamp => "";

    }

    public class ApplicationUserSignalR : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public ICollection<IdentityUserRole<string>> UserRoles { get; set; }

        public string PasswordHash => "";

        public string FullName => Name + " " + Surname;
    }
}
