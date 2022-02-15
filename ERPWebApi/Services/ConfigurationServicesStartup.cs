using ERPWebApi.Data;
using ERPWebApi.Models;
using ERPWebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERPWebApi.Services
{
    public class ConfigurationServicesStartup
    {
        public static void Initialize(IServiceCollection serviceCollection)
        { 
            serviceCollection.AddScoped<IBase<Student>, StudentServices>();
            serviceCollection.AddScoped<IBase<Scholarship> , ScholarshipsServices>();
            serviceCollection.AddScoped<IBase<SchoolSubject>, SchoolSubjectsServices>();
            serviceCollection.AddScoped<IBase<StudentSchoolSubject>,StudentSchoolSubjectsServices>();
        }
    }
}
