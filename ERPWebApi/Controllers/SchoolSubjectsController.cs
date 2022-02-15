using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ERPWebApi.Data;
using ERPWebApi.Models;
using ERPWebApi.Services.Interfaces;

namespace ERPWebApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolSubjectsController : ControllerBase
    {
        private readonly ERPWebApiContext _context;
        private readonly IBase<SchoolSubject> _ibase;

        public SchoolSubjectsController(ERPWebApiContext context, IBase<SchoolSubject> ibase)
        {
            _ibase = ibase;
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<SchoolSubject>> GetSchoolSubject()
        {
            return await _ibase.Get();
        }

     
        [HttpGet("{id}")]
        public async Task<ActionResult<SchoolSubject>> GetSchoolSubject(int id)
        {
            return await _ibase.GetItem(id);
        }
  
        [HttpPut("{id}")]
        public async Task<ActionResult<SchoolSubject>> PutSchoolSubject(int id, SchoolSubject schoolSubject)
        {
            return await _ibase.Update(id, schoolSubject);
        }

        [HttpPost]
        public async Task<ActionResult<SchoolSubject>> PostSchoolSubject(SchoolSubject schoolSubject)
        {
            return await _ibase.Insert(schoolSubject);
        }

        [HttpDelete("{id}")]
        public async Task DeleteSchoolSubject(int id)
        {

            await _ibase.Delete(id);
        }

      
    }
}
