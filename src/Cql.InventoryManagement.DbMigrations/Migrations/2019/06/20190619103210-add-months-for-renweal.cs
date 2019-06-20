using System;
using FluentMigrator;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(20190619103210)]
    public class _20190619103210_add_months_for_renweal : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("Plugins")
               .AddColumn("RenewalDate")
               .AsDate()
               .Nullable();
            Alter.Table("Plugins")
               .AddColumn("MonthsPerRenewal")
               .AsInt32()
               .Nullable();

        }

    }
}

