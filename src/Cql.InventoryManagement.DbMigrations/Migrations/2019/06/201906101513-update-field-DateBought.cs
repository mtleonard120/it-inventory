using FluentMigrator;
using System;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(201906101513)]
    public class _201906101513_update_field_DateBought : AutoReversingMigration
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

