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
    public class UserSavedRecipesRepository : BaseRepository, IUserSavedRecipesRepository
    {
        public UserSavedRecipesRepository(IConfiguration configuration) : base(configuration) { }
        public List<SavedUserRecipe> GetAllSavedUserRecipes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, recipeId, userProfileId
                                          FROM savedUserRecipes";
                    var reader = cmd.ExecuteReader();

                    var savedUserRecipes = new List<SavedUserRecipe>();

                    while (reader.Read())
                    {
                        savedUserRecipes.Add(new SavedUserRecipe()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            RecipeId = DbUtils.GetInt(reader,("recipeId")),
                            UserProfileId = DbUtils.GetInt(reader,("userProfileId")),
                        });
                    }

                    reader.Close();

                    return savedUserRecipes;
                }
            }
        }
        public void AddSavedRecipe(SavedUserRecipe savedUserRecipe)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO savedUserRecipes (RecipeId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@RecipeId,@UserProfileId)";

                    DbUtils.AddParameter(cmd, "@RecipeId", savedUserRecipe.RecipeId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", savedUserRecipe.UserProfileId);
                    savedUserRecipe.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void DeleteSavedRecipe(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM savedUserRecipes WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
