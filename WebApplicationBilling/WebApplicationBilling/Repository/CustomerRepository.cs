using WebApplicationBilling.Models.DTO;
using WebApplicationBilling.Repository.Interfaces;

namespace WebApplicationBilling.Repository
{
    public class CustomerRepository : Repository<CustomerDTO>, ICustomerRepository
    {
        public CustomerRepository(IHttpClientFactory httpClientFactory) 
            : base(httpClientFactory)
        {

        }

        public Task<CustomerDTO> GetByIdAsync(string v1, int v2)
        {
            throw new NotImplementedException();
        }
    }
}
