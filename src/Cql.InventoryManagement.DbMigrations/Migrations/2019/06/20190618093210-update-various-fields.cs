using FluentMigrator;
using System;

namespace Cql.InventoryManagement.DbMigrations.Migrations._2019._06
{
    [Migration(20190618093210)]
    public class _20190618093210_update_various_fields : AutoReversingMigration
    {
        public override void Up()
        {
            Rename.Column("ProgramCostPerEmployee")
                .OnTable("Program")
                .To("ProgramFlatCost");
            Alter.Table("Program")
                .AddColumn("RenewalDate")
                .AsDate()
                .Nullable();
            Alter.Table("Program")
                .AddColumn("MonthsPerRenewal")
                .AsInt32()
                .Nullable();
            Alter.Table("ProgramHistory")
                .AddColumn("EventDate")
                .AsDateTime()
                .NotNullable()
                .WithDefaultValue(1800);
            Alter.Table("HardwareHistory")
                .AddColumn("EventDate")
                .AsDateTime()
                .NotNullable()
                .WithDefaultValue(1800);
            Alter.Table("Plugins")
                .AddColumn("ProgramName")
                .AsString()
                .Nullable();
        }
    }
}

