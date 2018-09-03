using System;
using System.Collections.Generic;

namespace PwtKatalon.Models
{
    public partial class Environment
    {
        public Environment()
        {
            Organization = new HashSet<Organization>();
            User = new HashSet<User>();
        }

        public string EnvironmentId { get; set; }
        public string Version { get; set; }
        public string PrimaryUrl { get; set; }
        public string AlternativeUrl { get; set; }

        public ICollection<Organization> Organization { get; set; }
        public ICollection<User> User { get; set; }
    }
}
