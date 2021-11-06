using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RealStateAPI.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace RealStateAPI.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;
        private readonly IWebHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task Invoke(HttpContext httpContext) {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                ApiError response;
                HttpStatusCode httpStatusCode = HttpStatusCode.InternalServerError;
                string errorMessage = "";
                var errorType = ex.GetType();
                if (errorType == typeof(UnauthorizedAccessException))
                {
                    httpStatusCode = HttpStatusCode.Forbidden;
                    errorMessage = "You are not authorized!!!.";
                }
                else
                {
                    errorMessage = "Server error occured!!!.";
                }
                if (_env.IsDevelopment())
                {
                    response = new ApiError((int)httpStatusCode, errorMessage, ex.StackTrace);
                }
                else {
                    response = new ApiError((int)httpStatusCode, errorMessage);
                }
                _logger.LogError(ex, ex.Message);
                httpContext.Response.StatusCode = (int)httpStatusCode;
                httpContext.Response.ContentType = "application/json";
                await httpContext.Response.WriteAsync(response.ToString());
            }
        }
    }
}
