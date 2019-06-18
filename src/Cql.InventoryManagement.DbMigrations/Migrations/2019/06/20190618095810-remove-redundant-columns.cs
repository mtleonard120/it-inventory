using FluentMigrator;
using System;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(20190618095810)]
    public class _20190618095810_remove_redundant_columns : Migration
    {
        public override void Up()
        {
            Delete.Column("ComputerName")
                .FromTable("Computer");
            Delete.Column("ServerName")
                .FromTable("Server");
        }

        public override void Down()
        {
            throw new NotImplementedException();
        }
    }
}

