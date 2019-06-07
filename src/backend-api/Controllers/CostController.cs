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

        // GET: api/Cost
        [Route("Dashboard")]
        [HttpGet]
        [EnableQuery]

        public async Task<ActionResult<object>> GetDashboardCost()
        {
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
                if(Program.HasPlugIn == true)
                {
                    var PluginsForThatProgram = PluginsList.Where(x => x.ProgramId == Program.ProgramID);
                    foreach( var PluginForThatProgram in PluginsForThatProgram)
                    {
                        CostOfPluginsPerYear += PluginForThatProgram.PluginCostPerYear;

                    }
                }
            }
        //getting cost from Server table
            var ServerList = await _context.Server.ToListAsync();
            decimal? CostOfServersPerYear = 0;

            // looping through server table and finding servers that are not "deleted" 
            // and that are not null. Adding up the cost of those servers
            foreach (var Server in ServerList)
            {
                if (Server.IsDeleted == false && Server.CostPerYear != null)
                {
                    CostOfServersPerYear += Server.CostPerYear;
                }
            }

            var DistinctProgramsList1 = ProgramsList.GroupBy(x => x.ProgramName).Select(x => x.FirstOrDefault()).Select(x => x.ProgramName);
            decimal? monthlyCost = CostOfProgramsPerYear / 12;
            var done = new { CostOfProgramsPerYear, CostOfPluginsPerYear, CostOfServersPerYear};
            return Ok(DistinctProgramsList1);
        }

        
    }
}
