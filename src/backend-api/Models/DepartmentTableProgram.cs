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
        public DepartmentTableProgram(string name, int count, decimal cost)
        {
            ProgramName = name;
            ProgramCount = count;
            ProgramCost = cost;
        }
        public string ProgramName { get; set; }
        public int ProgramCount { get; set; }

        // TODO: Find out of the table is on a PerYearBasis
        // TODO: Find out if the table also includes fixed software costs.
        public decimal ProgramCost { get; set; }
    }


}
