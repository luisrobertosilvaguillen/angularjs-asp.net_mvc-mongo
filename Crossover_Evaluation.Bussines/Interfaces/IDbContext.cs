using MongoDB.Driver;
using Crossover_Evaluation.Bussines.Models;
using Crossover_Evaluation.Bussines.Contexts;
namespace Crossover_Evaluation.Bussines.Interfaces
{
    public interface IDbContext
    {
        IMongoCollection<Demand> Demands { get; }
        IMongoCollection<Book> Books { get; }
        IMongoCollection<User> Users { get; }
    }
}
