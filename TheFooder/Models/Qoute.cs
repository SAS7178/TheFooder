using System.ComponentModel.DataAnnotations;

namespace TheFooder.Models
{
    public class Qoute
    {
        public int Id { get; set; }
       
        public string Text { get; set; }

        public string Author { get; set; }
    }
}
