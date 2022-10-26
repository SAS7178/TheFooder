using System.Collections.Generic;
using TheFooder.Models;

namespace TheFooder.Repositories
{
    public interface IRecipeRepository
    {
        List<Recipe> GetAllWithIngredients();
        Recipe GetRecipeById(int recipeId);
        void AddSavedRecipe(savedUserRecipe savedUserRecipe);
        void DeleteSavedRecipe(int id);
        void Add(Recipe recipe);
        void Delete(int id);
        void Update(Recipe recipe);
        public List<Recipe> GetAllByUserId(int id);
    }
}