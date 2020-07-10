using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MailKit.Security;
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
using MimeKit;
using MimeKit.Text;
using MoreLinq;
using MoreLinq.Extensions;
using Newtonsoft.Json;
using Save_Our_Food.Models;

namespace SaveOurFood.Controllers
{
    [Route("api/[Action]")]
    [ApiController]
    public class SendEmailController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly Signal _signal;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public SendEmailController(ApplicationDbContext context, IMapper mapper, UserManager<ApplicationUser> userManager, Signal signal)
        {
            _context = context;
            _mapper = mapper;
            _signal = signal;
            _userManager = userManager;
        }


        [HttpPost]
        public IActionResult SendEmail(EmailInformation emailInformation)
        {
            if (emailInformation.User.Email != "guesthostdirect@gmail.com")
            {
                var user = _context.Users.FirstOrDefault(c => c.Email == emailInformation.User.Email);
                if (user == null) return BadRequest("User not found");
            }
            
            //var emailList = new EmailList { Body = emailUser.Body, Subject = emailUser.Subject };
            //  emailList.EmailsAddresses.Add(new EmailAddress { Name = emailUser.User.Name + " " + emailUser.User.Surname, Address = emailUser.User.Email });

            var message = string.Format(
                @"<h3>This is an email send using the GuestHostDirect platform,<br>
                Please do not respond to this email Directly
                </h3>
                <h4>Instead respond to the sender of this email at: " + emailInformation.SourceEmail + "</h4>" +
                @"<br> <p>Message from : " + emailInformation.SourceEmailName + "</p>"
                + emailInformation.Body);
            try
            {
                new SmtpClient
                {
                    Host = "Smtp.Gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    Timeout = 10000,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential("guesthostdirect@gmail.com", "9eW@CzFo%T6Ea%")
                }.Send(new MailMessage { From = new MailAddress(emailInformation.SourceEmail, emailInformation.SourceEmailName), To = { emailInformation.User.Email }, Subject = emailInformation.Subject, Body = message, IsBodyHtml = true, BodyEncoding = Encoding.UTF8 });
            }
            catch (Exception e)
            {
                return BadRequest("Sending Email Failed");
            }
            return Ok();
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