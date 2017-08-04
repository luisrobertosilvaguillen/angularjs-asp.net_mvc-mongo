using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Crossover_Evaluation.Bussines.Models;
using Crossover_Evaluation.WebApi.Models;
namespace Crossover_Evaluation.WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/account")]
    public class AccountController : BaseApiController
    {
        [AllowAnonymous]
        [Route("create")]
        [HttpPost]
        public async Task<IHttpActionResult> Register(CreateUserBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = new User()
            {
                UserName = model.Username,
                Email = model.Email
            };
            IdentityResult addUserResult = await this.AppUserManager.CreateAsync(user, model.Password);
            if (!addUserResult.Succeeded)
            {
                return GetErrorResult(addUserResult);
            }
            return Ok(new { succes = true });
        }
        [Authorize]
        [Route("user/{username}")]
        public async Task<IHttpActionResult> GetUserByName(string username)
        {
            User user = await this.AppUserManager.FindByNameAsync(username);
            if (user != null)
            {
                return Ok(user);
            }
            return NotFound();
        }
    }
}
