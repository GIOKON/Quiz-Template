using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SaveOurFood.Models.ApiModels
{
    public class LoginResponse
    {
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<string> UserRoles = new List<string>();
        public string Token { get; set; }
        public string Error { get; set; }
    }
}
