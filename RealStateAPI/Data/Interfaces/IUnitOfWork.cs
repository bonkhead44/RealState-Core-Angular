using RealStateAPI.Data.Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealStateAPI.Data.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository userRepository { get; }
        ICityRepository cityRepository { get;}
        Task<bool> SaveAsync();
    }
}
