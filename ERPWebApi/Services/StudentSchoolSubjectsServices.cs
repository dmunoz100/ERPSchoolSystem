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
    public class StudentSchoolSubjectsServices : IBase<StudentSchoolSubject>
    {

        private ERPWebApiContext _eRPWebApi;

        public StudentSchoolSubjectsServices(ERPWebApiContext eRPWebApi)
        {
            _eRPWebApi = eRPWebApi;
        }


        public async Task Delete(int Id)
        {
            _eRPWebApi.ChangeTracker.Clear();
            _eRPWebApi.StudentSchoolSubject.Remove(new StudentSchoolSubject()
            {
                StudentSchoolSubjectId = Id
            });
             _eRPWebApi.SaveChanges();
        }

        public async Task<IEnumerable<StudentSchoolSubject>> Get()
        {
            return await _eRPWebApi.StudentSchoolSubject.ToListAsync();
        }

     

        public async Task<StudentSchoolSubject> GetItem(int Id)
        {
            var Result = await _eRPWebApi.StudentSchoolSubject.SingleOrDefaultAsync(key => key.StudentId == Id);
            return Result;
        }

        public async Task<StudentSchoolSubject> Insert(StudentSchoolSubject t)
        {
            _eRPWebApi.StudentSchoolSubject.Add(t);
            await _eRPWebApi.SaveChangesAsync();
            return t;
        }

        public async Task<StudentSchoolSubject> Update(int Id, StudentSchoolSubject t)
        {
            _eRPWebApi.ChangeTracker.Clear();
            _eRPWebApi.Entry(t).State = EntityState.Modified;
            await _eRPWebApi.SaveChangesAsync();
            return t;
        }
    }
}
