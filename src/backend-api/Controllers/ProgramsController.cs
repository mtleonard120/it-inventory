using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_api.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend_api.Controllers
{
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
        public ActionResult<List<object>> GetLicenses()
        {
            //temp list to hold the list with the difference field
            List<LicenseBarGraph> ThrowAwayList = new List<LicenseBarGraph>();
            // First list removes programs that are not licenses and that are deleted
            var UsefulProgramsList = _context.Program.Where(x => x.IsLicense == true && x.IsDeleted == false);
            //Second List takes the previous list and makes it distinct
            var DistinctUsefulPrograms = UsefulProgramsList.GroupBy(x => x.ProgramName).Select(x => x.FirstOrDefault());


            //Loop through every program in the distinct programs list
            foreach (var prog in DistinctUsefulPrograms)
            {
                //First lamda counts all the programs in the useful program list where the name is the same as the 
                //name in the distinct programs list
                var CountProgOverall = UsefulProgramsList.Where(x => x.ProgramName == prog.ProgramName).Count();
                //Second lamda counts all the programs in the useful program list where the name is the same as the 
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



    }
}