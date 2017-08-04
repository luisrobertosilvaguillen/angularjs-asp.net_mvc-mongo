using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using System.Security.Claims;
using AspNet.Identity.MongoDB;

namespace Crossover_Evaluation.Bussines.Models
{
    public class User : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager, string authenticationType)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            return userIdentity;
        }
    }
}
