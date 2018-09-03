using System;
using System.Collections.Generic;

namespace PwtKatalonApi.Models
{
    public partial class User
    {
        public User()
        {
            SchedullerReceiveUser = new HashSet<Scheduller>();
            SchedullerSendUser = new HashSet<Scheduller>();
        }

        public int Id { get; set; }
        public string EnvironmentId { get; set; }
        public string OrganizationId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Labels { get; set; }
        public DateTime SetupDate { get; set; }
        public string AgencySend { get; set; }
        public string AgencyReceive { get; set; }

        public Agencies Agencies { get; set; }
        public Agencies AgenciesNavigation { get; set; }
        public Environment Environment { get; set; }
        public Organization Organization { get; set; }
        public ICollection<Scheduller> SchedullerReceiveUser { get; set; }
        public ICollection<Scheduller> SchedullerSendUser { get; set; }
    }
}
