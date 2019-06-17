using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_api.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {
        private readonly ITInventoryDBContext _context;

        public ListController(ITInventoryDBContext context)
        {
            _context = context;
        }

        /* GET: api/List/Employees
        * Returns [ {
        *          Employee Name,
        *          Role,
        *          Date Hired,
        *          Cost of Active Hardware,
        *          Cost of software being used by employee per month
        *         } ] for every employee of CQL
        */

        [Route("Employees")]
        [HttpGet]
        [EnableQuery()]

        public async Task<ActionResult<object>> GetListOfEmployees()
        {
            // List that will be returned containing the list of employees
            var ListOfEmployees = new List<object>();

            // loop through all the employees
            foreach (var emp in _context.Employee)
            {
                // Sum the costs of all the computers owned by the current employee where the computer is not deleted and the cost is not null
                var CostComputerOwnedByEmployee = _context.Computer.Where(x => x.EmployeeId == emp.EmployeeId && x.FlatCost != null && x.IsDeleted != false).Sum(x => x.FlatCost);

                // Sum the costs of all the peripherals owned by the current employee where the peripheral is not deleted and the cost is not null
                var CostPeripheralOwnedByEmployee = _context.Peripheral.Where(x => x.EmployeeId == emp.EmployeeId && x.FlatCost != null && x.IsDeleted != false).Sum(x => x.FlatCost);

                // Sum the costs of all the monitors owned by the current employee where the monitor is not deleted and the cost is not null
                var CostMonitorOwnedByEmployee = _context.Monitor.Where(x => x.EmployeeId == emp.EmployeeId && x.FlatCost != null && x.IsDeleted != false).Sum(x => x.FlatCost);

                // Sum the costs of all the servers owned by the current employee where the server is not deleted and the cost is not null
                var CostServerOwnedByEmployee = _context.Server.Where(x => x.EmployeeId == emp.EmployeeId && x.FlatCost != null && x.IsDeleted != false).Sum(x => x.FlatCost);

                //Adding up all the costs into one variable
                var HardwareCostForEmp = CostComputerOwnedByEmployee + CostMonitorOwnedByEmployee + CostPeripheralOwnedByEmployee + CostServerOwnedByEmployee;

                // Sum the costs of all the programs that are charged as cost per year owned by the current employee where the program is not deleted and the cost is not null
                var ProgCostForEmpPerYear = _context.Program.Where(x => x.EmployeeId == emp.EmployeeId && x.ProgramCostPerYear != null && x.IsDeleted != false).Sum(x => x.ProgramCostPerYear);

                // Sum the costs of all the programs that are charged as cost per use owned by the current employee where the program is not deleted and the cost is not null
                var ProgCostPerUse = _context.Program.Where(x => x.EmployeeId == emp.EmployeeId && x.ProgramCostPerEmployee != null && x.IsDeleted != false).Sum(x => x.ProgramCostPerEmployee);

                //Adding the programs costs into one variable
                var ProgramCostForEmp = ProgCostForEmpPerYear + ProgCostForEmpPerYear;

                // concatenating the first and the last name
                var EmployeeName = emp.FirstName + " " + emp.LastName;

                // building returnable object that contains all the required fields
                var Employee = new { EmployeeName, emp.Role, emp.HireDate, HardwareCostForEmp, ProgramCostForEmp };

                //add employee to list
                ListOfEmployees.Add(Employee);
            }
            return Ok(ListOfEmployees);
        }
    }
}