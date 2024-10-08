using FromBackend.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace FormBackend.Controllers {
    [ApiController]
    [Route("api/[Controller]")]
    public class FormListController : ControllerBase {
        private readonly string connectionString = "server=localhost;database=UserInformationDb;user=root;password=Ibuki0606#;";
        public FormListController() {
            connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING")
                ?? throw new InvalidOperationException("DB_CONNECTION_STRING環境変数が設定されていません。");
        }
        [HttpPost("post")]
        public IActionResult FormList([FromBody] FormData data) {
            if(data == null) {
                return BadRequest(new
                {
                    message = "Invalid data."
                });
            }

            using MySqlConnection connection = new MySqlConnection(connectionString);
            try {
                connection.Open();
                string postQuery = "INSERT INTO UserInfo (Name, Email, Message) VALUES (@Name, @Email, @Message)";
                using MySqlCommand command = new MySqlCommand(postQuery, connection)
                {
                    Parameters =
                    {
                        new MySqlParameter("@Name", data.Name),
                        new MySqlParameter("@Email", data.Email),
                        new MySqlParameter("@Message", data.Message)
                    }
                };
                command.ExecuteNonQuery();
                return Ok(new
                {
                    message = "Data saved successfully."
                });
            }
            catch(Exception ex) {
                return StatusCode(500, new
                {
                    message = "Error saving data: " + ex.Message
                });
            }
        }

        [HttpGet("get")]
        public IActionResult DataGet() {
            using MySqlConnection connection = new MySqlConnection(connectionString);
            try {
                connection.Open();
                string getQuery = "SELECT Name, Email, Message FROM UserInfo";
                using MySqlCommand command = new MySqlCommand(getQuery, connection);
                using MySqlDataReader reader = command.ExecuteReader();
                List<FormData> dataList = new List<FormData>();

                while(reader.Read()) {
                    var data = new FormData
                    {
                        Name = reader.IsDBNull(0) ? null : reader.GetString("Name"),
                        Email = reader.IsDBNull(1) ? null : reader.GetString("Email"),
                        Message = reader.IsDBNull(2) ? null : reader.GetString("Message"),
                    };

                    // データがNULLでないことを確認
                    if(data.Name != null || data.Email != null || data.Message != null) {
                        dataList.Add(data);
                    }
                    else {
                        // NULLのデータについてログを記録
                        Console.WriteLine("NULL Data Found: " + data.ToString());
                    }
                }

                if(dataList.Count == 0) {
                    return NotFound(new
                    {
                        message = "No data found."
                    });
                }

                return Ok(dataList);
            }
            catch(MySqlException sqlEx) {
                Console.WriteLine("MySQL Error: " + sqlEx.Message); // エラーログ
                return StatusCode(500, new
                {
                    message = "MySQL error: " + sqlEx.Message
                });
            }
            catch(Exception ex) {
                Console.WriteLine("General Error: " + ex.Message); // エラーログ
                return StatusCode(500, new
                {
                    message = "Error retrieving data: " + ex.Message
                });
            }
        }

    }
}
