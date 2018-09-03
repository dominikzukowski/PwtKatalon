using System;
using System.Collections.Generic;

namespace PwtKatalon.Models
{
    public partial class ReferenceNumber
    {
        public int Id { get; set; }
        public string Environment { get; set; }
        public string OrganizationId { get; set; }
        public string ReferenceNo { get; set; }
        public string TransactionType { get; set; }
        public string TransactionStatus { get; set; }
        public string TransactionDate { get; set; }
        public string SenderFirstName { get; set; }
        public string SenderLastName { get; set; }
        public string ReceiverFirstName { get; set; }
        public string ReceiverLastName { get; set; }
        public string ReceiverCountry { get; set; }
    }
}
