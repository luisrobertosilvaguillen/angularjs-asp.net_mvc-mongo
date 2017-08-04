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
    [RoutePrefix("api/demand")]
    [Authorize]
    public class DemandController : ApiController
    {
        private IDemandRepository _DemandRepository;
        [Route("create")]
        [HttpPost]
        public async Task<IHttpActionResult> AddDemand(Demand demand)
        {
            try
            {
                _DemandRepository = new DemandRepository();
                await _DemandRepository.AddDemand(demand);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest("Error: " + e.Message);
            }
        }
        [Route("getown")]
        [HttpGet]
        public async Task<IHttpActionResult> GetDemandByUser()
        {
            try
            {
                _DemandRepository = new DemandRepository();
                return Ok(await _DemandRepository.GetDemandByUser(User.Identity.Name));
            }
            catch (Exception e)
            {
                return BadRequest("Error: " + e.Message);
            }
        }
    }
}
