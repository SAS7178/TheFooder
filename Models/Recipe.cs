using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TheFooder.Models;

namespace TheFooder.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public int UserProfileId { get; set; }

        public string Instructions { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public string ImageUrl { get; set; }

        public string VideoUrl { get; set; }

        public List<Ingredient> Ingredients { get; set; }

    }
}
