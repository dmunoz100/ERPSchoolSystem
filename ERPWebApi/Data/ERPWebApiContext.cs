using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ERPWebApi.Models;

namespace ERPWebApi.Data
{
    public class ERPWebApiContext : DbContext
    {
        public ERPWebApiContext (DbContextOptions<ERPWebApiContext> options)
            : base(options)
        {
        }

        public DbSet<ERPWebApi.Models.Student> Student { get; set; }

        public DbSet<ERPWebApi.Models.Scholarship> Scholarship { get; set; }

        public DbSet<ERPWebApi.Models.SchoolSubject> SchoolSubject { get; set; }

        public DbSet<ERPWebApi.Models.StudentSchoolSubject> StudentSchoolSubject { get; set; }
    }
}
