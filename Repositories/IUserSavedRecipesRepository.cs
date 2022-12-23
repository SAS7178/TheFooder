using Azure;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.PortableExecutable;
using TheFooder.Models;
using TheFooder.Utils;

namespace TheFooder.Repositories
{
    public interface IUserSavedRecipesRepository
    {
                //Join table savedRecipes methods below
        void AddSavedRecipe(SavedUserRecipe savedUserRecipe);
        void DeleteSavedRecipe(int id);
        List<SavedUserRecipe> GetAllSavedUserRecipes();
    }
}