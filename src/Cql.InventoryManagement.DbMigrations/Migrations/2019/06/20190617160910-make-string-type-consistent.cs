using FluentMigrator;
using System;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(20190617160910)]
    public class _20190617160910_make_string_type_consistent : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("Computer")
                .AlterColumn("Location")
                .AsString(2)
                .Nullable();
            Alter.Table("Monitor")
                .AlterColumn("Location")
                .AsString(2)
                .Nullable();
            Alter.Table("Peripheral")
                .AlterColumn("Location")
                .AsString(2)
                .Nullable();
        }
    }
}
