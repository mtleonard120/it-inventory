using FluentMigrator;
using System;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(20190617154910)]
    public class _20190617154910_update_monitor_columns : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("Monitor")
                .AddColumn("RenewalDate")
                .AsDate()
                .Nullable();
            Rename.Column("Outputs")
                .OnTable("Monitor")
                .To("Inputs");
            Alter.Table("Monitor")
                .AddColumn("Location")
                .AsAnsiString(2)
                .Nullable();
            // Forgot to add location to Computer
            Alter.Table("Computer")
                .AddColumn("Location")
                .AsAnsiString(2)
                .Nullable();
        }
    }
}
