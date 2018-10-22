using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PwtKatalonApi.Models
{
    public class UserListModel
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string EnvironmentId { get; set; }
        public string OrganizationName { get; set; }
        public DateTime SetupDate { get; set; }
    }

}
