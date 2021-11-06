using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RealStateAPI.Data.Interfaces;
using RealStateAPI.Dtos;
using System;
using System.Collections.Generic;
using System.Text.Encodings;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using RealStateAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;

namespace RealStateAPI.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public AccountController(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configuration = configuration;
        }
        // api/account/login
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
        {
            var user = await _unitOfWork.userRepository.Authenticate(loginRequestDto.UserName, loginRequestDto.Password);
            if (user == null)
            {
                return BadRequest();
            }
            var userResponseData = _mapper.Map<LoginResponseDto>(user);
            userResponseData.Token = GenerateToken(user);
            return Ok(userResponseData);
        }

        private string GenerateToken(User user) {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Key").Value));
            var claims = new Claim[] {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = signingCredentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
