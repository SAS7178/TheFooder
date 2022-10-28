using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheFooder.Models;
using TheFooder.Repositories;
using System.Collections.Generic;

namespace TheFooder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedUserRecipeController : ControllerBase

    {
        private readonly IUserSavedRecipesRepository _userSavedRecipeRepository;
        public SavedUserRecipeController(IUserSavedRecipesRepository UserSavedRecipesRepository)
        {
            _userSavedRecipeRepository = UserSavedRecipesRepository;
        }
        // get all savedUserRecipe join table objects 
        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            return Ok(_userSavedRecipeRepository.GetAllSavedUserRecipes());

        }
        //endpoint to add a savedUserRecipe obj
        [Authorize]
        [HttpPost]
        public IActionResult Post(SavedUserRecipe savedUserRecipe)
        {
            _userSavedRecipeRepository.AddSavedRecipe(savedUserRecipe);
            return CreatedAtAction("Get", new { id = savedUserRecipe.Id }, savedUserRecipe);
        }
        //endpoint to delete a savedUserRecipe obj
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userSavedRecipeRepository.DeleteSavedRecipe(id);
            return NoContent();
        }
    }
}
