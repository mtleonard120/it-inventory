using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.OData;
using backend_api.Models;

namespace backend_api.Controllers
{
    [Route("api/departmentTable")]
    [ApiController]
    public class DepartmentTableController : ControllerBase
    {
        private readonly ITInventoryDBContext _context;

        public DepartmentTableController(ITInventoryDBContext context)
        {
            _context = context;
        }

        // GET: api/departmentTable
        // To query only the name and id, use the route below.
        // GET: api/departmentTable?$select=departmentName,departmentID
        // Return is a list of departments and their ID's.
        [HttpGet]
        [EnableQuery()]
        public IActionResult GetDepartment()
        {
            return Ok(_context.Department.ToList());
        }

        // GET: api/departmentTable/{departmentID}
        // Returns [ {Name, Count, Cost},.. ] of the programs in the department.
        [HttpGet]
        [Route("{departmentID}")]
        public IActionResult GetDepartmentPrograms([FromRoute] int departmentID)
        {

            // Get the Employees table and make a list to hold each EmployeeID. 
            var allEmployees = _context.Employee;
            List<int?> employeeIDsInDepartment = new List<int?>();

            // Gets the employees that are in the department requested. 
            foreach (Employee emp in allEmployees)
            {
                if (emp.DepartmentId == departmentID)
                {
                    // Adds the IDs of each of the employees.
                    employeeIDsInDepartment.Add(emp.EmployeeId);
                }
            }

            var allPrograms = _context.Program;
            // Need to qualify Program with Models
            // so it does not conflict with Program.cs that runs the program.
            List<Models.Program> programsOfEmpsInDepartment = new List<Models.Program>();

            // For each program, add to the list of deparment programs if an employee in the 
            // department owns that program.
            foreach (Models.Program prog in allPrograms)
            {
                // Checks to see if the program employee ID is in the department.
                if (employeeIDsInDepartment.Contains(prog.EmployeeId))
                {
                    programsOfEmpsInDepartment.Add(prog);
                }
            }

            //// Make a list of the distinct programs of the employees
            //// in the department.
            //List<string> DistinctPrograms = new List<string>();
            //foreach (Models.Program prog in ProgramsOfEmpsInDepartment)
            //{
            //    // If the list does not have the name yet, add it.
            //    if (!DistinctPrograms.Contains(prog.ProgramName))
            //    {
            //        DistinctPrograms.Add(prog.ProgramName);
            //    }
            //}

            // Joseph's one liner does the same thing as the loop above
            // making a list of distinct programs of the employeess in the department.
            // What is prefered/more efficient?
            var distinctPrograms = programsOfEmpsInDepartment.GroupBy(prog => prog.ProgramName).Select(name => name.FirstOrDefault()).Select(program => program.ProgramName);

            // Create a list with name, count, costPerYear containing the unique programs in the department
            List<DepartmentTableProgram> listOfTablePrograms = new List<DepartmentTableProgram>();
            foreach (string prog in distinctPrograms)
            {
                // Construct a new object to be added to the list.
                listOfTablePrograms.Add(new DepartmentTableProgram(prog, 0, 0.0m));
            }

            // Aggregate the programs in the department that are the same name.
            // Count the programs and add the cost.
            foreach (Models.Program departmentProgram in programsOfEmpsInDepartment)
            {
                // The index of the unique program that has the same name as the employee's program in the department
                int index = listOfTablePrograms.FindIndex(uniqueProgram => uniqueProgram.ProgramName == departmentProgram.ProgramName);
                if (index >= 0)
                {
                    listOfTablePrograms[index].ProgramCount += 1;
                    // ?? operator to make sure CostPerYear is not null. If it is, add 0.
                    // TODO: The fixed costs are not added. CostPerYear is currently the only thing added.
                    // Will need to talk to Dan to see what costs will be.
                    listOfTablePrograms[index].ProgramCostPerYear += departmentProgram.ProgramCostPerYear ?? 0.0m;
                }
            }

            //// Strip programs from list that cost 0.
            //// Programs that cost 0 will be put under the Utilities with the utility cost.
            //// TODO: Check with Dan to see.
            //foreach (DepartmentTableProgram tableProgram in listOfTablePrograms.ToList())
            //{
            //    if (tableProgram.ProgramCostPerYear <= 0)
            //    {
            //        listOfTablePrograms.Remove(tableProgram);
            //    }
            //}

            return Ok(listOfTablePrograms);
        }

        private bool DepartmentExists(int id)
        {
            return _context.Department.Any(e => e.DepartmentId == id);
        }
    }
}