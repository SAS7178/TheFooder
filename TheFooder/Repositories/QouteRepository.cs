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
    public class QouteRepository : BaseRepository, IQouteRepository
    {
        public QouteRepository(IConfiguration configuration) : base(configuration) { }


        public void Add(Qoute qoute)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Qoute (Text, Author)
                        OUTPUT INSERTED.ID
                        VALUES (@Text,@Author)";

                    DbUtils.AddParameter(cmd, "@Text", qoute.Text);
                    DbUtils.AddParameter(cmd, "@Author", qoute.Author);
                    qoute.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public Qoute GetQouteById(int qouteId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Text, Author
                                          FROM Qoute
                                           WHERE Id = @id;";
                    cmd.Parameters.AddWithValue("@id", qouteId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var qoute = new Qoute();
                        while (reader.Read())
                        {
                            qoute = new Qoute()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Text = reader.GetString(reader.GetOrdinal("Text")),
                                Author = reader.GetString(reader.GetOrdinal("Author")),
                            };
                        }

                        return qoute;
                    }
                }
            }
        }
    }
}
