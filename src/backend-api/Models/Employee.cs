using System;
using System.Collections.Generic;

namespace backend_api.Models
{
    public partial class Employee
    {
        public Employee()
        {
            Computer = new HashSet<Computer>();
            HardwareHistoryCurrentOwner = new HashSet<HardwareHistory>();
            HardwareHistoryPreviousOwner = new HashSet<HardwareHistory>();
            Monitor = new HashSet<Monitor>();
            Peripheral = new HashSet<Peripheral>();
            Program = new HashSet<Program>();
            ProgramHistoryCurrentOwner = new HashSet<ProgramHistory>();
            ProgramHistoryPreviousOwner = new HashSet<ProgramHistory>();
            Server = new HashSet<Server>();
        }

        public int EmployeeId { get; set; }
        public DateTime HireDate { get; set; }
        public int DepartmentId { get; set; }
        public bool IsDeleted { get; set; }
        public string UserSettings { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Adguid { get; set; }

        public Department Department { get; set; }
        public ICollection<Computer> Computer { get; set; }
        public ICollection<HardwareHistory> HardwareHistoryCurrentOwner { get; set; }
        public ICollection<HardwareHistory> HardwareHistoryPreviousOwner { get; set; }
        public ICollection<Monitor> Monitor { get; set; }
        public ICollection<Peripheral> Peripheral { get; set; }
        public ICollection<Program> Program { get; set; }
        public ICollection<ProgramHistory> ProgramHistoryCurrentOwner { get; set; }
        public ICollection<ProgramHistory> ProgramHistoryPreviousOwner { get; set; }
        public ICollection<Server> Server { get; set; }
    }
}
