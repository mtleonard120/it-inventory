using System;
using System.Collections.Generic;

namespace backend_api.Models
{
    public partial class Peripheral
    {
        public int PeripheralId { get; set; }
        public string PeripheralName { get; set; }
        public string PeripheralType { get; set; }
        public string TextField { get; set; }
        public int? EmployeeId { get; set; }
        public bool IsAssigned { get; set; }
        public decimal? FlatCost { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public decimal? CostPerYear { get; set; }
        public bool IsDeleted { get; set; }
        public string MFG { get; set; }

        public Employee Employee { get; set; }
    }
}
