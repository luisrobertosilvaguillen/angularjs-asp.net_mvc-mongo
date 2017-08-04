using MongoDB.Driver;
using Crossover_Evaluation.Bussines.Models;
using Crossover_Evaluation.Bussines.Interfaces;
using AspNet.Identity.MongoDB;
using System;
namespace Crossover_Evaluation.Bussines.Contexts
{
    public class DbContext :  IDbContext, IDisposable
    {
        internal readonly IMongoDatabase _database = null;
        private MongoClient _provider;
        public DbContext()
        {
            _provider = new MongoClient();
            if (_provider != null)
                _database = _provider.GetDatabase("Crossover");
        }
        public static DbContext Create()
        {
            return new DbContext();
        }
        public IMongoCollection<Demand> Demands
        {
            get
            {
                return _database.GetCollection<Demand>("Demand");
            }
        }
        public IMongoCollection<Book> Books
        {
            get
            {
                return _database.GetCollection<Book>("Book");
            }
        }
        public IMongoCollection<User> Users
        {
            get
            {
                return _database.GetCollection<User>("User");
            }
        }
        public void Dispose()
        {
        }
    }
}
