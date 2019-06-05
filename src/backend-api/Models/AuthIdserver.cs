using System;
using System.Collections.Generic;

namespace backend-api.Models
{
    public partial class AuthIdserver
    {
        public int AuthorizationSimpleId { get; set; }
        public string ActiveDirectoryId { get; set; }
        public string RefreshToken { get; set; }
        public bool IsAdmin { get; set; }
    }
}
