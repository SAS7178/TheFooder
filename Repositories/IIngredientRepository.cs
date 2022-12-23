using System.Collections.Generic;
using TheFooder.Models;

namespace TheFooder.Repositories
{
    public interface IIngredientRepository
    {
        List<Ingredient> GetAll();
        void Add(Ingredient ingredient);
        void Delete(int id);
        void Update(Ingredient ingredient);
    }
}