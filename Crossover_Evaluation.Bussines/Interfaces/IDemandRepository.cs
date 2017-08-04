using System.Collections.Generic;
using System.Threading.Tasks;
using Crossover_Evaluation.Bussines.Models;

namespace Crossover_Evaluation.Bussines.Interfaces
{
    public interface IDemandRepository
    {
        Task<Demand> AddDemand(Demand demand);
        Task<IList<Demand>> GetDemandByUser(string username);
        Task<Demand> CheckDemandExist(User user, Book book);
    }
}
