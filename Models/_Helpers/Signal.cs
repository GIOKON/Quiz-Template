using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SaveOurFood.Data;
using SaveOurFood.Models._Helpers;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MoreLinq.Extensions;
using Newtonsoft.Json;

namespace SaveOurFood.Models
{
    public class Signal: Hub
    {
        //private IServiceProvider _sp;
        //public Signal(IServiceProvider sp)
        //{
        //    _sp = sp;
        //}
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("MessageReceived", message);
        }

    }
}
