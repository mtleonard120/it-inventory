using System;
using System.Collections.Generic;

namespace backend_api.Models
{
    public partial class ProgramHistory
    {
        public int ProgramHistoryId { get; set; }
        public int? CurrentOwnerId { get; set; }
        public DateTime? CurrentOwnerStartDate { get; set; }
        public int? PreviousOwnerId { get; set; }
        public int ProgramId { get; set; }

        public Employee CurrentOwner { get; set; }
        public Employee PreviousOwner { get; set; }
        public Program Program { get; set; }
    }
}
