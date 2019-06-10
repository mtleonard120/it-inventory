using FluentMigrator;
using System;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(201906101051)]
    public class _201906101051_add_field_DateBought : AutoReversingMigration
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
