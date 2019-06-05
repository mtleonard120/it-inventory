using System;
using System.Collections.Generic;

namespace backend_api.Models
{
    public partial class HardwareHistory
    {
        public int HardwareHistoryId { get; set; }
        public int? CurrentOwnerId { get; set; }
        public DateTime? CurrentOwnerStartDate { get; set; }
        public int? PreviousOwnerId { get; set; }
        public string HardwareType { get; set; }
        public int HardwareId { get; set; }
        public string EventName { get; set; }
        public string EventDescription { get; set; }

        public Employee CurrentOwner { get; set; }
        public Employee PreviousOwner { get; set; }
    }
}
