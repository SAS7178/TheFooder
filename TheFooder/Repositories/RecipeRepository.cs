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
    public class RecipeRepository : BaseRepository, IRecipeRepository
    {
        public RecipeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Recipe> GetAllWithIngredients()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT r.id as RecipeId, r.name, r.instructions, r.UserProfileId,
                                            r.createdDateTime, r.imageUrl, r.videoUrl,i.id as IngredientId,i.name AS IngredientName
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
                                       UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
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
        public List<Recipe> GetAllByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT r.id as RecipeId,up.Id as userProfileId, r.name, r.instructions, r.createdDateTime, r.imageUrl, r.videoUrl,i.id as IngredientId,i.name AS IngredientName
                                          FROM Recipe r
                                          Left Join UserProfile up On up.Id = r.UserProfileId
                                          Left Join recipeIngredients ri On ri.recipeId = r.id
                                          Left Join Ingredient i On i.id = ri.ingredientId
                                           WHERE up.Id = @id
                                          ORDER BY name";
                    cmd.Parameters.AddWithValue("@id", id);
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
        public Recipe GetRecipeById(int recipeId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT r.id as RecipeId,up.Id as userProfileId, r.name, r.instructions, r.createdDateTime, r.imageUrl, r.videoUrl,i.id as IngredientId,i.name AS IngredientName
                                          FROM Recipe r
                                          Left Join UserProfile up On up.Id = r.UserProfileId
                                          Left Join recipeIngredients ri On ri.recipeId = r.id
                                          Left Join Ingredient i On i.id = ri.ingredientId
                                           WHERE up.Id = @id
                                          ORDER BY name";
                    cmd.Parameters.AddWithValue("@id", recipeId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var recipe = new Recipe();
                        while (reader.Read())
                        {
                                recipe = new Recipe()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("RecipeId")),
                                    Name = reader.GetString(reader.GetOrdinal("name")),
                                    Instructions = reader.GetString(reader.GetOrdinal("instructions")),
                                    CreatedDateTime = DbUtils.GetDateTime(reader, "createdDateTime"),
                                    ImageUrl = reader.GetString(reader.GetOrdinal("imageUrl")),
                                    VideoUrl = reader.GetString(reader.GetOrdinal("videoUrl")),
                                    Ingredients = new List<Ingredient>()
                                };

                            if (DbUtils.IsNotDbNull(reader, "IngredientId"))
                            {
                                recipe.Ingredients.Add(new Ingredient()
                                {
                                    Id = DbUtils.GetInt(reader, "IngredientId"),
                                    Name = DbUtils.GetString(reader, "IngredientName"),
                                });
                            }
                        }

                        return recipe;
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
                        INSERT INTO Recipe (Name, UserProfileId, Instructions, CreatedDateTime, ImageUrl, VideoUrl)
                        OUTPUT INSERTED.ID
                        VALUES (@Name,@UserProfileId, @Instructions, GETDATE(), @ImageUrl, @VideoUrl)";
                    
                    DbUtils.AddParameter(cmd, "@Name", recipe.Name);
                    DbUtils.AddParameter(cmd, "@UserProfileId", recipe.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Instructions", recipe.Instructions);
                    DbUtils.AddParameter(cmd, "@ImageUrl", recipe.ImageUrl);
                    DbUtils.AddParameter(cmd, "@VideoUrl", recipe.VideoUrl);
                    recipe.Id = (int)cmd.ExecuteScalar();
                    AddSavedIngredients(recipe.Id, recipe.Ingredients);
                }
            }
        }
        public void AddSavedRecipe(savedUserRecipe savedUserRecipe)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO SavedRecipe (RecipeId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@RecipeId,@UserProfileId)";

                    DbUtils.AddParameter(cmd, "@RecipeId", savedUserRecipe.RecipeId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", savedUserRecipe.UserProfileId);
                    savedUserRecipe.Id = (int)cmd.ExecuteScalar();
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

        public void AddSavedIngredients( int recipeId, List<Ingredient> Ingredients)
        {
                    foreach (var ingredient in Ingredients)
                    {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                        cmd.CommandText = @"
                        INSERT INTO savedUserRecipes (recipeId, ingredientId)
                        VALUES (@RecipeId, @ingredientId)";

                        DbUtils.AddParameter(cmd, "@RecipeId", recipeId);
                        DbUtils.AddParameter(cmd, "@ingredientId", ingredient.Id);
                        cmd.ExecuteNonQuery();
                    }
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
                    cmd.CommandText = "DELETE FROM savedUserRecipes WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
