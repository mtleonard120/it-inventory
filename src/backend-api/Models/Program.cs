using System;
using System.Collections.Generic;

namespace backend-api.Models
{
    public partial class Program
    {
        public Program()
        {
            ProgramHistory = new HashSet<ProgramHistory>();
        }

        public int ProgramId { get; set; }
        public string ProgramName { get; set; }
        public double? ProgramCostPerYear { get; set; }
        public double? ProgramCostPerEmployee { get; set; }
        public string ProgramLicenseKey { get; set; }
        public bool IsLicense { get; set; }
        public int? EmployeeId { get; set; }
        public string Description { get; set; }
        public string ProgramPurchaseLink { get; set; }
        public string PlugIns { get; set; }
        public bool IsDeleted { get; set; }

        public Employee Employee { get; set; }
        public ICollection<ProgramHistory> ProgramHistory { get; set; }
    }
}
