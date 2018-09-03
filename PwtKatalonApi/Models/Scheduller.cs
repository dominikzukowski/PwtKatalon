using System;
using System.Collections.Generic;

namespace PwtKatalonApi.Models
{
    public partial class Scheduller
    {
        public int Id { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public int? SendUserId { get; set; }
        public int? ReceiveUserId { get; set; }
        public int Repeats { get; set; }
        public int? ActivationHour { get; set; }
        public string Comment { get; set; }
        public string AlternativeTestSuite { get; set; }

        public User ReceiveUser { get; set; }
        public User SendUser { get; set; }
    }
}
