using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_api.Models;

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

        // GET: api/Programs
        [HttpGet]
        public IEnumerable<Models.Program> GetProgram()
        {
            return _context.Program;
        }

        // GET: api/Programs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProgram([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var program = await _context.Program.FindAsync(id);

            if (program == null)
            {
                return NotFound();
            }

            return Ok(program);
        }

        // PUT: api/Programs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProgram([FromRoute] int id, [FromBody] Models.Program program)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != program.ProgramId)
            {
                return BadRequest();
            }

            _context.Entry(program).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProgramExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Programs
        [HttpPost]
        public async Task<IActionResult> PostProgram([FromBody] Models.Program program)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Program.Add(program);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProgram", new { id = program.ProgramId }, program);
        }

        // DELETE: api/Programs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProgram([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var program = await _context.Program.FindAsync(id);
            if (program == null)
            {
                return NotFound();
            }

            _context.Program.Remove(program);
            await _context.SaveChangesAsync();

            return Ok(program);
        }

        private bool ProgramExists(int id)
        {
            return _context.Program.Any(e => e.ProgramId == id);
        }
    }
}