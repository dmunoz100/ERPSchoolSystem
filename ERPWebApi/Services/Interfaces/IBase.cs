using ERPWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERPWebApi.Services.Interfaces
{
    public interface IBase<T>
    {
        Task<IEnumerable<T>> Get();
        Task<T> GetItem(int Id);
        Task<T> Insert(T t);
        Task<T> Update (int Id,T t);
        Task Delete(int Id);
    }
}
