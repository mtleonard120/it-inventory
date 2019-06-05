using System;
using System.Collections.Generic;

namespace backend-api.Models
{
    public partial class Department
    {
        public Department()
        {
            Employee = new HashSet<Employee>();
        }

        public int DepartmentId { get; set; }
        public string DefaultHardware { get; set; }
        public string DefaultPrograms { get; set; }
        public string DepartmentName { get; set; }
        public bool IsDeleted { get; set; }

        public ICollection<Employee> Employee { get; set; }
    }
}
