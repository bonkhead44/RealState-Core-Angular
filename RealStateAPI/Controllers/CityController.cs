using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealStateAPI.Data.Repo;
using RealStateAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RealStateAPI.Data.Interfaces;
using AutoMapper;
using RealStateAPI.Dtos;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Authorization;

namespace RealStateAPI.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CityController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            IEnumerable<City> cities = await _unitOfWork.cityRepository.GetCities();
            var cityList = _mapper.Map<IEnumerable<CityDto>>(cities);
            return Ok(cityList);
        }
        // api/city/add
        [HttpPost("Add")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = _mapper.Map<City>(cityDto);
            city.LastUpdatedBy = "1";
            city.LastUpdatedOn = DateTime.Now;
            _unitOfWork.cityRepository.AddCity(city);
            await _unitOfWork.SaveAsync();
            IEnumerable<City> cities = await _unitOfWork.cityRepository.GetCities();
            var cityList = _mapper.Map<IEnumerable<CityDto>>(cities);
            return Ok(cityList);
        }
        // api/city/delete/id
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            _unitOfWork.cityRepository.DeleteCity(id);
            await _unitOfWork.SaveAsync();
            IEnumerable<City> cities = await _unitOfWork.cityRepository.GetCities();
            var cityList = _mapper.Map<IEnumerable<CityDto>>(cities);
            return Ok(cityList);
        }

        // update operation operation
        // api/city/update/id
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityDto)
        {
            var cityData = await _unitOfWork.cityRepository.GetCityById(id);
            cityData.LastUpdatedBy = "1";
            cityData.LastUpdatedOn = DateTime.Now;
            _mapper.Map(cityDto, cityData);
            await _unitOfWork.SaveAsync();
            IEnumerable<City> cities = await _unitOfWork.cityRepository.GetCities();
            var cityList = _mapper.Map<IEnumerable<CityDto>>(cities);
            return Ok(cityList);
        }

        //// put operation
        //// api/city/update/id
        //[HttpPut("update/{id}")]
        //public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
        //{
        //    var cityData = await _unitOfWork.cityRepository.GetCityById(id);
        //    cityData.LastUpdatedBy = "1";
        //    cityData.LastUpdatedOn = DateTime.Now;
        //    _mapper.Map(cityDto, cityData);
        //    await _unitOfWork.SaveAsync();
        //    IEnumerable<City> cities = await _unitOfWork.cityRepository.GetCities();
        //    var cityList = _mapper.Map<IEnumerable<CityDto>>(cities);
        //    return Ok(cityList);
        //}

        //// patch operation
        //// api/city/update/id
        //[HttpPatch("update/{id}")]
        //public async Task<IActionResult> UpdateCityByPatch(int id, JsonPatchDocument<City> cityToPatch)
        //{
        //    var cityData = await _unitOfWork.cityRepository.GetCityById(id);
        //    cityData.LastUpdatedBy = "1";
        //    cityData.LastUpdatedOn = DateTime.Now;
        //    cityToPatch.ApplyTo(cityData, ModelState);
        //    await _unitOfWork.SaveAsync();
        //    IEnumerable<City> cities = await _unitOfWork.cityRepository.GetCities();
        //    var cityList = _mapper.Map<IEnumerable<CityDto>>(cities);
        //    return Ok(cityList);
        //}
    }
}
