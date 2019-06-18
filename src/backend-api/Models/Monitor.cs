using System;
using System.Collections.Generic;

namespace backend_api.Models
{
    public partial class Monitor
    {
        public int MonitorId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int? Resolution { get; set; }
        public string Inputs { get; set; }
        public int? EmployeeId { get; set; }
        public bool IsAssigned { get; set; }
        public string TextField { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public decimal? FlatCost { get; set; }
        public decimal? CostPerYear { get; set; }
        public bool IsDeleted { get; set; }
        public double? ScreenSize { get; set; }
        public string Mfg { get; set; }
        public DateTime? RenewalDate { get; set; }
        public string Location { get; set; }

        public Employee Employee { get; set; }
    }
}
