using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Crossover_Evaluation.Bussines.Models;
using Crossover_Evaluation.Bussines.Repositories;
using Crossover_Evaluation.Bussines.Interfaces;
using System;
using System.Collections.Generic;

namespace Crossover_Evaluation.WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/book")]
    [Authorize]
    public class BookController : BaseApiController
    {
        private IBookRepository _BookRepository;
        private IDemandRepository _DemandRepository;
        [Route("get/{publisher?}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetBooks(string publisher = null)
        {
            try
            {
                IList<Book> books = null;
                _BookRepository = new BookRepository();
                if (!string.IsNullOrEmpty(publisher))
                {
                    books = await _BookRepository.GetBookByPublisher(publisher);
                }
                else
                {
                    books = await _BookRepository.GetAllBooks();
                }
                return Ok(books);
            }
            catch (Exception e)
            {
                return BadRequest("Error: " + e.Message);
            }

        }
        [Route("getbyid/{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetBookById(string id)
        {
            try
            {
                _BookRepository = new BookRepository();
                _DemandRepository = new DemandRepository();
                Book book = await _BookRepository.GetBookById(id);
                User user = await this.AppUserManager.FindByNameAsync(User.Identity.Name);
                if(await _DemandRepository.CheckDemandExist(user, book) == null)
                {
                    await _DemandRepository.AddDemand(new Demand() { Book = book, User = user });
                }
                return Ok(book);
            }
            catch (Exception e)
            {
                return BadRequest("Error: " + e.Message);
            }

        }
    }
}
