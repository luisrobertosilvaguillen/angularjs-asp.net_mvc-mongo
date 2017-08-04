using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Crossover_Evaluation.Bussines.Interfaces;
using Crossover_Evaluation.Bussines.Models;
using Crossover_Evaluation.Bussines.Contexts;
using MongoDB.Driver;
namespace Crossover_Evaluation.Bussines.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly DbContext _dbContext = null;
        public BookRepository()
        {
            _dbContext = new DbContext();
        }
        public async Task<IList<Book>> GetAllBooks()
        {
            try
            {
                return await _dbContext.Books.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IList<Book>> GetBookByPublisher(string publisher)
        {
            try
            {
                return await _dbContext.Books.Find(x => x.Publisher.ToLower().Trim().Contains(publisher.ToLower().Trim())).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Book> GetBookById(string id)
        {
            try
            {
                return await _dbContext.Books.Find(x => x._Id == new MongoDB.Bson.ObjectId(id)).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
