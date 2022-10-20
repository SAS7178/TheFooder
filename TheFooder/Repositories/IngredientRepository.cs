using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using TheFooder.Models;
using TheFooder.Utils;

namespace TheFooder.Repositories
{
    public class IngredientRepository : BaseRepository, IIngredientRepository
    {
        public IngredientRepository(IConfiguration configuration) : base(configuration) { }

        public List<Ingredient> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, name 
                                          FROM Ingredient
                                      ORDER BY name";
                    var reader = cmd.ExecuteReader();

                    var ingredients = new List<Ingredient>();

                    while (reader.Read())
                    {
                        ingredients.Add(new Ingredient()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                        });
                    }

                    reader.Close();

                    return ingredients;
                }
            }
        }
        public void Add(Ingredient ingredient)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Ingredient (Name)
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";
                    cmd.Parameters.AddWithValue("@Name", ingredient.Name);
                    ingredient.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Ingredient ingredient)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ingredient
                           SET [Name] = @name
                         WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@name", ingredient.Name);
                    cmd.Parameters.AddWithValue("@id", ingredient.Id);
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
                    cmd.CommandText = "DELETE FROM Ingredient WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
