using Newtonsoft.Json;
using System.Collections;
using WebApplicationBilling.Repository.Interfaces;

namespace WebApplicationBilling.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        //Inyeccion de dependencias e inversion de control 
        private readonly IHttpClientFactory _httpClientFactory;

        public Repository(IHttpClientFactory httpClientFactory)
        {
            this._httpClientFactory = httpClientFactory;
        }
        public Task<bool> DeleteAsync(string url, int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable> GetAllAsync(string url)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            var client = _httpClientFactory.CreateClient();

            HttpResponseMessage responseMessage = client.SendAsync(request).Result;

            //validar respuesta
                if (responseMessage.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var jsonString = await responseMessage.Content.ReadAsStringAsync();

                    return JsonConvert.DeserializeObject<IEnumerable<T>>(jsonString);
                }
                else
                {
                return null;
                }
        }


        public Task<T> GetByIdAsync(string url, string id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> PostAsync(string url, T entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(string url, T entity)
        {
            throw new NotImplementedException();
        }
    }

}
