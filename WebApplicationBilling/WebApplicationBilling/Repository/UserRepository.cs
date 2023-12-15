using WebApplicationBilling.Models;
using WebApplicationBilling.Models.DTO;
using WebApplicationBilling.Repository.Interfaces;

namespace WebApplicationBilling.Repository
{
    public class UserRepository : Repository<UserDTO>, IUserRepository
    {
        //Injección de dependencias se debe importar el IHttpClientFactory
        private readonly IHttpClientFactory _httpClientFactory;

        public UserRepository(IHttpClientFactory httpClientFactory)
            : base(httpClientFactory)
        {
            this._httpClientFactory = httpClientFactory;
        }


    }
}