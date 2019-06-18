using FluentMigrator;
using System;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(20190617155810)]
    public class _20190617155810_update_peripheral_columns : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("Peripheral")
                .AddColumn("Location")
                .AsAnsiString(2)
                .Nullable();
            Alter.Table("Peripheral")
                .AddColumn("RenewalDate")
                .AsDate()
                .Nullable();
        }
    }
}
