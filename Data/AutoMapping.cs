using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SaveOurFood.Models;
using SaveOurFood.Models.ApiModels;

namespace SaveOurFood.Data
{
    public class AutoMapping: Profile
    {
        public AutoMapping()
        {
            CreateMap<ApplicationUser, ApplicationUserSignalR>();
            CreateMap<ApplicationUserSignalR, ApplicationUser>();
            CreateMap<ApplicationUser, ApplicationUserDTO>();
            CreateMap<ApplicationUserDTO, ApplicationUser>();
        }
    }
}
