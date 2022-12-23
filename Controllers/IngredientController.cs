using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheFooder.Models;
using TheFooder.Repositories;

namespace TheFooder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientRepository _ingredientRepository;
        public IngredientController(IIngredientRepository IngredientRepository)
        {
            _ingredientRepository = IngredientRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ingredientRepository.GetAll());
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(Ingredient ingredient)
        {
            _ingredientRepository.Add(ingredient);
            return CreatedAtAction("Get", new { id = ingredient.Id }, ingredient);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Ingredient ingredient)    
        {
                ingredient.Id = id;
                _ingredientRepository.Update(ingredient);
                return NoContent();
        }
        

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _ingredientRepository.Delete(id);
            return NoContent();
        }
    }
}
