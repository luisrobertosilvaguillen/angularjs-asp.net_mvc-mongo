using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using Crossover_Evaluation.Bussines.Repositories;
using Crossover_Evaluation.Bussines.Contexts;
using Crossover_Evaluation.Bussines.Models;
using MongoDB.Driver;
using AspNet.Identity.MongoDB;
namespace Crossover_Evaluation.Bussines.Test
{
    [TestClass]
    public class DemandRepositoryTest
    {
        DbContext _context;
        [TestMethod]
        public async Task TestAllTask_DemandRepository()
        {
            _context = new DbContext();
            //CREATE DEMAND
            User user = new User() { UserName = "User_Test" };
            string[] autors = new string[3];
            autors[0] = "Josep Guardiola";
            autors[1] = "José Mourinho";
            autors[2] = "Diego Simeone";
            Book book = new Book() { Authors = autors, Description = "DESC FIRST BOOK", Title = "The Bigs Trainers", Publisher = "FIFA" };
            var repo = new DemandRepository();
            var demand = await repo.AddDemand(new Demand() { User = user, Book = book,  });
            Assert.IsTrue(demand._Id.ToString().Length > 0);

            //FIND DEMANDS BY USER
            var demmandFromDb = await repo.GetDemandByUser(user.UserName);
            Assert.IsTrue(demmandFromDb.Count > 0);
            Assert.AreEqual("User_Test", demmandFromDb[0].User.UserName);

            //CHECK IF DEMAND EXIST
            var chekdemand = await repo.CheckDemandExist(user, book);
            Assert.IsTrue(chekdemand != null);

            await _context.Demands.DeleteOneAsync(Builders<Demand>.Filter.Eq("_id", demand._Id));
        }
    }
}
