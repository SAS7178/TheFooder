using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheFooder.Models;
using TheFooder.Repositories;

namespace TheFooder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepository;
        public RecipeController(IRecipeRepository RecipeRepository)
        {
            _recipeRepository = RecipeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_recipeRepository.GetAllWithIngredients());
        }
        // 
        [HttpGet("{userId}")]
        public IActionResult Get(int id)
        {
            return Ok(_recipeRepository.GetAllByUserId(id));

        }

        //[Authorize]
        [HttpPost]
        public IActionResult Post(Recipe recipe)
        {
            _recipeRepository.Add(recipe);
            return CreatedAtAction("Get", new { id = recipe.Id }, recipe);
        }

        //[Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Recipe recipe)
        {
            recipe.Id = id;
            _recipeRepository.Update(recipe);
            return NoContent();
        }


        //[Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _recipeRepository.Delete(id);
            return NoContent();
        }
    }
}
