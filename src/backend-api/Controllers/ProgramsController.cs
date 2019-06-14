using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using backend_api.Models;
using Newtonsoft.Json.Linq;

namespace backend_api.Controllers
{
    // TODO: Authorize when we have OAuth set up.
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramsController : ControllerBase
    {
        private readonly ITInventoryDBContext _context;

        public ProgramsController(ITInventoryDBContext context)
        {
            _context = context;
        }

        /* GET: api/Programs/Licenses
        * Returns [
        *          Program name,
        *          Count of all the current programs with that name in use
        *          Count of all the current programs with that name overall
        *] of all programs which are specified as licenses 
        */
        [Route("Licenses")]
        [HttpGet]
        [EnableQuery()]
        public ActionResult<object> GetLicenses()
        {
            // Make sure there is an employee.
            if (_context.Employee.Count() < 1)
            {
                return StatusCode(500);
            }

            //getting the Admin's entity
            var AdminEmployee = _context.Employee.FirstOrDefault(x => x.Adguid == "811cbf54-2913-4ffc-8f33-6418ddb4e06d");
            //parsing their user settings from the database into a Json Object
            JObject json = JObject.Parse(AdminEmployee.UserSettings);
            //Getting their licenses from their user settings because that contains both their licenses and software preferences
            var LicenseChoices = json["license"];

            //taking their preferenced programs and selecting them from the list of programs
            List<Models.Program> usefulPrograms = new List<Models.Program>();
            foreach(var license in LicenseChoices)
            {
                var prog = _context.Program.FirstOrDefault(x => x.ProgramName == license.ToString());
                usefulPrograms.Add(prog);
            }
            //temp list to hold the list with the difference field
            List<LicenseBarGraph> ThrowAwayList = new List<LicenseBarGraph>();
            // First list removes programs that are not licenses and that are deleted
            var UsefulProgramsList = _context.Program.Where(x => x.IsLicense == true && x.IsDeleted == false);

            //This List takes the usefulPrograms list and makes it distinct
            var DistinctUsefulPrograms = usefulPrograms.GroupBy(x => x.ProgramName).Select(x => x.FirstOrDefault());


            //Loop through every program in the distinct programs list
            foreach (var prog in DistinctUsefulPrograms)
            {
                //First lambda counts all the programs in the useful program list where the name is the same as the 
                //name in the distinct programs list
                var CountProgOverall = UsefulProgramsList.Where(x => x.ProgramName == prog.ProgramName).Count();
                //Second lambda counts all the programs in the useful program list where the name is the same as the 
                //name in the distinct programs list and where the license is being used
                var CountProgInUse = UsefulProgramsList.Where(x => x.ProgramName == prog.ProgramName && x.EmployeeId != null).Count();
                //adding all the necessary returnables(is that a word?)
                int difference = CountProgOverall - CountProgInUse;
                ThrowAwayList.Add(new LicenseBarGraph(prog.ProgramName, CountProgInUse, CountProgOverall, difference));
            }
            //List which sorts programs by how many they have left which are not in use;
            //Ordered with having the license with least left at the top
            var SortedList = ThrowAwayList.OrderBy(x => x.Difference);

            //removing the difference field from the List which was needed to utilise Linq's order by
            var RemovedDifferenceList = new List<object>();
            foreach(var prog in SortedList)
            {
                RemovedDifferenceList.Add(new { prog.ProgramName, prog.CountProgInUse, prog.CountProgOverall });
            }
            return Ok(RemovedDifferenceList);
        }

        /* GET: api/programs/softwareTable
         * Return = [
         *          { softwareName : string
         *            numberOfUsers : int
         *            perMonth: decimal
         *            perYear : decimal
         *            isProjected : bool
         *            isPinned : bool
         *          }, ... ]
         *   NOTE: isProjected = true when the costPerYear is false.
         *   Will return the object with the programs sorted first
         *      by the user settings, and then the most recently
         *      changed programs on the ProgramHistoryTable.
         */
        [HttpGet]
        [Route("softwareTable")]
        public IActionResult GetSoftwareTable()
        {
            // Make sure there is an employee.
            if (_context.Employee.Count() < 1)
            {
                return StatusCode(500);
            }
            //getting the Admin's entity
            var AdminEmployee = _context.Employee.FirstOrDefault(x => x.Adguid == "811cbf54-2913-4ffc-8f33-6418ddb4e06d");
            //parsing their user settings from the database into a Json Object
            JObject json = JObject.Parse(AdminEmployee.UserSettings);
            //Getting their licenses from their user settings because that contains both their licenses and software preferences
            var SoftwareChoices = json["software"];


            // Separate the list nicely.

           // List<string> list = new List<string>();
            var list = SoftwareChoices.Select(x => x.ToString());

            // Only software, not licenses. Nothing deleted. Only ones in use.
            var software = _context.Program.Where(program => program.IsLicense == false && program.IsDeleted == false && program.EmployeeId != null);

            /* TODO: Update the programHistory model to have an event Date. Same with the start hardwareHistory.
            *  TODO: Add the program name field to the programHistory. Would make this a lot eaiser.
            *  TODO: This is a stupidly complicated way to get the
            *  desired data.
            */
            // Sorts the program history with the most recent changes.
            var programHistory = _context.ProgramHistory.ToList();
            var sortedProgramHistory = programHistory.OrderByDescending(ph => ph.CurrentOwnerStartDate);

            // Create a list of programs that have the programs with the most recent changes first.
            List<Models.Program> sortedSoftware = new List<Models.Program>();
            List<Models.Program> noSoftwareHistory = new List<Models.Program>();
            foreach (ProgramHistory sph in sortedProgramHistory)
            {
                foreach (Models.Program prog in software)
                {
                    // Is the history entry matches to software, add it.
                    if (sph.ProgramId == prog.ProgramId)
                    {
                        sortedSoftware.Add(prog);
                    }
                }
            }

            // If there is no history for a program, then add it.
            foreach (Models.Program prog in software)
            {
                if (!sortedSoftware.Contains(prog))
                    noSoftwareHistory.Add(prog);
            }

            // Combine the lists.
            sortedSoftware.AddRange(noSoftwareHistory);

            // List of distinct software
            var distinctSortedSoftware = sortedSoftware.GroupBy(prog => prog.ProgramName).Select(name => name.FirstOrDefault());

            // All of the software names that are on the settings list.
            var distinctPinnedSoftware = software.Where(sw => list.Contains(sw.ProgramName)).GroupBy(sw => sw.ProgramName).Select(name => name.FirstOrDefault());
            var distinctPinnedSoftwareNames = distinctPinnedSoftware.Select(program => program.ProgramName);

            // List of distinct software
            var distinctSoftware = software.GroupBy(prog => prog.ProgramName).Select(name => name.FirstOrDefault());

            // Create a list of the distinct software table objects to return.
            List<SoftwareTableItem> listOfTableSoftware = new List<SoftwareTableItem>();

            // Add the pinned software (from the user settings) to the table software list first.
            foreach (Models.Program sw in distinctPinnedSoftware)
            {
                listOfTableSoftware.Add(new SoftwareTableItem(sw.ProgramName, 0, 0, 0, sw.IsCostPerYear ? false : true, true));
            }

            // Add the software to the list if it is not already int the list. Limit the list length to 10.
            // NOTE: If the user settings specify more than 10, it will display all of them.
            foreach (Models.Program sw in distinctSortedSoftware)
            {
                if (!(distinctPinnedSoftwareNames.Contains(sw.ProgramName)) && listOfTableSoftware.Count <= 10)
                {
                    listOfTableSoftware.Add(new SoftwareTableItem(sw.ProgramName, 0, 0, 0, sw.IsCostPerYear ? false : true, false));
                }
            }

            // Count up the users of each software, and calculate the price. 
            foreach (Models.Program sw in software)
            {
                // Find the item in the return object that matches the software.
                int index = listOfTableSoftware.FindIndex(uniqueSoftware => uniqueSoftware.softwareName == sw.ProgramName);
                if (index >= 0)
                {
                    listOfTableSoftware[index].numberOfUsers += 1;
                    // ?? operator to make sure costPerYear is not null. If it is, add 0.
                    listOfTableSoftware[index].costPerYear += sw.ProgramCostPerYear ?? 0.0m;
                    listOfTableSoftware[index].costPerMonth += sw.ProgramCostPerYear / 12 ?? 0.0m;
                }
            }

            // Round to 4 decimals because division can be weird.
            foreach (SoftwareTableItem sw in listOfTableSoftware)
            {
                sw.costPerMonth = Math.Round(sw.costPerMonth, 4);
            }

            return Ok(listOfTableSoftware);
        }

        private bool ProgramExists(int id)
        {
            return _context.Program.Any(e => e.ProgramId == id);
        }
    }
}