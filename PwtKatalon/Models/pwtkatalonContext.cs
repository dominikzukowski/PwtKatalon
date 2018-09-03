using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PwtKatalon.Models
{
    public partial class pwtkatalonContext : DbContext
    {
        public pwtkatalonContext()
        {
        }

        public pwtkatalonContext(DbContextOptions<pwtkatalonContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Activations> Activations { get; set; }
        public virtual DbSet<Agencies> Agencies { get; set; }
        public virtual DbSet<CustomerNew> CustomerNew { get; set; }
        public virtual DbSet<Environment> Environment { get; set; }
        public virtual DbSet<Organization> Organization { get; set; }
        public virtual DbSet<ReferenceNumber> ReferenceNumber { get; set; }
        public virtual DbSet<Scheduller> Scheduller { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Activations>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ActivationTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Comment)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.EnvironmentId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.JunitResult).HasColumnType("xml");

                entity.Property(e => e.ReceiveUserId).HasColumnName("ReceiveUserID");

                entity.Property(e => e.ReportName)
                    .IsRequired()
                    .HasMaxLength(250)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.RunArguments)
                    .IsRequired()
                    .HasMaxLength(1500)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.SchedulerId).HasColumnName("SchedulerID");

                entity.Property(e => e.SendUserId).HasColumnName("SendUserID");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.TestSuite)
                    .IsRequired()
                    .HasMaxLength(200)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Version)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");
            });

            modelBuilder.Entity<Agencies>(entity =>
            {
                entity.HasKey(e => new { e.OrganizationId, e.AgencyNumber });

                entity.Property(e => e.OrganizationId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AgencyNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AgencyName)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<CustomerNew>(entity =>
            {
                entity.ToTable("customer_new");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Address1)
                    .IsRequired()
                    .HasColumnName("Address_")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.AssignedCustomerCategory)
                    .IsRequired()
                    .HasColumnName("Assigned_customer_category")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Authority)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.BirthDate)
                    .IsRequired()
                    .HasColumnName("Birth_date")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.CityRes)
                    .IsRequired()
                    .HasColumnName("City_res")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.CompanyId)
                    .IsRequired()
                    .HasColumnName("Company_ID")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.CountryBirth)
                    .IsRequired()
                    .HasColumnName("Country_birth")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.CountryOfRes)
                    .IsRequired()
                    .HasColumnName("Country_of_res")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.EMail)
                    .IsRequired()
                    .HasColumnName("e_Mail")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.EnvironmentId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("First_name")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.IdValidUntil)
                    .IsRequired()
                    .HasColumnName("Id_valid_until")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.IdentityDocument)
                    .IsRequired()
                    .HasColumnName("Identity_document")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.IssueCity)
                    .IsRequired()
                    .HasColumnName("Issue_city")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.IssueCountry)
                    .IsRequired()
                    .HasColumnName("Issue_country")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.IssueDate)
                    .IsRequired()
                    .HasColumnName("Issue_date")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("Last_name")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.NationBirth)
                    .IsRequired()
                    .HasColumnName("Nation_birth")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Nationality)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Number)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Occupation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.OrganizationId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasColumnName("Phone_number")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.PlaceOfBirth)
                    .IsRequired()
                    .HasColumnName("Place_of_birth")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.PostalCode)
                    .IsRequired()
                    .HasColumnName("Postal_code")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Prv)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.PurposeOfTrans)
                    .IsRequired()
                    .HasColumnName("Purpose_of_trans")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Relation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.SecondLastName)
                    .IsRequired()
                    .HasColumnName("Second_last_name")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.SocSec)
                    .IsRequired()
                    .HasColumnName("Soc_Sec")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.SourceOfFunds)
                    .IsRequired()
                    .HasColumnName("Source_of_funds")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.TxOccupation)
                    .IsRequired()
                    .HasColumnName("txOccupation")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.WorkPhone)
                    .IsRequired()
                    .HasColumnName("Work_phone")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.CustomerNew)
                    .HasForeignKey(d => new { d.EnvironmentId, d.OrganizationId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_customer_new_Organization");
            });

            modelBuilder.Entity<Environment>(entity =>
            {
                entity.Property(e => e.EnvironmentId)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.AlternativeUrl)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.PrimaryUrl)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Version)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Organization>(entity =>
            {
                entity.HasKey(e => new { e.EnvironmentId, e.OrganizationId });

                entity.Property(e => e.EnvironmentId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrganizationId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CountryLabel)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.IsPrimary).HasDefaultValueSql("((1))");

                entity.Property(e => e.OrganizationName)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Tags)
                    .IsRequired()
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.HasOne(d => d.Environment)
                    .WithMany(p => p.Organization)
                    .HasForeignKey(d => d.EnvironmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Organization_Environment");
            });

            modelBuilder.Entity<ReferenceNumber>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Environment)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.OrganizationId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.ReceiverCountry)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.ReceiverFirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.ReceiverLastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.ReferenceNo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.SenderFirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.SenderLastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.TransactionDate)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TransactionStatus)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.TransactionType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");
            });

            modelBuilder.Entity<Scheduller>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AlternativeTestSuite)
                    .IsRequired()
                    .HasMaxLength(200)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Comment)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.DateFrom)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DateTo)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(dateadd(day,(2),getdate()))");

                entity.Property(e => e.Repeats).HasDefaultValueSql("((-1))");

                entity.HasOne(d => d.ReceiveUser)
                    .WithMany(p => p.SchedullerReceiveUser)
                    .HasForeignKey(d => d.ReceiveUserId)
                    .HasConstraintName("FK_Scheduller_User1");

                entity.HasOne(d => d.SendUser)
                    .WithMany(p => p.SchedullerSendUser)
                    .HasForeignKey(d => d.SendUserId)
                    .HasConstraintName("FK_Scheduller_User");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AgencyReceive)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AgencySend)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EnvironmentId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Labels)
                    .IsRequired()
                    .HasMaxLength(250)
                    .HasDefaultValueSql("('TELLER')");

                entity.Property(e => e.Login)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.OrganizationId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.SetupDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Environment)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.EnvironmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Environment");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => new { d.EnvironmentId, d.OrganizationId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Organization");

                entity.HasOne(d => d.Agencies)
                    .WithMany(p => p.UserAgencies)
                    .HasForeignKey(d => new { d.OrganizationId, d.AgencyReceive })
                    .HasConstraintName("FK_User_AgencyReceive");

                entity.HasOne(d => d.AgenciesNavigation)
                    .WithMany(p => p.UserAgenciesNavigation)
                    .HasForeignKey(d => new { d.OrganizationId, d.AgencySend })
                    .HasConstraintName("FK_User_AgencySend");
            });
        }
    }
}
