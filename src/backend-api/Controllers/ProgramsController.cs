using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using backend_api.Models;

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

        /* GET: api/programs/softwareTable
         * Return = [
         *          { softwareName : string
         *            softwareID : int      // TODO: Is this needed? We will be navigating to the general detail page.
         *            numberOfUsers : int
         *            perMonth: decimal
         *            perYear : decimal
         *            isCostPerYear : bool
         *          }, ... ]
         * NOTE: If isCostPerYear == false, need to make a note on the 
         *  front end that the yearly cost is a projection.
         */
        [HttpGet]
        [Route("softwareTable")]
        public IActionResult GetSoftwareTable()
        {
            // Only software, not licenses. Nothing deleted. Only ones in use.
            var software = _context.Program.Where(program => program.IsLicense == false && program.IsDeleted == false && program.EmployeeId != null);

            // List of distinct software
            var distinctSoftware = software.GroupBy(prog => prog.ProgramName).Select(name => name.FirstOrDefault());

            // Create a list of the distinct software table objects to return.
            List<SoftwareTableItem> listOfTableSoftware = new List<SoftwareTableItem>();
            foreach (Models.Program sw in distinctSoftware)
            {
                listOfTableSoftware.Add(new SoftwareTableItem(sw.ProgramName, sw.ProgramId, 0, 0, 0, sw.IsCostPerYear));
            }

            // Count up the users of each software, and calclate the price. 
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

            // TODO: order by activity.
            // TODO: Show max of ten
            // TODO: Let the user settings dictate what is pinned to the top.
        }

        //// GET: api/Programs
        //[HttpGet]
        //public IEnumerable<Models.Program> GetProgram()
        //{
        //    return _context.Program;
        //}

        //// GET: api/Programs/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetProgram([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var program = await _context.Program.FindAsync(id);

        //    if (program == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(program);
        //}

        //// PUT: api/Programs/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutProgram([FromRoute] int id, [FromBody] Models.Program program)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != program.ProgramId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(program).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProgramExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Programs
        //[HttpPost]
        //public async Task<IActionResult> PostProgram([FromBody] Models.Program program)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    _context.Program.Add(program);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetProgram", new { id = program.ProgramId }, program);
        //}

        //// DELETE: api/Programs/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteProgram([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var program = await _context.Program.FindAsync(id);
        //    if (program == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Program.Remove(program);
        //    await _context.SaveChangesAsync();

        //    return Ok(program);
        //}

        private bool ProgramExists(int id)
        {
            return _context.Program.Any(e => e.ProgramId == id);
        }
    }
}