using System;
using System.Collections.Generic;

namespace PwtKatalonApi.Models
{
    public partial class Organization
    {
        public Organization()
        {
            User = new HashSet<User>();
        }

        public string EnvironmentId { get; set; }
        public string OrganizationId { get; set; }
        public string OrganizationName { get; set; }
        public int IsPrimary { get; set; }
        public string CountryLabel { get; set; }
        public string Tags { get; set; }

        public Environment Environment { get; set; }
        public ICollection<User> User { get; set; }
    }
}
