using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend_api.Models
{
    /*
    * This class is used for sorting data to be displayed
    * on the License bar graph on the dashboard.
    */
    public class LicenseBarGraph
    {
        //constructor
        public LicenseBarGraph(string pProgramName, int pCountProgInUse, int pCountProgOverall, int pDifference)
        {
            ProgramName = pProgramName;
            CountProgInUse = pCountProgInUse;
            CountProgOverall = pCountProgOverall;
            Difference = pDifference;
        }
        
        public string ProgramName { get; set; }
        public int CountProgInUse { get; set; }
        public int CountProgOverall { get; set; }
        public int Difference { get; set; } 
    }
}
