using System;
using System.Collections.Generic;

namespace backend_api.Models
{
    public partial class Computer
    {
        public int ComputerId { get; set; }
        public string Cpu { get; set; }
        public int? Ramgb { get; set; }
        public int? Ssdgb { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public DateTime? RenewalDate { get; set; }
        public decimal? FlatCost { get; set; }
        public string MonitorOutput { get; set; }
        public DateTime? EndOfLife { get; set; }
        public int? EmployeeId { get; set; }
        public bool IsAssigned { get; set; }
        public string TextField { get; set; }
        public decimal? ScreenSize { get; set; }
        public decimal? CostPerYear { get; set; }
        public bool IsDeleted { get; set; }
        public int? Resolution { get; set; }
        public string MFG { get; set; }
        public string Make { get; set; }
        public string FQDN { get; set; }
        public string Location { get; set; }


        public Employee Employee { get; set; }
    }
}
