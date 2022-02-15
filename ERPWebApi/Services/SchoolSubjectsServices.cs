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
    public class SchoolSubjectsServices : IBase<SchoolSubject>
    {

        private ERPWebApiContext _eRPWebApi;

        public SchoolSubjectsServices(ERPWebApiContext eRPWebApi)
        {
            _eRPWebApi = eRPWebApi;
        }

        public async Task Delete(int Id)
        {
            _eRPWebApi.ChangeTracker.Clear();
            _eRPWebApi.StudentSchoolSubject.RemoveRange(_eRPWebApi.StudentSchoolSubject.Where(key => key.SchoolSubjectId == Id));
            _eRPWebApi.SaveChanges();
            _eRPWebApi.SchoolSubject.Remove(new SchoolSubject()
            {
                SchoolSubjectId = Id
            });
            _eRPWebApi.SaveChanges();
        }

        public async Task<IEnumerable<SchoolSubject>> Get()
        {
            return await _eRPWebApi.SchoolSubject.ToListAsync();
        }

   

        public async Task<SchoolSubject> GetItem(int Id)
        {
            var Result = await _eRPWebApi.SchoolSubject.SingleOrDefaultAsync(key => key.SchoolSubjectId == Id);
            return Result;
        }

        public async Task<SchoolSubject> Insert(SchoolSubject t)
        {
            _eRPWebApi.SchoolSubject.Add(t);
            await _eRPWebApi.SaveChangesAsync();
            return t;
        }

        public async Task<SchoolSubject> Update(int Id, SchoolSubject t)
        {
            _eRPWebApi.ChangeTracker.Clear();
            _eRPWebApi.Entry(t).State = EntityState.Modified;
            await _eRPWebApi.SaveChangesAsync();
            return t;
        }
    }
}
