﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TheFooder.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        public string FirebaseUserId { get; set; }
    }
}
