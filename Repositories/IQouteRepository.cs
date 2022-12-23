using System.Collections.Generic;
using TheFooder.Models;

namespace TheFooder.Repositories
{
    public interface IQouteRepository
    {

        List<Qoute> GetAll();
        void Add(Qoute qoute);
        Qoute GetQouteById(int qouteId);
    }
}