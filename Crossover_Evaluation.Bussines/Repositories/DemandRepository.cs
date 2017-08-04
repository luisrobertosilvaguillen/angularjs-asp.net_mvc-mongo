using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Crossover_Evaluation.Bussines.Interfaces;
using Crossover_Evaluation.Bussines.Models;
using Crossover_Evaluation.Bussines.Contexts;
using MongoDB.Driver;
namespace Crossover_Evaluation.Bussines.Repositories
{
    public class DemandRepository : IDemandRepository
    {
        private readonly DbContext _dbContext = null;
        public DemandRepository()
        {
            _dbContext = new DbContext();
        }
        public async Task<Demand> AddDemand(Demand item)
        {
            try
            {
                await _dbContext.Demands.InsertOneAsync(item);
                return item;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IList<Demand>> GetDemandByUser(string username)
        {
            try
            {
                return await _dbContext.Demands.Find(x => x.User.UserName == username).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Demand> CheckDemandExist(User user, Book book)
        {
            try
            {
                return await _dbContext.Demands.Find(x => x.User == user && x.Book == book).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
