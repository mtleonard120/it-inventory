using FluentMigrator;
using System;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(20190617153810)]
    public class _20190617153810_update_computer_columns : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("Computer")
                .AddColumn("Make")
                .AsString(50)
                .Nullable();
            Alter.Table("Computer")
                .AddColumn("Model")
                .AsString(50)
                .Nullable();
            Alter.Table("Computer")
                .AddColumn("FQDN")
                .AsString(Int32.MaxValue)
                .Nullable();
        }
    }
}
