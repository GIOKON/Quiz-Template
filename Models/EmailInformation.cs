using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SaveOurFood.Models
{
    public class EmailInformation
    {
        public string Body { get; set; }
        public string Subject { get; set; }
        public string SourceEmail { get; set; }
        public string SourceEmailName { get; set; }

        public ApplicationUser User { get; set; }
    }
}
