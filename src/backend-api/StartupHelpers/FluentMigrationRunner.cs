using Cql.InventoryManagement.DbMigrations.Migrations._2019._06;
using FluentMigrator.Runner;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Reflection;

namespace Cql.InventoryManagement.Web.StartupHelpers
{
    public static class FluentMigrationRunner
    {
        static string ConnStringEnvar="CONNSTRING_ITINVENTORY_MIGRATIONS_DBO";

        public static void RunMigrations()
        {
            var config = GetConfiguration();

            string connString = config.GetDatabaseConnectionString();
            if (string.IsNullOrWhiteSpace(connString))
            {
                return;
            }

            var services = new ServiceCollection()
                .AddSingleton(config)
                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddSqlServer()
                    .WithGlobalConnectionString(connString)
                    .ScanIn(GetMigrationAssembly()).For.All())
                .AddLogging(lb => lb.AddFluentMigratorConsole())
                .BuildServiceProvider(false);

            using (var scope = services.CreateScope())
            {
                var runner = scope.ServiceProvider.GetRequiredService<IMigrationRunner>();
                runner.MigrateUp();
            }
        }

        private static IConfigurationRoot GetConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .AddEnvironmentVariables();

            var config = builder.Build();
            return config;
        }

        // TODO: Use something more secure than environment variable for connection string
        private static string GetDatabaseConnectionString(this IConfiguration config) =>
            config[ConnStringEnvar] ?? throw new ApplicationException($"Could not run db migrations because there is no {ConnStringEnvar} environment variable");

        private static Assembly GetMigrationAssembly()
        {
            return typeof(_20190607142110_initial_tables).Assembly;
        }
    }
}
