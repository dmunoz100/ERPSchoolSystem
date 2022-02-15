using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ERPWebApi.Models
{
    public class Scholarship
    {
        public int ScholarshipId { get; set; }
        public string ScholarshipName { get; set; }

    }
}
