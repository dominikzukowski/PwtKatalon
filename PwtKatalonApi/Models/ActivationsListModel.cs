using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PwtKatalonApi.Models
{
    public class ActivationsListModel
    {
        public int Id { get; set; }
        public DateTime ActivationTime { get; set; }
        public string EnvironmentId { get; set; }
        public string Status { get; set; }
        public string Version { get; set; }
        public string Organization { get; set; }
        public string Comment { get; set; }
    }

}
