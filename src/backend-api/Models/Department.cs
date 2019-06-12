﻿using System;
using System.Collections.Generic;

namespace backend_api.Models
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

        // TODO: These navigation attributes break the API call when requesting GET all in a table.
        //public Department DepartmentNavigation { get; set; }
        //public Department InverseDepartmentNavigation { get; set; }
        public ICollection<Employee> Employee { get; set; }
    }
}
