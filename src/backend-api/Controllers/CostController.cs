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

        /* GET: api/Cost/CostBreakDown
         * Returns {
         *          Program Cost Per Year,
         *          Plugin Cost Per Year
         *         } which is comprised of all the programs and their plugins in our database
         */

        [Route("CostBreakdown")]
        [HttpGet]
        [EnableQuery()]

        public async Task<ActionResult<object>> GetDashboardCostBreakDown()
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
                    var PluginsForThatProgram = PluginsList.Where(x => x.ProgramId == Program.ProgramId && x.IsDeleted == false);
                    foreach (var PluginForThatProgram in PluginsForThatProgram)
                    {
                        CostOfPluginsPerYear += PluginForThatProgram.PluginCostPerYear;

                    }
                }
            }
            var CostBreakDownObject = new { CostOfProgramsPerYear, CostOfPluginsPerYear };
            // Return the object as an array so the axios service class will be happy.
            List<object> returnList = new List<object>();
            returnList.Add(CostBreakDownObject);

            return Ok(returnList);
        }

        /* GET: api/Cost/CostPieCharts
        * Returns [
        *          {
        *           HeadingName: Software,
        *           data
        *           [
        *            Name of Department,
        *            Cost of Software in use of department
        *            ID of department
        *           ] of all the programs for all the departemnts in our database except the Utilities department
        *          }
        *          {
        *           [
        *           HeadingName: Hardware,
        *           data2
        *           [
        *           Name of Department,
        *           Cost of Active Hardware,
        *           ID of department
        *           ] of all the hardware for all the departments in our database except the Utilities department
        *          } 
        *          ]
        */

        [Route("CostPieCharts")]
        [HttpGet]
        [EnableQuery()]
        public async Task<ActionResult<object>> GetDashboardPieCharts()
        {
            // Removing the Utilities department from the list of the departments
            var Departments = _context.Department.Where(x => x.DepartmentName != "Utilities");

            // Instantiating the Pie charts list with the two data lists which will be used to return the data
            // in the correct format
            var PieChartsList = new List<object>();
            List<object> data = new List<object>();
            List<object> data2 = new List<object>();

            //looping through each department and finding program and hardware cost per department 
            foreach (var Department in Departments)
            {
                //Cost of Prgrams per department value
                decimal? CostOfPrograms = 0;
                decimal? CostOfHardware = 0;

                // Get the Employees table and make a list to hold each EmployeeID. 
                var allEmployees = await _context.Employee.ToListAsync();
                List<int?> employeeIDsInDepartment = new List<int?>();

                // Gets the employees that are in the department requested. 
                foreach (Employee emp in allEmployees)
                {
                    if (emp.DepartmentId == Department.DepartmentId)
                    {
                        // Adds the IDs of each of the employees.
                        employeeIDsInDepartment.Add(emp.EmployeeId);
                    }
                }

                // Need to qualify Program with Models
                // so it does not conflict with Program.cs that runs the program.
                List<Models.Program> programsOfEmpsInDepartment = new List<Models.Program>();

        //Calculating data for Programs pie chart

                foreach (var prog in _context.Program)
                {
                    // Make sure the program is not deleted.
                    if (prog.IsDeleted == false)
                    {
                        // Checks to see if the program employee ID is in the department.
                        if (employeeIDsInDepartment.Contains(prog.EmployeeId))
                        {
                            programsOfEmpsInDepartment.Add(prog);
                        }
                    }
                }

                // Calculating the costs of the all the programs that the current department is using
                foreach (var prog in programsOfEmpsInDepartment)
                {
                    //checking whether the program has a recurring cost and adding it to cost
                    if (prog.ProgramCostPerYear != null)
                    {
                        CostOfPrograms += prog.ProgramCostPerYear;
                    }
                    // using to make sure no null pointer on date bought 
                    if (prog.DateBought != null)
                    {
                        //adding 30 days to the the date bought and then checking if we are now past those 30 days
                        //if we are not then add the cost of the recent software purchase
                        DateTime? startDate = prog.DateBought;
                        DateTime? relevantDate = startDate.Value.AddDays(30);
                        if (!(DateTime.Now > relevantDate))
                        {
                            CostOfPrograms += prog.ProgramCostPerEmployee;
                        }
                    }

                }
                // Adding to the data list with the appropriate data to be returned in this list
                data.Add(new { Department.DepartmentName, CostOfPrograms, Department.DepartmentId });

        //Calculating data for Hardware pie chart

                foreach (var mon in _context.Monitor)
                {
                    if (employeeIDsInDepartment.Contains(mon.EmployeeId))
                    {
                        //adding 30 days to the the date bought and then checking if we are now past those 30 days
                        //if we are not, add cost of monitor to Cost total
                        DateTime? startDate = mon.PurchaseDate;
                        DateTime? relevantDate = startDate.Value.AddDays(30);
                        if (!(DateTime.Now > relevantDate))
                        {
                            CostOfHardware += mon.FlatCost;
                        }
                    }
                }

                foreach (var Comp in _context.Computer)
                {
                    if (employeeIDsInDepartment.Contains(Comp.EmployeeId))
                    {
                        //adding 30 days to the the date bought and then checking if we are now past those 30 days
                        //if we are not, add cost of Computer to Cost total
                        DateTime? startDate = Comp.PurchaseDate;
                        DateTime? relevantDate = startDate.Value.AddDays(30);
                        if (!(DateTime.Now > relevantDate))
                        {
                            CostOfHardware += Comp.FlatCost;
                        }
                    }
                }

                foreach (var peripheral in _context.Peripheral)
                {
                    if (employeeIDsInDepartment.Contains(peripheral.EmployeeId))
                    {
                        //adding 30 days to the the date bought and then checking if we are now past those 30 days
                        //if we are not, add cost of peripheral to Cost total
                        DateTime? startDate = peripheral.PurchaseDate;
                        DateTime? relevantDate = startDate.Value.AddDays(30);
                        if (!(DateTime.Now > relevantDate))
                        {
                            CostOfHardware += peripheral.FlatCost;
                        }
                    }
                }

                // Adding to the data2 list with the appropriate data to be returned in this list
                data2.Add(new { Department.DepartmentName, CostOfHardware, Department.DepartmentId });
            }
            //formatting data for frontend
            string headingName = "Software";
            PieChartsList.Add(new { headingName, data });
            headingName = "Hardware";
            PieChartsList.Add(new { headingName, data2 });

            return Ok(PieChartsList);
        }



    }
}
