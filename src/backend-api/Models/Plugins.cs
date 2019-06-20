using System;
using System.Collections.Generic;

namespace backend_api.Models
{
    public partial class Plugins
    {
        public string PluginName { get; set; }
        public int PluginId { get; set; }
        public decimal? PluginFlatCost { get; set; }
        public int? ProgramId { get; set; }
        public string TextField { get; set; }
        public decimal? PluginCostPerYear { get; set; }
        public bool IsDeleted { get; set; }
        public string ProgramName { get; set; }
        public DateTime? RenewalDate  { get; set; }
        public int? MonthsPerRenewal { get; set; }

  
       



        //       public Program Program { get; set; }
    }
}
