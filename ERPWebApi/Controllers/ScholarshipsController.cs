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
    public class ScholarshipsController : ControllerBase
    {
        private readonly ERPWebApiContext _context;
        private readonly IBase<Scholarship> _ibase;

        public ScholarshipsController(ERPWebApiContext context,IBase<Scholarship> ibase)
        {
            _ibase = ibase;
            _context = context;
        }


        [HttpGet]
        public async Task<IEnumerable<Scholarship>> GetScholarship()
        {
            return await _ibase.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Scholarship>> GetScholarship(int id)
        {
            return await _ibase.GetItem(id);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<Scholarship>> PutScholarship(int id, Scholarship scholarship)
        {
            return await _ibase.Update(id, scholarship);
        }


        [HttpPost]
        public async Task<ActionResult<Scholarship>> PostScholarship(Scholarship scholarship)
        {
            return await _ibase.Insert(scholarship);
        }


        [HttpDelete("{id}")]
        public async Task DeleteScholarship(int id)
        {
            await _ibase.Delete(id);
        }

  
    }
}
