using System;
using System.Collections.Generic;

namespace PwtKatalon.Models
{
    public partial class Agencies
    {
        public Agencies()
        {
            UserAgencies = new HashSet<User>();
            UserAgenciesNavigation = new HashSet<User>();
        }

        public string OrganizationId { get; set; }
        public string AgencyNumber { get; set; }
        public string AgencyName { get; set; }

        public ICollection<User> UserAgencies { get; set; }
        public ICollection<User> UserAgenciesNavigation { get; set; }
    }
}
