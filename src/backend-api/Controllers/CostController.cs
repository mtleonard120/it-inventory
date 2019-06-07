using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_api.Models;
using Microsoft.AspNetCore.Authorization;
using System.DirectoryServices.AccountManagement;
using Microsoft.AspNet.OData;

namespace backend_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CostController : ControllerBase
    {
        private readonly ITInventoryDBContext _context;

        public CostController(ITInventoryDBContext context)
        {
            _context = context;
        }

        /* GET: api/Cost/Dashboard
         * Returns [
         *          Program Cost Per Year,
         *          Plugin Cost Per Year
         *         ] of all the programs and their plugins in our database
         */

        [Route("Dashboard")]
        [HttpGet]
        [EnableQuery()]

        public async Task<ActionResult<Array>> GetDashboardCost()
        {
            //Array that will be returned with Programs cost and plugins cost
            decimal?[] ReturningArray = new decimal?[2];

            //Getting cost from the program table

            var ProgramsList = await _context.Program.ToListAsync();
            

            decimal? CostOfProgramsPerYear = 0;
            // looping through programs table and finding programs that are not "deleted" 
            // and that are not null. Adding up the cost of those programs
            foreach (var Program in ProgramsList)
            {
                if (Program.IsDeleted == false && Program.ProgramCostPerYear != null)
                {
                    CostOfProgramsPerYear += Program.ProgramCostPerYear;
                }
            }

            //getting cost from plugin table

            decimal? CostOfPluginsPerYear = 0;
            var PluginsList = await _context.Plugins.ToListAsync();
            //Selecting distinct programs by name so that they match up with the plugin table

            var DistinctProgramsList = ProgramsList.GroupBy(x => x.ProgramName).Select(x => x.FirstOrDefault());
            //looping through those distinct programs and if they have plugins, calculating the cost of these plugins
            foreach (var Program in DistinctProgramsList)
            {
                if (Program.HasPlugIn == true)
                {
                    //creating a list of plugins for that program which are not deleted
                    var PluginsForThatProgram = PluginsList.Where(x => x.ProgramId == Program.ProgramID && x.IsDeleted ==false);
                    foreach (var PluginForThatProgram in PluginsForThatProgram)
                    {
                        CostOfPluginsPerYear += PluginForThatProgram.PluginCostPerYear;

                    }
                }
            }
            ReturningArray[0] = CostOfProgramsPerYear;
            ReturningArray[1] = CostOfPluginsPerYear;
            return Ok(ReturningArray);
        }


    }
}
