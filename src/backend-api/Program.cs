using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Cql.InventoryManagement.Web.StartupHelpers;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;

namespace backend_api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            FluentMigrationRunner.RunMigrations();

            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseWebRoot(GetWebRootDirectoryPath());

        private static string GetWebRootDirectoryPath()
        {
            string wwwroot = Environment.GetEnvironmentVariable("WWWROOT");

            return string.IsNullOrWhiteSpace(wwwroot)
                ? "wwwroot"
                : Path.Combine(Directory.GetCurrentDirectory(), wwwroot);
        }
    }
}
