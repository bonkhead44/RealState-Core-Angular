using RealStateAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealStateAPI.Data.Repo
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCities();
        void AddCity(City city);
        void DeleteCity(int cityId);
        Task<bool> SaveChanges();
    }
}
