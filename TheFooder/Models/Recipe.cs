using System;
using System.ComponentModel.DataAnnotations;

namespace TheFooder.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public int UserProfileId { get; set; }

        public string Instructions { get; set; }

        public DateTime DateCreated { get; set; }

        public string ImageUrl { get; set; }

        public string VideoUrl { get; set; }
    }
}
