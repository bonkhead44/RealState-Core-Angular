using Microsoft.EntityFrameworkCore;
using RealStateAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealStateAPI.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly ApplicationDbContext _db;
        public CityRepository(ApplicationDbContext db)
        {
            this._db = db;
        }
        public void AddCity(City city)
        {
            _db.Cities.AddAsync(city);
        }

        public void DeleteCity(int cityId)
        {
            City city = _db.Cities.Find(cityId);
            _db.Cities.Remove(city);
        }

        public async Task<IEnumerable<City>> GetCities()
        {
            return await _db.Cities.ToListAsync();
        }

        public async Task<bool> SaveChanges()
        {
            return await _db.SaveChangesAsync() > 0;
        }
    }
}
