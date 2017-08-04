using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using Crossover_Evaluation.Bussines.Repositories;
using Crossover_Evaluation.Bussines.Contexts;
using Crossover_Evaluation.Bussines.Models;
using MongoDB.Driver;
namespace Crossover_Evaluation.Bussines.Test
{
    [TestClass]
    public class BookRepositoryTest
    {
        DbContext _context;
        [TestMethod]
        public async Task GetAllBooks()
        {
            _context = new DbContext();
            string[] autors = new string[3];
            autors[0] = "Josep Guardiola";
            autors[1] = "José Mourinho";
            autors[2] = "Diego Simeone";
            Book reg1 = new Book() { Authors = autors, Description = "DESC FIRST BOOK", Title = "The Bigs Trainers", Publisher = "FIFA" };
            autors[0] = "Bill Gates";
            autors[1] = "Mark Zuckerberg";
            autors[2] = "Steve Jobs";
            Book reg2 = new Book() { Authors = autors, Description = "DESC SECOND BOOK", Title = "The Revolutionaries", Publisher = "NASA" };
            await _context.Books.InsertOneAsync(reg1);
            await _context.Books.InsertOneAsync(reg2);
            var repo = new BookRepository();
            var books = await repo.GetAllBooks();
            Assert.IsTrue(books.Count > 1);
            await _context.Books.DeleteOneAsync(Builders<Book>.Filter.Eq("_id", reg1._Id));
            await _context.Books.DeleteOneAsync(Builders<Book>.Filter.Eq("_id", reg2._Id));
        }
        [TestMethod]
        public async Task GetBookByPublisher()
        {
            _context = new DbContext();
            string[] autors = new string[3];
            autors[0] = "Josep Guardiola";
            autors[1] = "José Mourinho";
            autors[2] = "Diego Simeone";
            Book reg1 = new Book() { Authors = autors, Description = "DESC FIRST BOOK", Title = "The Bigs Trainers", Publisher = "FIFA" };
            Book reg2 = new Book() { Authors = autors, Description = "DESC SECOND BOOK", Title = "The Bigs Trainers", Publisher = "FIFA" };
            await _context.Books.InsertOneAsync(reg1);
            await _context.Books.InsertOneAsync(reg2);
            var repo = new BookRepository();
            var books = await repo.GetBookByPublisher("FIFA");
            Assert.IsTrue(books.Count > 1);
            books = await repo.GetBookByPublisher("FI");
            Assert.IsTrue(books.Count > 1);
            books = await repo.GetBookByPublisher("FA");
            Assert.IsTrue(books.Count > 1);
            books = await repo.GetBookByPublisher("NONE");
            Assert.IsTrue(books.Count == 0);
            await _context.Books.DeleteOneAsync(Builders<Book>.Filter.Eq("_id", reg1._Id));
            await _context.Books.DeleteOneAsync(Builders<Book>.Filter.Eq("_id", reg2._Id));
        }
        [TestMethod]
        public async Task GetBookById()
        {
            _context = new DbContext();
            string[] autors = new string[3];
            autors[0] = "Josep Guardiola";
            autors[1] = "José Mourinho";
            autors[2] = "Diego Simeone";
            Book reg1 = new Book() { Authors = autors, Description = "DESC FIRST BOOK", Title = "The Bigs Trainers", Publisher = "FIFA" };
            await _context.Books.InsertOneAsync(reg1);
            var repo = new BookRepository();
            var book = await repo.GetBookById(reg1._Id.ToString());
            Assert.IsTrue(book != null);
            await _context.Books.DeleteOneAsync(Builders<Book>.Filter.Eq("_id", reg1._Id));
        }
    }
}
