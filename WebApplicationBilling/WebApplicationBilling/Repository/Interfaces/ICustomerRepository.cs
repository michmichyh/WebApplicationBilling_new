using WebApplicationBilling.Models.DTO;

namespace WebApplicationBilling.Repository.Interfaces
{
    public interface ICustomerRepository : IRepository<Models.DTO.CustomerDTO>
    {
        Task<CustomerDTO> GetByIdAsync(string v1, int v2);
    }
}
