using System;
using System.Threading.Tasks;
using Crossover_Evaluation.Bussines.Contexts;
using Crossover_Evaluation.Bussines.Models;
using Microsoft.AspNet.Identity;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.RegularExpressions;
namespace Crossover_Evaluation.Bussines.Repositories
{
    public class UserRepository<TUser> : IUserStore<TUser>, IUserPasswordStore<TUser>, IUserSecurityStampStore<TUser> where TUser : class, IIdentityUser
    {
        private bool _disposed;
        private readonly UserContext<TUser> _dbContext;
        public UserRepository(UserContext<TUser> dbContext)
        {
            _dbContext = dbContext;
        }

        #region IUserStore
        public virtual Task CreateAsync(TUser user)
        {
            try
            {
                return Task.FromResult(_dbContext.Users.InsertOneAsync(user));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public virtual Task DeleteAsync(TUser user)
        {
            var query = Builders<TUser>.Filter.Eq("Id", user.Id); 
            return Task.FromResult(_dbContext.Users.DeleteOne(query));
        }
        public virtual Task<TUser> FindByIdAsync(string userId)
        {
            try
            {
                var query = Builders<TUser>.Filter.Eq("Id", userId); ;
                return Task.FromResult(_dbContext.Users.Find(query).FirstOrDefault());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public virtual Task<TUser> FindByNameAsync(string userName)
        {
            try
            {
                var query = Builders<TUser>.Filter.Eq("UserName", userName); 
                return Task.FromResult(_dbContext.Users.Find(query).FirstOrDefault());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public virtual Task UpdateAsync(TUser user)
        {
            try
            {
                _dbContext.Users.ReplaceOne(n => n.Id == user.Id, user, new UpdateOptions { IsUpsert = true });
                return Task.FromResult<int>(0);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            _disposed = true;
        }
        #endregion

        #region IUserPasswordStore
        public virtual Task<string> GetPasswordHashAsync(TUser user)
        {
            try
            {
                return Task.FromResult<string>(user.PasswordHash);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public virtual Task<bool> HasPasswordAsync(TUser user)
        {
            return Task.FromResult<bool>(user.PasswordHash != null && user.PasswordHash.Length > 0);
        }
        public virtual Task SetPasswordHashAsync(TUser user, string passwordHash)
        {
            if (user == null)
                throw new ArgumentNullException("user");
            user.PasswordHash = passwordHash;
            return Task.FromResult<int>(0);
        }
        #endregion

        #region IUserSecurityStampStore
        public virtual Task<string> GetSecurityStampAsync(TUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("user");
            }
            return Task.FromResult<string>(user.SecurityStamp);
        }

        public virtual Task SetSecurityStampAsync(TUser user, string stamp)
        {
            if (user == null)
            {
                throw new ArgumentNullException("user");
            }
            user.SecurityStamp = stamp;
            return Task.FromResult<int>(0);
        }
        #endregion
        
    }
}
