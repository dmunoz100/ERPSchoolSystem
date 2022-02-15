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

namespace ERPWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentSchoolSubjectsController : ControllerBase
    {
        private readonly ERPWebApiContext _context;
        private readonly IBase<StudentSchoolSubject> _ibase;

        public StudentSchoolSubjectsController(  ERPWebApiContext context, IBase<StudentSchoolSubject> ibase)
        {
            _ibase = ibase;
            _context = context;
        }



        [HttpGet("Student/{id}")]
        public async Task<IEnumerable<StudentSchoolSubject>> GetStudentSchoool(int id)
        {
            return await _context.StudentSchoolSubject.Include(key=>key.SchoolSubject).Where(key=> key.StudentId == id).ToListAsync();
        }

    
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentSchoolSubject>> GetStudentSchoolSubject(int id)
        {
            return await _ibase.GetItem(id);
        }

     
        [HttpPut("{id}")]
        public async Task<ActionResult<StudentSchoolSubject>> PutStudentSchoolSubject(int id, StudentSchoolSubject studentSchoolSubject)
        {
            return await _ibase.Update(id, studentSchoolSubject);
        }

     
        [HttpPost]
        public async Task<ActionResult<StudentSchoolSubject>> PostStudentSchoolSubject(StudentSchoolSubject studentSchoolSubject)
        {
            return await _ibase.Insert(studentSchoolSubject);
        }

     
        [HttpDelete("{id}")]
        public async Task DeleteStudentSchoolSubject(int id)
        {
            await _ibase.Delete(id);
        }

      
    }
}
