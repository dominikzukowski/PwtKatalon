using System;
using System.Collections.Generic;

namespace PwtKatalonApi.Models
{
    public class ActivationsListModel
    {
        public int Id { get; set; }
        public DateTime ActivationTime { get; set; }
        public string EnvironmentId { get; set; }
        public string Status { get; set; }
        public string Version { get; set; }
    }

    public partial class Activations
    {
        public int Id { get; set; }
        public DateTime ActivationTime { get; set; }
        public int SchedulerId { get; set; }
        public int? SendUserId { get; set; }
        public int? ReceiveUserId { get; set; }
        public string Comment { get; set; }
        public string TestSuite { get; set; }
        public string ReportName { get; set; }
        public string ConsoleLog { get; set; }
        public string ErrorLog { get; set; }
        public string GitLog { get; set; }
        public string Status { get; set; }
        public string RunArguments { get; set; }
        public string EnvironmentId { get; set; }
        public string Version { get; set; }
        public byte[] ZippedResults { get; set; }
        public string JunitResult { get; set; }
        public string JsonResult { get; set; }
        public byte? CounterTotal { get; set; }
        public byte? CounterPassed { get; set; }
        public byte? CounterFailed { get; set; }
        public byte? CounterErrors { get; set; }
        public int? CounterSeconds { get; set; }
    }
}
