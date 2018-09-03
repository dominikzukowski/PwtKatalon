﻿using System;
using System.Collections.Generic;

namespace PwtKatalon.Models
{
    public partial class Organization
    {
        public Organization()
        {
            CustomerNew = new HashSet<CustomerNew>();
            User = new HashSet<User>();
        }

        public string EnvironmentId { get; set; }
        public string OrganizationId { get; set; }
        public string OrganizationName { get; set; }
        public int IsPrimary { get; set; }
        public string CountryLabel { get; set; }
        public string Tags { get; set; }

        public Environment Environment { get; set; }
        public ICollection<CustomerNew> CustomerNew { get; set; }
        public ICollection<User> User { get; set; }
    }
}
