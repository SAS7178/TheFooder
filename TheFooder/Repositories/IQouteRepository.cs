using TheFooder.Models;

namespace TheFooder.Repositories
{
    public interface IQouteRepository
    {
        void Add(Qoute qoute);
        Qoute GetQouteById(int qouteId);
    }
}