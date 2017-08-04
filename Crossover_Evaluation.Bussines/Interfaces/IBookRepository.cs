using System.Collections.Generic;
using System.Threading.Tasks;
using Crossover_Evaluation.Bussines.Models;

namespace Crossover_Evaluation.Bussines.Interfaces
{
    public interface IBookRepository
    {
        Task<IList<Book>> GetAllBooks();
        Task<IList<Book>> GetBookByPublisher(string publisher);
        Task<Book> GetBookById(string id);
    }
}
