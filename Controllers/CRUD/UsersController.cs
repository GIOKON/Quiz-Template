using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using SaveOurFood.Data;
using SaveOurFood.Models;
using SaveOurFood.Models.ApiModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoreLinq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SaveOurFood.Controllers
{
    [Authorize(Roles = "Admin, SuperAdmin")]
    [Route("api/[Controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly Signal _signal;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(ApplicationDbContext context, IMapper mapper, UserManager<ApplicationUser> userManager, Signal signal)
        {
            _context = context;
            _mapper = mapper;
            _signal = signal;
            _userManager = userManager;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<ApplicationUser>> GetUsers(int id)
        {
            string roleId = null;
            switch (id)
            {
                case 1:
                    roleId = _context.Roles.Single(c => c.Name == Globals.User).Id;
                    break;
                case 2:
                    roleId = _context.Roles.Single(c => c.Name == Globals.Owner).Id;
                    break;
                case 3:
                    roleId = _context.Roles.Single(c => c.Name == Globals.Admin).Id;
                    break;
                case 4:
                    roleId = _context.Roles.Single(c => c.Name == Globals.SuperAdmin).Id;
                    break;
                default:
                    roleId = null;
                    break;
            }

            var users = new List<ApplicationUser>();
            if (roleId == null)
            {
                users = await _context.Users
                    .Include(c => c.UserRoles)
                    .ToListAsync();
            }
            else
            {
                    users = await _context.Users
                    .Include(c => c.UserRoles)
                    .Where(c => c.UserRoles.Any(t => t.RoleId == roleId)).ToListAsync();
            }

            var userDTO = _mapper.Map<List<ApplicationUser>, List<ApplicationUserDTO>>(users);

            return Ok(userDTO);

        }

        [HttpPut]
        public async Task<IActionResult> PutUsers(IncomingJsonSK IncomingJson)
        {
            var user = _context.Users
                .Include(c => c.UserRoles)
                .Single(o => o.Id == IncomingJson.Key);

            JsonConvert.PopulateObject(IncomingJson.Values, user);

            if (!TryValidateModel(user))
                return BadRequest(ModelState.Values);

            if (IncomingJson.Values.Contains("passwordHash"))
            {
                var newPassword = _userManager.PasswordHasher.HashPassword(user, user.PasswordHash);
                user.PasswordHash = newPassword;
                var res = await _userManager.UpdateAsync(user);
                
                if(!res.Succeeded)
                    return BadRequest("Data Update Failed");
            }
            _context.SaveChanges();

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> PostUsers(IncomingJsonSK IncomingJson)
        {
            var user = new ApplicationUser();
            JsonConvert.PopulateObject(IncomingJson.Values, user);

            if (!IncomingJson.Values.Contains("passwordHash"))
            {
              return BadRequest("Please provide a password for the new user.");
            }

            if (!TryValidateModel(user))
                return BadRequest(ModelState.Values);

            user.UserName = user.Email;
            var result = await _userManager.CreateAsync(user, user.PasswordHash);
            if (!result.Succeeded)
                return BadRequest("User could not be created");

            var parsedObject = JObject.Parse(IncomingJson.Values);
            var parsedRoles = parsedObject["userRoles[0]"].ToString();
            var roles = JsonConvert.DeserializeObject<IdentityUserRole<string>>(parsedRoles);
            var userRole = new IdentityUserRole<string>()
            {
                RoleId = roles.RoleId,
                UserId = user.Id
            };
            _context.UserRoles.Add(userRole);

            _context.SaveChanges();

            return Ok(user);
        }

        // DELETE: api/Users/5
        // [HttpDelete("{id}")]
        [HttpDelete]
        public async Task<ActionResult<ApplicationUser>> DeleteUsers(string key)
        {
            var user = await _context.Users.FindAsync(key);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool UsersExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

    }
}