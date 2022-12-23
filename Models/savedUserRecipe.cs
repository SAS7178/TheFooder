using System.ComponentModel.DataAnnotations;
using TheFooder.Models;

namespace TheFooder.Models
{
    public class SavedUserRecipe
    {
        public int Id { get; set; }
        [Required]
        public int RecipeId { get; set; }
        [Required]
        public int UserProfileId { get; set; }
    }
}
