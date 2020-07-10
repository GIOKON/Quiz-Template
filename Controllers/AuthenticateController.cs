using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using SaveOurFood.Data;
using SaveOurFood.Models;
using SaveOurFood.Models.ApiModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace SaveOurFood.Controllers
{
    [Route("api/[controller]/[Action]")]
    public class AuthenticateController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly Signal _signal;

        public AuthenticateController(UserManager<ApplicationUser> userManager, ApplicationDbContext context, IMapper mapper, Signal signal)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
            _signal = signal;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] IncomingJson IncomingJson)
        {
            var applicationUser = new ApplicationUser();
            JsonConvert.PopulateObject(IncomingJson.Values, applicationUser);
            
            if (!TryValidateModel(applicationUser))
                return BadRequest(ModelState.Values);

            applicationUser.UserName = applicationUser.Email;
            var result = await _userManager.CreateAsync(applicationUser, applicationUser.PasswordHash);
            if (!result.Succeeded)
                return BadRequest("User could not be created: " + result.Errors.First().Description);

            var roleId = _context.Roles.Single(c => c.Name == Globals.Owner).Id;
            var userRole = new IdentityUserRole<string>()
            {
                RoleId = roleId,
                UserId = applicationUser.Id
            };
            _context.UserRoles.Add(userRole);

            _context.SaveChanges();

            var user = new LoginResponse
            {
                UserName = applicationUser.UserName,
                Email = applicationUser.Email,
            };

            var userRoles = new List<string> {Globals.Owner};
            var token = CreateJwtSecurityToken(user, userRoles);
            user.Token = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(user);
        }

        [HttpPost]
        [ProducesResponseType((int) HttpStatusCode.Unauthorized)]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] IncomingJson incomingJson)
        {
            var model = JsonConvert.DeserializeObject<LoginModel>(incomingJson.Values);

            if (model.Email == null || model.Password == null)
                return Unauthorized();

            var applicationUser = _context.Users.Include(c => c.UserRoles).FirstOrDefault(c => c.Email == model.Email);

            if (applicationUser == null || !await _userManager.CheckPasswordAsync(applicationUser, model.Password))
                return Unauthorized();
            
            var userRoles = await _userManager.GetRolesAsync(applicationUser);

            var user = new LoginResponse
            {
                UserName = applicationUser.UserName,
                Email = applicationUser.Email,
            };
            
            var token = CreateJwtSecurityToken(user, userRoles);
            user.Token = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(user);
        }

        /// <summary>
        /// Sets the JWT Token but also passes the UserRoles to user as string List
        /// </summary>
        /// <param name="user"></param>
        /// <param name="userRoles"></param>
        /// <returns></returns>
        private JwtSecurityToken CreateJwtSecurityToken(LoginResponse user, IList<string> userRoles)
        {
            var authClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                user.UserRoles.Add(userRole);
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Globals.SymmetricKey));
            var token = new JwtSecurityToken(
                Globals.Issuer, 
                Globals.Audience,
                authClaims,
                expires: DateTime.Now.AddMinutes(300),
                signingCredentials: new Microsoft.IdentityModel.Tokens
                    .SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));
            return token;
        }

    }
}