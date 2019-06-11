using FluentMigrator;
using System;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(20190610151310)]
    public class _20190610151310_update_field_DateBought : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Column("DateBought")
                .OnTable("Program")
                .AsDate()
                .Nullable();
        }
    }
}

