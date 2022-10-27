using System.Collections.Generic;
using System.Threading.Tasks.Dataflow;
using TheFooder.Models;

namespace TheFooder.Repositories
{
    public interface IRecipeRepository
    {
        //Recipe table methods
        List<Recipe> GetAllWithIngredients();
        public List<Recipe> GetAllByUserId(int id);
        void Add(Recipe recipe);
        void Update(Recipe recipe);
        void Delete(int id);
        //dereks method choices
        Recipe GetRecipeById(int recipeId);
    }
}