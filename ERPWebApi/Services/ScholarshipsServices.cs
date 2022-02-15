using ERPWebApi.Data;
using ERPWebApi.Models;
using ERPWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERPWebApi.Services
{
    public class ScholarshipsServices : IBase<Scholarship>
    {
        private ERPWebApiContext _eRPWebApi;

        public ScholarshipsServices(ERPWebApiContext eRPWebApi)
        {
            _eRPWebApi = eRPWebApi;
        }

        public async Task Delete(int Id)
        {
            _eRPWebApi.ChangeTracker.Clear();
            _eRPWebApi.Student.RemoveRange(_eRPWebApi.Student.Where(key => key.ScholarshipId == Id));
            _eRPWebApi.SaveChanges();
            _eRPWebApi.Scholarship.Remove(new Scholarship()
            {
                ScholarshipId = Id
            });
             _eRPWebApi.SaveChanges();    
        }

        public async Task<IEnumerable<Scholarship>> Get()
        {
            return await _eRPWebApi.Scholarship.ToListAsync();
        }

 

        public async Task<Scholarship> GetItem(int Id)
        {
            var Result = await _eRPWebApi.Scholarship.SingleOrDefaultAsync(key => key.ScholarshipId == Id);
            return Result;
        }

        public async Task<Scholarship> Insert(Scholarship t)
        {
            _eRPWebApi.Scholarship.Add(t);
            await _eRPWebApi.SaveChangesAsync();
            return t;
        }

        public async Task<Scholarship> Update(int Id, Scholarship t)
        {
            _eRPWebApi.ChangeTracker.Clear();
            _eRPWebApi.Entry(t).State = EntityState.Modified;
            await _eRPWebApi.SaveChangesAsync();
            return t;
        }
    }
}
