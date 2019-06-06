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
    public class DepartmentsController : ControllerBase
    {
        private readonly ITInventoryDBContext _context;

        public DepartmentsController(ITInventoryDBContext context)
        {
            _context = context;
        }



        // GET: api/Departments
        [HttpGet]
        public IEnumerable<Department> GetDepartment()
        {
            return _context.Department.ToList();
        }

        //// GET: api/Departments/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetDepartment([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var department = await _context.Department.FindAsync(id);

        //    if (department == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(department);
        //}

        //// PUT: api/Departments/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutDepartment([FromRoute] int id, [FromBody] Department department)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != department.DepartmentId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(department).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!DepartmentExists(id))
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

        //// POST: api/Departments
        //[HttpPost]
        //public async Task<IActionResult> PostDepartment([FromBody] Department department)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    _context.Department.Add(department);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetDepartment", new { id = department.DepartmentId }, department);
        //}

        //// DELETE: api/Departments/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteDepartment([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var department = await _context.Department.FindAsync(id);
        //    if (department == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Department.Remove(department);
        //    await _context.SaveChangesAsync();

        //    return Ok(department);
        //}

        private bool DepartmentExists(int id)
        {
            return _context.Department.Any(e => e.DepartmentId == id);
        }
    }
}