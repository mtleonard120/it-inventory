using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace backend_api.Models
{
    public partial class ITInventoryDBContext : DbContext
    {
        public ITInventoryDBContext()
        {
        }

        public ITInventoryDBContext(DbContextOptions<ITInventoryDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AuthIdserver> AuthIdserver { get; set; }
        public virtual DbSet<Computer> Computer { get; set; }
        public virtual DbSet<Department> Department { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<HardwareHistory> HardwareHistory { get; set; }
        public virtual DbSet<Monitor> Monitor { get; set; }
        public virtual DbSet<Peripheral> Peripheral { get; set; }
        public virtual DbSet<Plugins> Plugins { get; set; }
        public virtual DbSet<Program> Program { get; set; }
        public virtual DbSet<ProgramHistory> ProgramHistory { get; set; }
        public virtual DbSet<Server> Server { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=CQL-INTERN03;Database=ITInventoryDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuthIdserver>(entity =>
            {
                entity.HasKey(e => e.AuthorizationSimpleId);

                entity.ToTable("AuthIDServer");

                entity.Property(e => e.AuthorizationSimpleId).HasColumnName("AuthorizationSimpleID");

                entity.Property(e => e.ActiveDirectoryId)
                    .IsRequired()
                    .HasColumnName("ActiveDirectoryID");
            });

            modelBuilder.Entity<Computer>(entity =>
            {
                entity.Property(e => e.ComputerId).HasColumnName("ComputerID");

                entity.Property(e => e.ComputerName).HasMaxLength(100);

                entity.Property(e => e.CostPerYear).HasColumnType("money");

                entity.Property(e => e.Cpu)
                    .HasColumnName("CPU")
                    .HasMaxLength(50);

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.EndOfLife).HasColumnType("date");

                entity.Property(e => e.FlatCost).HasColumnType("money");

                entity.Property(e => e.MonitorOutput).HasMaxLength(50);

                entity.Property(e => e.PurchaseDate).HasColumnType("date");

                entity.Property(e => e.Ramgb).HasColumnName("RAMGB");

                entity.Property(e => e.RenewalDate).HasColumnType("date");

                entity.Property(e => e.ScreenSize).HasColumnType("decimal(9, 2)");

                entity.Property(e => e.Ssdgb).HasColumnName("SSDGB");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Computer)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_Computer_Employee");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.Property(e => e.DepartmentId)
                    .HasColumnName("DepartmentID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DefaultHardware).IsRequired();

                entity.Property(e => e.DefaultPrograms).IsRequired();

                entity.Property(e => e.DepartmentName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.DepartmentNavigation)
                    .WithOne(p => p.InverseDepartmentNavigation)
                    .HasForeignKey<Department>(d => d.DepartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Department_Department");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.Adguid)
                    .IsRequired()
                    .HasColumnName("ADGUID")
                    .HasMaxLength(50);

                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.HireDate).HasColumnType("date");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.DepartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Employee_Department");
            });

            modelBuilder.Entity<HardwareHistory>(entity =>
            {
                entity.Property(e => e.HardwareHistoryId).HasColumnName("HardwareHistoryID");

                entity.Property(e => e.CurrentOwnerId).HasColumnName("CurrentOwnerID");

                entity.Property(e => e.CurrentOwnerStartDate).HasColumnType("date");

                entity.Property(e => e.HardwareId).HasColumnName("HardwareID");

                entity.Property(e => e.HardwareType)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PreviousOwnerId).HasColumnName("PreviousOwnerID");

                entity.HasOne(d => d.CurrentOwner)
                    .WithMany(p => p.HardwareHistoryCurrentOwner)
                    .HasForeignKey(d => d.CurrentOwnerId)
                    .HasConstraintName("FK_HardwareHistory_Employee");

                entity.HasOne(d => d.PreviousOwner)
                    .WithMany(p => p.HardwareHistoryPreviousOwner)
                    .HasForeignKey(d => d.PreviousOwnerId)
                    .HasConstraintName("FK_HardwareHistory_Employee1");
            });

            modelBuilder.Entity<Monitor>(entity =>
            {
                entity.Property(e => e.MonitorId).HasColumnName("MonitorID");

                entity.Property(e => e.CostPerYear).HasColumnType("money");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.FlatCost).HasColumnType("money");

                entity.Property(e => e.Make).HasMaxLength(100);

                entity.Property(e => e.Model).HasMaxLength(100);

                entity.Property(e => e.Outputs).HasMaxLength(200);

                entity.Property(e => e.PurchaseDate).HasColumnType("date");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Monitor)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_Monitor_Employee");
            });

            modelBuilder.Entity<Peripheral>(entity =>
            {
                entity.Property(e => e.PeripheralId).HasColumnName("PeripheralID");

                entity.Property(e => e.CostPerYear).HasColumnType("money");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.FlatCost).HasColumnType("money");

                entity.Property(e => e.PeripheralName).HasMaxLength(100);

                entity.Property(e => e.PeripheralType).HasMaxLength(50);

                entity.Property(e => e.PurchaseDate).HasColumnType("date");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Peripheral)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_Peripheral_Employee");
            });

            modelBuilder.Entity<Plugins>(entity =>
            {
                entity.HasKey(e => e.PluginId);

                //entity.Property(e => e.ProgramID).HasColumnName("PluginID");

                entity.Property(e => e.PluginCostPerYear).HasColumnType("money");

                entity.Property(e => e.PluginFlatCost).HasColumnType("money");

                entity.Property(e => e.PluginName)
                    .IsRequired()
                    .HasMaxLength(100);

               // entity.Property(e => e.ProgramId).HasColumnName("ProgramID");

                //entity.HasOne(d => d.Program)
                //    .WithMany(p => p.Plugins)
                //    .HasForeignKey(d => d.ProgramId)
                //    .HasConstraintName("FK_Plugins_Program");
            });

            modelBuilder.Entity<Program>(entity =>
            {
                //entity.Property(e => e.ProgramId).HasColumnName("ProgramID");

                //entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.ProgramCostPerEmployee).HasColumnType("money");

                entity.Property(e => e.ProgramCostPerYear).HasColumnType("money");

                entity.Property(e => e.ProgramLicenseKey).HasMaxLength(100);

                entity.Property(e => e.ProgramName)
                    .IsRequired()
                    .HasMaxLength(100);

                //entity.HasOne(d => d.Employee)
                //    .WithMany(p => p.Program)
                //    .HasForeignKey(d => d.EmployeeId)
                //    .HasConstraintName("FK_Program_Employee");
            });

            modelBuilder.Entity<ProgramHistory>(entity =>
            {
                entity.Property(e => e.ProgramHistoryId).HasColumnName("ProgramHistoryID");

                entity.Property(e => e.CurrentOwnerId).HasColumnName("CurrentOwnerID");

                entity.Property(e => e.CurrentOwnerStartDate).HasColumnType("date");

                entity.Property(e => e.PreviousOwnerId).HasColumnName("PreviousOwnerID");

                entity.Property(e => e.ProgramId).HasColumnName("ProgramID");

                entity.HasOne(d => d.CurrentOwner)
                    .WithMany(p => p.ProgramHistoryCurrentOwner)
                    .HasForeignKey(d => d.CurrentOwnerId)
                    .HasConstraintName("FK_ProgramHistory_Employee");

                entity.HasOne(d => d.PreviousOwner)
                    .WithMany(p => p.ProgramHistoryPreviousOwner)
                    .HasForeignKey(d => d.PreviousOwnerId)
                    .HasConstraintName("FK_ProgramHistory_Employee1");

                //entity.HasOne(d => d.Program)
                //    .WithMany(p => p.ProgramHistory)
                //    .HasForeignKey(d => d.ProgramId)
                //    .OnDelete(DeleteBehavior.ClientSetNull)
                //    .HasConstraintName("FK_ProgramHistory_Program");
            });

            modelBuilder.Entity<Server>(entity =>
            {
                entity.Property(e => e.ServerId).HasColumnName("ServerID");

                entity.Property(e => e.CostPerYear).HasColumnType("money");

                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");

                entity.Property(e => e.EndOfLife).HasColumnType("date");

                entity.Property(e => e.FlatCost).HasColumnType("money");

                entity.Property(e => e.Fqdn).HasColumnName("FQDN");

                entity.Property(e => e.OperatingSystem).HasMaxLength(100);

                entity.Property(e => e.PurchaseDate).HasColumnType("date");

                entity.Property(e => e.Ram).HasColumnName("RAM");

                entity.Property(e => e.RenewalDate).HasColumnType("date");

                entity.Property(e => e.ServerName).HasMaxLength(100);

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Server)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_Server_Employee");
            });
        }
    }
}
