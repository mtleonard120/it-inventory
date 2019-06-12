using FluentMigrator;
using System;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(20190610105110)]
    public class _20190610105110_add_field_DateBought : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("Program")
                .AddColumn("DateBought")
                .AsDate()
                .NotNullable();
        }
    }
}
