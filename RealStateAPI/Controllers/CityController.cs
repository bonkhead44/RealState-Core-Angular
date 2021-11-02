using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealStateAPI.Data.Repo;
using RealStateAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealStateAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityRepository _cityRepository;
        public CityController(ICityRepository cityRepository)
        {
            this._cityRepository = cityRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            IEnumerable<City> cities = await _cityRepository.GetCities();
            return Ok(cities);
        }
        // api/city/add
        [HttpPost("Add")]
        public async Task<IActionResult> AddCity(City city)
        {
            _cityRepository.AddCity(city);
            await _cityRepository.SaveChanges();
            IEnumerable<City> cities = await _cityRepository.GetCities();
            return Ok(cities);
        }
        // api/city/delete/id
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            _cityRepository.DeleteCity(id);
            await _cityRepository.SaveChanges();
            IEnumerable<City> cities = await _cityRepository.GetCities();
            return Ok(cities);
        }
    }
}
