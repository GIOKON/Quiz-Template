using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SaveOurFood.Models.ApiModels
{
    public class IncomingJson
    {
        public int Key { get; set; }

        public string Values { get; set; }
    }
    public class IncomingJsonSK
    {
        public string Key { get; set; }

        public string Values { get; set; }
    }
}
