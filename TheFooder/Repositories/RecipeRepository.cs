using Azure;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using TheFooder.Models;
using TheFooder.Utils;

namespace TheFooder.Repositories
{
    public class RecipeRepository : BaseRepository, IRecipeRepository
    {
        public RecipeRepository(IConfiguration configuration) : base(configuration) { }

        //public List<Recipe> GetAll()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"SELECT r.id, r.name, r.instructions, r.createdDateTime, r.imageUrl, r.videoUrl,i.id as IngredientId,i.name AS IngredientName
        //                                  FROM Recipe r
        //                                  Left Join recipeIngredients ri On ri.recipeId = r.id
        //                                  Left Join Ingredient i On i.id = ri.ingredientId
        //                              ORDER BY name";
        //            var reader = cmd.ExecuteReader();

        //            var recipes = new List<Recipe>();

        //            var ingredients = new List<Recipe>();
        //            while (reader.Read())
        //            {
        //                recipes.Add(new Recipe()
        //                {
        //                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //                    Name = reader.GetString(reader.GetOrdinal("name")),
        //                    Instructions = reader.GetString(reader.GetOrdinal("instructions")),
        //                    CreatedDateTime = DbUtils.GetDateTime(reader, "createdDateTime"),
        //                    ImageUrl = reader.GetString(reader.GetOrdinal("imageUrl")),
        //                    VideoUrl = reader.GetString(reader.GetOrdinal("videoUrl")),
        //                    Ingredients = new List<Ingredient>() 
        //                });
        //            }
        //            reader.Close();
        //            return recipes;
        //        }
        //    }
        //}
        public List<Recipe> GetAllWithIngredients()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT r.id as RecipeId, r.name, r.instructions, r.createdDateTime, r.imageUrl, r.videoUrl,i.id as IngredientId,i.name AS IngredientName
                                          FROM Recipe r
                                          Left Join recipeIngredients ri On ri.recipeId = r.id
                                          Left Join Ingredient i On i.id = ri.ingredientId
                                      ORDER BY name";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var recipes = new List<Recipe>();
                        while (reader.Read())
                        {
                            var recipeId = DbUtils.GetInt(reader, "RecipeId");
                            var existingRecipe = recipes.FirstOrDefault(r => r.Id == recipeId);

                            if (existingRecipe == null)
                            {
                                existingRecipe = new Recipe()
                                {
                                       Id = reader.GetInt32(reader.GetOrdinal("RecipeId")),
                                       Name = reader.GetString(reader.GetOrdinal("name")),
                                       Instructions = reader.GetString(reader.GetOrdinal("instructions")),
                                       CreatedDateTime = DbUtils.GetDateTime(reader, "createdDateTime"),
                                       ImageUrl = reader.GetString(reader.GetOrdinal("imageUrl")),
                                       VideoUrl = reader.GetString(reader.GetOrdinal("videoUrl")),
                                       Ingredients = new List<Ingredient>()
                                };

                                recipes.Add(existingRecipe);
                            }

                            if (DbUtils.IsNotDbNull(reader, "IngredientId"))
                            {
                                existingRecipe.Ingredients.Add(new Ingredient()
                                {
                                    Id = DbUtils.GetInt(reader, "IngredientId"),
                                    Name = DbUtils.GetString(reader, "IngredientName"),
                                });
                            }
                        }

                        return recipes;
                    }
                }
            }
        }
        public void Add(Recipe recipe)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Recipe (Name, UserProfileId, Instructions, CreatedDateTime, ImageUrl, VideoUrl, Ingredients)
                        OUTPUT INSERTED.ID
                        VALUES (@Name,@UserProfileId, @Instructions, GETDATE(), @ImageUrl, @VideoUrl, @Ingredients)";

                    DbUtils.AddParameter(cmd, "@Name", recipe.Name);
                    DbUtils.AddParameter(cmd, "@UserProfileId", recipe.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Instructions", recipe.Instructions);
                    DbUtils.AddParameter(cmd, "@ImageUrl", recipe.ImageUrl);
                    DbUtils.AddParameter(cmd, "@VideoUrl", recipe.VideoUrl);
                    DbUtils.AddParameter(cmd, "@Ingredients", recipe.Ingredients);
                    recipe.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Recipe recipe)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Recipe
                           SET Name = @Name,
                               Instructions = @Instructions,
                               ImageUrl = @ImageUrl,
                               VideoUrl = @VideoUrl
                         WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", recipe.Id);
                    cmd.Parameters.AddWithValue("@name", recipe.Name);
                    cmd.Parameters.AddWithValue("@Instructions", recipe.Instructions);
                    cmd.Parameters.AddWithValue("@ImageUrl", recipe.ImageUrl);
                    cmd.Parameters.AddWithValue("@VideoUrl", recipe.VideoUrl);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Recipe WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
