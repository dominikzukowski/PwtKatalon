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
        public byte? CounterTotal { get; set; }
        public byte? CounterPassed { get; set; }
        public byte? CounterFailed { get; set; }
        public byte? CounterErrors { get; set; }
        public string SendUserLogin { get; set; }


    }

}
