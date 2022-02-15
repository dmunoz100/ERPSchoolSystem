using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ERPWebApi.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; }
        public string StudentLastName { get; set; }
        public int Age { get; set; }
        public int ScholarshipId { get; set; }
        public DateTime DateBirhday { get; set; }
        public Scholarship Scholarship { get; set; }

    }
}
