using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend_api.Models
{
    /* Class is used to display the table items on the dashboard
     * software table. It will show the use and the cost per year and per month.
     */
    public class SoftwareTableItem
    {

        public SoftwareTableItem(string name, int ID, int users, decimal month, decimal year, bool perYear)
        {
            softwareName = name;
            softwareID = ID;
            numberOfUsers = users;
            costPerMonth = month;
            costPerYear = year;
            isCostPerYear = perYear;
        }

        public string softwareName { get; set; }
        public int softwareID { get; set; }
        public int numberOfUsers { get; set; }
        public decimal costPerMonth { get; set; }
        public decimal costPerYear { get; set; }
        public bool isCostPerYear { get; set; }

    }
}
