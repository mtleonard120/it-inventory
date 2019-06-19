using System;
using System.Collections.Generic;

namespace backend_api.Models
{
    public partial class Server
    {
        public int ServerId { get; set; }
        public string Fqdn { get; set; }
        public int? NumberOfCores { get; set; }
        public string OperatingSystem { get; set; }
        public int? Ram { get; set; }
        public bool? Virtualize { get; set; }
        public DateTime? RenewalDate { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public decimal? FlatCost { get; set; }
        public DateTime? EndOfLife { get; set; }
        public bool IsAssigned { get; set; }
        public string TextField { get; set; }
        public decimal? CostPerYear { get; set; }
        public bool IsDeleted { get; set; }
        public string MFG { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string IPAddress { get; set; }
        public string SAN { get; set; }
        public string LocalHHD { get; set; }
        public string Location { get; set; }

        public Employee Employee { get; set; }
    }
}
