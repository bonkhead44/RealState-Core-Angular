using RealStateAPI.Data.Interfaces;
using RealStateAPI.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace RealStateAPI.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public UserRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<User> Authenticate(string userName, string password)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == userName && x.Password == password);
        }
    }
}
