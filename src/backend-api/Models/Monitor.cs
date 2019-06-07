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
        public string Outputs { get; set; }
        public int? EmployeeId { get; set; }
        public bool IsAssigned { get; set; }
        public string TextField { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public decimal? FlatCost { get; set; }
        public decimal? CostPerYear { get; set; }
        public bool IsDeleted { get; set; }
        public double? ScreenSize { get; set; }
        public string MFG { get; set; }

        public Employee Employee { get; set; }
    }
}
