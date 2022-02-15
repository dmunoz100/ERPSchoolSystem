using ERPWebApi.Data;
using ERPWebApi.Models;
using ERPWebApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERPWebApi.Services
{
    public class StudentServices : IBase<Student>
    {
        private ERPWebApiContext _eRPWebApi;

        public StudentServices(ERPWebApiContext eRPWebApi)
        {
            _eRPWebApi = eRPWebApi;
        }

      
        public async Task<IEnumerable<Student>> Get()
        {
          return  await _eRPWebApi.Student.Include(key => key.Scholarship).ToListAsync();
        }

        public async Task<Student> GetItem(int Id)
        {
            var student = await _eRPWebApi.Student.Include(key => key.Scholarship)
                                                  .SingleOrDefaultAsync(key => key.StudentId == Id);

            return student;
        }

        public async Task<Student> Insert(Student t)
        {
               _eRPWebApi.Student.Add(t);
            await _eRPWebApi.SaveChangesAsync();
            return t;
        }

        public async Task<Student> Update(int Id, Student t)
        {
              _eRPWebApi.ChangeTracker.Clear();
            _eRPWebApi.Entry(t).State = EntityState.Modified;
            await _eRPWebApi.SaveChangesAsync();
            return t;
        }

        public async Task Delete(int Id)
        {
            _eRPWebApi.ChangeTracker.Clear();
            _eRPWebApi.StudentSchoolSubject.RemoveRange(_eRPWebApi.StudentSchoolSubject.Where(key => key.StudentId == Id));
            _eRPWebApi.SaveChanges();
            _eRPWebApi.Student.Remove(new Student()
            {
                StudentId = Id
            });
             _eRPWebApi.SaveChanges();    
        }

    
    }
}
