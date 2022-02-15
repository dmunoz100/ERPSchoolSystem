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
    public class StudentsController : ControllerBase
    {
        private readonly IBase<Student> _ibase;
        private readonly ERPWebApiContext _context;

        public StudentsController(ERPWebApiContext context, IBase<Student> ibase)
        {
            _ibase = ibase;
            _context = context;
        }

 
        [HttpGet]
        public async Task<IEnumerable<Student>> GetStudent()
        {
            return await _ibase.Get();
        }

  
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            return await _ibase.GetItem(id);
        }

  
        [HttpPut("{id}")]
        public async Task<ActionResult<Student>> PutStudent(int id, Student student)
        {
            return await _ibase.Update(id, student);
        }

      
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            return await _ibase.Insert(student);
        }

      
        [HttpDelete("{id}")]
        public async Task DeleteStudent(int id)
        {
             await _ibase.Delete(id);
        }
    }
}
