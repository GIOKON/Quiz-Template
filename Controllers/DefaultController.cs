using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AutoMapper;
using SaveOurFood.Data;
using SaveOurFood.Models;
using SaveOurFood.Models._Helpers;
using SaveOurFood.Models.ApiModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoreLinq;
using MoreLinq.Extensions;
using Newtonsoft.Json;
using Save_Our_Food.Models;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.PixelFormats;

namespace SaveOurFood.Controllers
{
    [Route("api/[Action]")]
    [ApiController]
    public class DefaultController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly Signal _signal;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public DefaultController(ApplicationDbContext context, IMapper mapper, UserManager<ApplicationUser> userManager, Signal signal)
        {
            _context = context;
            _mapper = mapper;
            _signal = signal;
            _userManager = userManager;
        }

        // Used for Development Purposes
        [HttpGet]
        public async Task<ActionResult<List<LoginModel>>> Exporter()
        {
            PushNotification.SendNotification("/topics/Donations", "Assignment Added", DateTime.Now.ToLocalTime().ToString());

            var supplierRoleId = _context.Roles.Single(c => c.Name == Globals.Owner).Id;
            var suppliers = await _context.Users
                .Include(c => c.UserRoles)
                .Where(c => c.UserRoles.Any(t => t.RoleId == supplierRoleId)).ToListAsync();
            return Ok(suppliers);
        }
        
        [HttpGet]
        public async Task<ActionResult<List<IdentityRole>>> GetRoles()
        {
            return Ok(await _context.Roles.ToListAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<Country>>> GetCountries()
        {
            return Ok(await _context.Countries.ToListAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<ApplicationUser>>> GetAdmins()
        {
            var adminRoleId = _context.Roles.Single(c => c.Name == Globals.Admin).Id;
            var admins = await _context.Users
                .Include(c => c.UserRoles)
                .Where(c => c.UserRoles.Any(t => t.RoleId == adminRoleId)).ToListAsync();
            return Ok(admins);
        }

        // Used for Mobile APIs
        [HttpPost]
        public async Task<ActionResult> SetDeviceId(IncomingJson incomingJson)
        {
            var deviceId = JsonConvert.DeserializeObject<string>(incomingJson.Values);
            var user = await UserFromToken();
            user.DeviceId = deviceId;
            _context.Update(user);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<ApplicationUser>> GetUser()
        {
            var user = await UserFromToken();
            var applicationUser = _context.Users
                .First(c => c.Id == user.Id);
            user.SecurityStamp = null;
            user.PasswordHash = null;
            return Ok(applicationUser);
        }

        [HttpGet]
        public async Task<ActionResult<ApplicationUser>> FindEndpoint()
        {
            var user = await UserFromToken();
            var endpoint = _context.Users
                .First(c => c.Id == user.Id).Endpoint;
            var someJson = new IncomingJson{ Values = endpoint};
            return Ok(someJson);
        }

        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> ChangeUserPassword(IncomingJson incomingJson)
        {
            var user = JsonConvert.DeserializeObject<LoginModel>(incomingJson.Values);

            var localUser = await UserFromToken();
            var newPassword = _userManager.PasswordHasher.HashPassword(localUser, user.Password);
            localUser.PasswordHash = newPassword;
            var res = await _userManager.UpdateAsync(localUser);
            _context.SaveChanges();
            localUser.PasswordHash = null;

            return Ok(new { localUser });
        }

        [HttpPost]
        public async Task<IActionResult> Upload()
        {
            // Learn to use the entire functionality of the dxFileUploader widget.
            // http://js.devexpress.com/Documentation/Guide/UI_Widgets/UI_Widgets_-_Deep_Dive/dxFileUploader/

            var myFile = Request.Form.Files;
            var targetLocation = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\files\\");
            var items = new List<string>();

            try
            {
                foreach (var formFile in Request.Form.Files)
                {
                    if (formFile.Length > 0)
                    {
                        var itemName = RandomString(8) + DateTime.Now.ToString("yyyy'_'MM'_'dd'T'HH'_'mm'_'ss_fffffff") + Path.GetExtension(formFile.FileName);
                        items.Add(itemName);
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\files\\", itemName);

                        using (var inputStream = new FileStream(filePath, FileMode.Create))
                        {
                            // read file to stream
                            await formFile.CopyToAsync(inputStream);
                            // stream to byte array
                            byte[] array = new byte[inputStream.Length];
                            inputStream.Seek(0, SeekOrigin.Begin);
                            inputStream.Read(array, 0, array.Length);
                            // get file name
                            string fName = DateTime.Now.ToString("yyyy'_'MM'_'dd'T'HH'_'mm'_'ss_fffffff") + Path.GetExtension(formFile.FileName);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
            }

            return Ok(new { items });
        }

        [HttpPost]
        public async Task<IActionResult> UploadProfilePicture(string userId)
        {
            var test = userId;
            var localUser = _context.Users.Find(userId);
            if (localUser == null) return NotFound();

            // Learn to use the entire functionality of the dxFileUploader widget.
            // http://js.devexpress.com/Documentation/Guide/UI_Widgets/UI_Widgets_-_Deep_Dive/dxFileUploader/

            var myFile = Request.Form.Files;
            var targetLocation = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\files\\");
            var items = new List<string>();


           // DateTime.Now.ToString("yyyy'_'MM'_'dd'T'HH'_'mm'_'ss_fffffff")
            try
            {
                foreach (var formFile in Request.Form.Files)
                {
                    if (formFile.Length > 0)
                    {
                        var itemName = RandomString(8) + DateTime.Now.ToString("yyyy'_'MM'_'dd'T'HH'_'mm'_'ss_fffffff") + Path.GetExtension(formFile.FileName);
                        items.Add(itemName);
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\files\\", itemName);

                        await using (var inputStream = new FileStream(filePath, FileMode.Create))
                        {
                            // read file to stream
                            await formFile.CopyToAsync(inputStream);
                            // stream to byte array
                            byte[] array = new byte[inputStream.Length];
                            inputStream.Seek(0, SeekOrigin.Begin);
                            inputStream.Read(array, 0, array.Length);
                            // get file name
                            string fName = DateTime.Now.ToString("yyyy'_'MM'_'dd'T'HH'_'mm'_'ss_fffffff") + Path.GetExtension(formFile.FileName);
                        }
                        using (Image image = Image.Load(filePath))
                        {

                            var width = 700;
                            double height = image.Height / ((double)image.Width / width);

                            image.Mutate(x => x
                                .Resize(width, Convert.ToInt32(height)));
                            image.Save(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\files\\") + "thumbnail_" + items.First()); // Automatic encoder selected based on extension.
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
            }


            localUser.ProfilePicture = items.First();

            _context.Users.Update(localUser);
            _context.SaveChanges();
            localUser.PasswordHash = null;
            localUser.SecurityStamp = null;

            return Ok(new { items });
        }

        [HttpPost]
        public async Task<IActionResult> UploadBackgroundPicture(string userId)
        {
            var localUser = _context.Users.Find(userId);
            if (localUser == null) return NotFound();

            // Learn to use the entire functionality of the dxFileUploader widget.
            // http://js.devexpress.com/Documentation/Guide/UI_Widgets/UI_Widgets_-_Deep_Dive/dxFileUploader/

            var myFile = Request.Form.Files;
            var targetLocation = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\files\\");
            var items = new List<string>();

            try
            {
                foreach (var formFile in Request.Form.Files)
                {
                    if (formFile.Length > 0)
                    {
                        var itemName = RandomString(8) + DateTime.Now.ToString("yyyy'_'MM'_'dd'T'HH'_'mm'_'ss_fffffff") + Path.GetExtension(formFile.FileName);
                        items.Add(itemName);
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\files\\", itemName);

                        using (var inputStream = new FileStream(filePath, FileMode.Create))
                        {
                            // read file to stream
                            await formFile.CopyToAsync(inputStream);
                            // stream to byte array
                            byte[] array = new byte[inputStream.Length];
                            inputStream.Seek(0, SeekOrigin.Begin);
                            inputStream.Read(array, 0, array.Length);
                            // get file name
                            string fName = DateTime.Now.ToString("yyyy'_'MM'_'dd'T'HH'_'mm'_'ss_fffffff") + Path.GetExtension(formFile.FileName);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
            }


            localUser.BackgroundPicture = items.First();

            _context.Users.Update(localUser);
            _context.SaveChanges();
            localUser.PasswordHash = null;
            localUser.SecurityStamp = null;

            return Ok(new { items });
        }

        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> UpdateUserData([FromBody]ApplicationUser user)
        {
            var localUser = await UserFromToken();
            if (user.Email != localUser.Email) BadRequest();

            if (_context.Users.Any(c => c.Endpoint == user.Endpoint && c.Id != localUser.Id)) return BadRequest("Endpoint already exists");

            localUser.Name = user.Name;
            localUser.Surname = user.Surname;
            localUser.CountryId = user.CountryId;
            localUser.UserName = user.UserName;
            localUser.Endpoint = user.Endpoint;
            localUser.Description = user.Description;
            localUser.Location = user.Location;
            localUser.Facebook = user.Facebook;
            localUser.Twitter = user.Twitter;
            localUser.PhoneNumber = user.PhoneNumber;

            _context.Users.Update(localUser);
            _context.SaveChanges();
            localUser.PasswordHash = null;
            localUser.SecurityStamp = null;

            return Ok(new { localUser });
        }

        private async Task<ApplicationUser> UserFromToken()
        {
            var token = (string)Request.Headers["Authorization"];

            //Remove "Bearer" substring
            token = token.Remove(0, 7);
            var decryptedToken = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var email = decryptedToken.Subject;
            var user = await _context.Users.Include(c => c.UserRoles)
                .FirstOrDefaultAsync(c => c.Email == email);
            return user;
        }

        public static string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }
}