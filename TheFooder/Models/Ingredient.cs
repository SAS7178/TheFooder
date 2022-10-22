using System.ComponentModel.DataAnnotations;
using TheFooder.Models;
namespace TheFooder.Models
{
    public class Ingredient
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

    }
}
