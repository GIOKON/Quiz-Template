using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SaveOurFood.Models
{
    
    public class EmailList
    {
        public string Subject { get; set; }
        public string Body { get; set; }

        public IList<EmailAddress> EmailsAddresses = new List<EmailAddress>();
    }
    public class EmailAddress
    {
        public string Name { get; set; }

        public string Address { get; set; }
    }
}
