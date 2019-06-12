using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend_api.Models
{
    /*
     * This class is used for returning data to be displayed
     * on the Department Program table on the dashboard.
     */
    public class DepartmentTableProgram
    {

        // Explicit constructor.
        public DepartmentTableProgram(string name, int count, decimal costPerYear, bool isCostPerYear)
        {
            ProgramName = name;
            ProgramCount = count;
            ProgramCostPerYear = costPerYear;
            ProgramIsCostPerYear = isCostPerYear;
        }
        public string ProgramName { get; set; }
        public int ProgramCount { get; set; }
        public decimal ProgramCostPerYear { get; set; }
        public bool ProgramIsCostPerYear { get; set; }
    }


}
