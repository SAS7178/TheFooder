using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheFooder.Models;
using TheFooder.Repositories;
using System.Collections.Generic;
using System.Net;

namespace TheFooder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public UserProfile Authentication { get; private set; }

        public RecipeController(IRecipeRepository RecipeRepository, IUserProfileRepository userProfileRepository)
        {
            _recipeRepository = RecipeRepository;
            _userProfileRepository = userProfileRepository;
        }

        //get all recipes with their ingredients
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_recipeRepository.GetAllWithIngredients());
        }

        // gets all recipes created by user
        [Authorize]
        [HttpGet("{userId}")]
        public IActionResult Get(int id)
        {
            return Ok(_recipeRepository.GetAllByUserId(id));
        }

        //get single recipe by its id for edit component
        [Authorize]
        [HttpGet("/EditRecipe/{recipeId}")]
        public IActionResult GetRecipe(int recipeId)
        {
            return Ok(_recipeRepository.GetRecipeById(recipeId));

        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(Recipe recipe)
        {
            _recipeRepository.Add(recipe);
            return CreatedAtAction("Get", new { id = recipe.Id }, recipe);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Recipe recipe)
        {
            recipe.Id = id;
            _recipeRepository.Update(recipe);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _recipeRepository.Delete(id);
            return NoContent();
        }
    }
}
