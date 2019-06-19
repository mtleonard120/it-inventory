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

        public ActionResult<object> GetListOfEmployees()
        {
            // List that will be returned containing the list of employees
            var ListOfEmployees = new List<object>();

            // loop through all the employees
            foreach (var emp in _context.Employee)
            {
                // Sum the costs of all the computers owned by the current employee where the computer is not deleted and the cost is not null
                var CostComputerOwnedByEmployee = _context.Computer.Where(x => x.EmployeeId == emp.EmployeeId && x.FlatCost != null && x.IsDeleted != true).Sum(x => x.FlatCost);

                // Sum the costs of all the peripherals owned by the current employee where the peripheral is not deleted and the cost is not null
                var CostPeripheralOwnedByEmployee = _context.Peripheral.Where(x => x.EmployeeId == emp.EmployeeId && x.FlatCost != null && x.IsDeleted != true).Sum(x => x.FlatCost);

                // Sum the costs of all the monitors owned by the current employee where the monitor is not deleted and the cost is not null
                var CostMonitorOwnedByEmployee = _context.Monitor.Where(x => x.EmployeeId == emp.EmployeeId && x.FlatCost != null && x.IsDeleted != true).Sum(x => x.FlatCost);

                // Sum the costs of all the servers owned by the current employee where the server is not deleted and the cost is not null
                var CostServerOwnedByEmployee = _context.Server.Where(x => x.EmployeeId == emp.EmployeeId && x.FlatCost != null && x.IsDeleted != true).Sum(x => x.FlatCost);

                //Adding up all the costs into one variable
                var HardwareCostForEmp = CostComputerOwnedByEmployee + CostMonitorOwnedByEmployee + CostPeripheralOwnedByEmployee + CostServerOwnedByEmployee;

                // Sum the costs of all the programs that are charged as cost per year owned by the current employee where the program is not deleted and the cost is not null
                var ProgCostForEmpPerYear = _context.Program.Where(x => x.EmployeeId == emp.EmployeeId && x.ProgramCostPerYear != null && x.IsDeleted != true).Sum(x => x.ProgramCostPerYear);

                // Sum the costs of all the programs that are charged as cost per use owned by the current employee where the program is not deleted and the cost is not null
                var ProgCostPerUse = _context.Program.Where(x => x.EmployeeId == emp.EmployeeId && x.ProgramFlatCost != null && x.IsDeleted != true).Sum(x => x.ProgramFlatCost);

                // Dividing the yearly cost into months Adding the programs costs into one variable if the values are not null
                decimal? ProgramCostForEmp = 0;

                if (ProgCostPerUse != null)
                {
                    ProgramCostForEmp = ProgCostPerUse;
                }
                else if (ProgramCostForEmp != null)
                    ProgramCostForEmp = ProgCostForEmpPerYear / 12;

                // concatenating the first and the last name
                var EmployeeName = emp.FirstName + " " + emp.LastName;

                // building returnable object that contains all the required fields
                var Employee = new { EmployeeName, emp.Role, emp.HireDate, HardwareCostForEmp, ProgramCostForEmp };

                //add employee to list
                ListOfEmployees.Add(Employee);
            }
            return Ok(ListOfEmployees);
        }

        /* GET: api/List/Departments
        * Returns [ {
        *          Department Name,
        *          Number of employees in that department,
        *          Total cost of the software owned by the employees in that department
        *         } ] for every department in CQL
        */

        [Route("Departments")]
        [HttpGet]
        [EnableQuery()]

        public ActionResult<object> GetListOfDepartments()
        {
            // List that will be returned containing the list of employees
            var ListOfDepartments = new List<object>();


            foreach (var dep in _context.Department)
            { 
                //count to store cost
                decimal? CostOfPrograms = 0;
            
                // finds number of employees in the current department
                var numOfEmp = _context.Employee.Where(x => x.DepartmentId == dep.DepartmentId && x.IsDeleted == false).Count();

                //creates a list of the employees in the current department
                var listOfEmpInDep = _context.Employee.Where(x => x.DepartmentId == dep.DepartmentId && x.IsDeleted == false).ToList();

                //list to store programs that are being used by the current department
                var ProgUsedByDep = new List<Models.Program>();

                //loop to find all the programs that are owned by all the employees in the current department
                foreach (var employee in listOfEmpInDep)
                {
                    //creates a list of all programs that the current employee owns and that are not deleted
                    var progs = _context.Program.Where(x => x.EmployeeId == employee.EmployeeId && x.IsDeleted == false).ToList();
                    //adds them to the current list of programs used by the current department
                    if (progs.Count != 0)
                        ProgUsedByDep.AddRange(progs);
  
                }
                //reusing code from pie-chart
                //loops through all the programs that are being used by all the employees in the current department and calculates cost
                //only counts the cost of flat cost programs bought in the last month as this cost is fluid.
                foreach (var prog in ProgUsedByDep)
                {
                    //checking whether the program has a recurring cost and adding it to cost
                    if (prog.ProgramCostPerYear != null)
                    {
                        CostOfPrograms += prog.ProgramCostPerYear;
                    }
                    // using to make sure no null pointer on date bought 
                    if (prog.DateBought != null)
                    {
                        //adding 30 days to the date bought and then checking if we are now past those 30 days
                        //if we are not then add the cost of the recent software purchase
                        DateTime? startDate = prog.DateBought;
                        DateTime? relevantDate = startDate.Value.AddDays(30);
                        if (!(DateTime.Now > relevantDate))
                        {
                            CostOfPrograms += prog.ProgramFlatCost;
                        }
                    }


                }
                //creating list of returnables
                var Department = new { dep.DepartmentName, numOfEmp, CostOfPrograms };
                ListOfDepartments.Add(Department);
            }
            return Ok(ListOfDepartments);

        }

        /* GET: api/list/Servers 
         * Returns: [ {
         *            serverId: int,
         *            fdqn: string,
         *            numberOfCores: int,
         *            ram: int,
         *            renewaldate: date
         *            mfg: string,
         *            employeeFirstName: string,
         *            employeeLastName: string,
         *          } ... ] for every server in CQL.
         */
        [Route("Servers")]
        [HttpGet]
        [EnableQuery()]
        public IActionResult GetListOfServers()
        {
            // List that will be returned containing the list of servers
            var listOfservers = new List<object>();

            // Employee list to be used later.
            var Employees = _context.Employee;

            // Servers that are not deleted
            var Servers = _context.Server.Where(sv => sv.IsDeleted == false);

            // Loop through the servers to see if it is assigned
            foreach (Server sv in Servers)
            {
                string employeeFirstName = "";
                string employeeLastName = "";
                if (sv.EmployeeId != null)
                {
                    // Get the name of the employee the server is assigned to.
                    var ownerEmployee = Employees.Where(emp => emp.EmployeeId == sv.EmployeeId);
                    employeeFirstName = ownerEmployee.Select(emp => emp.FirstName).FirstOrDefault().ToString();
                    employeeLastName = ownerEmployee.Select(emp => emp.LastName).FirstOrDefault().ToString();
                }

                // Create a server object to be returned.
                var Server = new { sv.ServerId, sv.Fqdn, sv.NumberOfCores, sv.Ram, sv.Mfg, employeeFirstName, employeeLastName };
                listOfservers.Add(Server);
            }
            return Ok(listOfservers);
        }

        /* GET: api/list/Laptops
         * Returns: [ {
         *            computerId: int,
         *            cpu: string,
         *            ramgb: int,
         *            ssdgb: int,
         *            isAssigned: bool,
         *            mfg: string,
         *            employeeFirstName: string,
         *            employeeLastName: string,
         *          ] ... } for every laptop at CQL.
         */
        [Route("Laptops")]
        [HttpGet]
        [EnableQuery()]
        public IActionResult GetListOfLaptops()
        {
            // List that will be returned containing the list of computers
            var listOfComputers = new List<object>();

            // Employee list to be used later.
            var Employees = _context.Employee;

            // Computers that are not deleted
            var Computers = _context.Computer.Where(cp => cp.IsDeleted == false);

            // Loop through the computers to see if it is assigned
            foreach (Computer cp in Computers)
            {
                string employeeFirstName = "";
                string employeeLastName = "";
                if (cp.EmployeeId != null)
                {
                    // Get the name of the employee the computers is assigned to.
                    var ownerEmployee = Employees.Where(emp => emp.EmployeeId == cp.EmployeeId);
                    employeeFirstName = ownerEmployee.Select(emp => emp.FirstName).FirstOrDefault().ToString();
                    employeeLastName = ownerEmployee.Select(emp => emp.LastName).FirstOrDefault().ToString();
                }

                // Create a Computer object to be returned.
                var Computer = new { cp.ComputerId, cp.Cpu, cp.Ramgb, cp.Ssdgb, cp.IsAssigned, cp.Mfg, employeeFirstName, employeeLastName };
                listOfComputers.Add(Computer);
            }
            return Ok(listOfComputers);
        }

        /* GET: api/list/monitors
         * Returns: [ {
         *             monitorId: int,
         *             make: string,
         *             screenSize: float,
         *             resolution: int,
         *             inputs: string,
         *             employeeFirstName: string,
         *             employeeLastName: string,
         *           ] ... } for every monitor at CQL.
         */
        [Route("Monitors")]
        [HttpGet]
        [EnableQuery()]
        public IActionResult GetListOfMonitors()
        {
            // TODO: This is a lot of repeated code from the last two endpoints. Maybe make the endpoints more generic??
            // List that will be returned containing the list of monitors
            var listOfMonitors = new List<object>();

            // Employee list to be used later.
            var Employees = _context.Employee;

            // Monitors that are not deleted
            var Monitors = _context.Monitor.Where(mn => mn.IsDeleted == false);

            // Loop through the monitors to see if it is assigned
            foreach (Monitor mn in Monitors)
            {
                string employeeFirstName = "";
                string employeeLastName = "";
                if (mn.EmployeeId != null)
                {
                    // Get the name of the employee the monitors is assigned to.
                    var ownerEmployee = Employees.Where(emp => emp.EmployeeId == mn.EmployeeId);
                    employeeFirstName = ownerEmployee.Select(emp => emp.FirstName).FirstOrDefault().ToString();
                    employeeLastName = ownerEmployee.Select(emp => emp.LastName).FirstOrDefault().ToString();
                }

                // Create a Monitor object to be returned.
                var Monitor = new { mn.MonitorId, mn.Make, mn.ScreenSize, mn.Resolution, mn.Inputs, employeeFirstName, employeeLastName };
                listOfMonitors.Add(Monitor);
            }
            return Ok(listOfMonitors);
        }

        /* GET: api/list/peripherals
         * Returns: [ { 
         *             PeripheralId: int,
         *             PeripheralName: string,
         *             PeripheralType: string,
         *             PurchaseDate: date,
         *             IsAssigned: bool,
         *             employeeFirstName: string,
         *             employeeLastName: string,
         *          ] ... } for every peripheral at CQL.
         * 
         * 
         */
        [Route("Peripherals")]
        [HttpGet]
        [EnableQuery()]
        public IActionResult GetListOfPeripherals()
        {
            // TODO: This is a lot of repeated code from the last two endpoints. Maybe make the endpoints more generic??
            // List that will be returned containing the list of peripherals
            var listOfPeripherals = new List<object>();

            // Employee list to be used later.
            var Employees = _context.Employee;

            // Peripherals that are not deleted
            var Peripherals = _context.Peripheral.Where(pr => pr.IsDeleted == false);

            // Loop through the Peripherals to see if it is assigned
            foreach (Peripheral pr in Peripherals)
            {
                string employeeFirstName = "";
                string employeeLastName = "";
                if (pr.EmployeeId != null)
                {
                    // Get the name of the employee the peripherals is assigned to.
                    var ownerEmployee = Employees.Where(emp => emp.EmployeeId == pr.EmployeeId);
                    employeeFirstName = ownerEmployee.Select(emp => emp.FirstName).FirstOrDefault().ToString();
                    employeeLastName = ownerEmployee.Select(emp => emp.LastName).FirstOrDefault().ToString();
                }

                // Create a Peripheral object to be returned.
                var Peripheral = new { pr.PeripheralId, pr.PeripheralName, pr.PeripheralType, pr.PurchaseDate, pr.IsAssigned, employeeFirstName, employeeLastName };
                listOfPeripherals.Add(Peripheral);
            }
            return Ok(listOfPeripherals);
        }
    }
}