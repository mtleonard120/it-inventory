using System;
using System.Collections.Generic;

namespace backend-api.Models
{
    public partial class Server
    {
        public int ServerId { get; set; }
        public string ServerName { get; set; }
        public string Fqdn { get; set; }
        public int? NumberOfCores { get; set; }
        public string OperatingSystem { get; set; }
        public int? Ram { get; set; }
        public bool? Virtualize { get; set; }
        public DateTime? RenewalDate { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public double? FlatCost { get; set; }
        public DateTime? EndOfLife { get; set; }
        public bool? IsAssigned { get; set; }
        public string TextField { get; set; }
        public double? CostPerYear { get; set; }
        public bool IsDeleted { get; set; }

        public Employee Employee { get; set; }
    }
}
