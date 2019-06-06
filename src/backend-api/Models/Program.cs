using System;
using System.Collections.Generic;

namespace backend_api.Models
{
    public partial class Program
    {
        //public Program()
        //{
        //    Plugins = new HashSet<Plugins>();
        //    ProgramHistory = new HashSet<ProgramHistory>();
        //}

        public int ProgramId { get; set; }
        public string ProgramName { get; set; }
        public decimal? ProgramCostPerYear { get; set; }
        public decimal? ProgramCostPerEmployee { get; set; }
        public string ProgramLicenseKey { get; set; }
        public bool IsLicense { get; set; }
        public int? EmployeeId { get; set; }
        public string Description { get; set; }
        public string ProgramPurchaseLink { get; set; }
        public bool HasPlugIn { get; set; }
        public bool IsDeleted { get; set; }

        //public Employee Employee { get; set; }
        //public ICollection<Plugins> Plugins { get; set; }
        //public ICollection<ProgramHistory> ProgramHistory { get; set; }
    }
}
