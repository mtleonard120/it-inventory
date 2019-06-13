using FluentMigrator;
using System;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(20190607142110)]
    public class _20190607142110_initial_tables : Migration
    {
        public override void Down()
        {
            throw new NotImplementedException();
        }

        public override void Up()
        {
            Execute.EmbeddedScript("Cql.InventoryManagement.DbMigrations.Resources.Sql.20190607142110-initial-tables.sql");
        }
    }
}
