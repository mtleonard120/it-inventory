using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend_api.Helpers
{
    //class to pass in username and password
    public class AuthRequest
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
