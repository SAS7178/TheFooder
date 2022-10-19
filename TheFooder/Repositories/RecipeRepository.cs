using Azure;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using TheFooder.Models;
using TheFooder.Utils;

namespace TheFooder.Repositories
{
    public class RecipeRepository : BaseRepository, IRecipeRepository
    {
        public RecipeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Recipe> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, name, instructions, createdDateTime, imageUrl, videoUrl
                                          FROM Recipe
                                      ORDER BY name";
                    var reader = cmd.ExecuteReader();

                    var recipes = new List<Recipe>();

                    while (reader.Read())
                    {
                        recipes.Add(new Recipe()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                            Instructions = reader.GetString(reader.GetOrdinal("instructions")),
                            CreatedDateTime = DbUtils.GetDateTime(reader, "createdDateTime"),
                            ImageUrl = reader.GetString(reader.GetOrdinal("imageUrl")),
                            VideoUrl = reader.GetString(reader.GetOrdinal("videoUrl")),
                        });
                    }

                    reader.Close();
                    return recipes;
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
                        INSERT INTO Recipe (name, userProfileId, instructions, createdDateTime, imageUrl, videoUrl)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @instructions, @userProfileId, @createdDateTime, @imageUrl, @videoUrl)";
                    
                  
                    recipe.Id = (int)cmd.ExecuteScalar();
                    DbUtils.AddParameter(cmd, "@name", recipe.Name);
                    DbUtils.AddParameter(cmd, "@userProfileId", recipe.UserProfileId);
                    DbUtils.AddParameter(cmd, "@instructions", recipe.Instructions);
                    DbUtils.AddParameter(cmd, "@createdDateTime", recipe.CreatedDateTime);
                    DbUtils.AddParameter(cmd, "@imageUrl", recipe.ImageUrl);
                    DbUtils.AddParameter(cmd, "@videoUrl", recipe.VideoUrl);
        
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
                               Email = @Email,
                               CreatedDateTime = @createdDateTime,
                               ImageUrl = @ImageUrl
                         WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@name", recipe.Name);
                    cmd.Parameters.AddWithValue("@id", recipe.Id);

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
