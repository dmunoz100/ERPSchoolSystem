using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERPWebApi.Models
{
    public class StudentSchoolSubject
    {
        public int StudentSchoolSubjectId { get; set; }

        public int StudentId { get; set; }

        public int SchoolSubjectId { get; set; }
        public Student Student { get; set; }
        public SchoolSubject SchoolSubject { get; set; }
    }
}
