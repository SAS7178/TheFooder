using System.Collections.Generic;
using TheFooder.Models;

namespace TheFooder.Repositories
{
    public interface IRecipeRepository
    {
        List<Recipe> GetAllWithIngredients();
        void Add(Recipe recipe);
        void Delete(int id);
        void Update(Recipe recipe);
    }
}