using FluentMigrator;
using System;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(20190617145110)]
    public class _20190617145110_update_server_columns : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("Server")
                .AddColumn("Make")
                .AsString(50)
                .Nullable();
            Alter.Table("Server")
                .AddColumn("Model")
                .AsString(50)
                .Nullable();
            Alter.Table("Server")
                .AddColumn("IPAddress")
                .AsString(100)
                .Nullable();
            Alter.Table("Server")
                .AddColumn("SAN")
                .AsString(50)
                .Nullable();
            Alter.Table("Server")
                .AddColumn("LocalHHD")
                .AsString(50)
                .Nullable();
            Alter.Table("Server")
                .AddColumn("Location")
                .AsString(2)
                .Nullable();
        }
    }
}
