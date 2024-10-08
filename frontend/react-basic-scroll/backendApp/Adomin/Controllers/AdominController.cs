using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using backendApp.Models;
using System.Security.Cryptography;
using System.Text;

namespace backendApp.Controllers {
    [ApiController]
    [Route("api/[Controller]")]
    public class AdominController : ControllerBase {
        private readonly string ConnectionStringSettings = "Server=localhost;Database=UserInformationDb;User=root;Password=Ibuki0606#;";

        [HttpPost("login")]
        public IActionResult AdominLogin([FromBody] UserInformation adomin) {
            if(string.IsNullOrEmpty(adomin.UserName) || string.IsNullOrEmpty(adomin.Password)) {
                return BadRequest(new
                {
                    message = "ユーザー名またはパスワードが入力されていません"
                });
            }

            using MySqlConnection connection = new MySqlConnection(ConnectionStringSettings);

            try {
                connection.Open();

                // ユーザー名に基づいてパスワードを取得するクエリ
                string selectQuery = "SELECT Password FROM AdominInformation WHERE UserName = @UserName";
                using(MySqlCommand cmd = new MySqlCommand(selectQuery, connection)) {
                    cmd.Parameters.AddWithValue("@UserName", adomin.UserName);

                    using(MySqlDataReader reader = cmd.ExecuteReader()) {
                        if(reader.Read()) {
                            // データベースから取得したパスワード
                            var storedPassword = reader["Password"].ToString();

                            // 送信されたパスワードをハッシュ化して比較
                            var hashedPassword = HashPassword(adomin.Password);
                            Console.WriteLine($"送信されたハッシュ化パスワード: {hashedPassword}"); // デバッグ用ログ
                            Console.WriteLine($"データベースのハッシュ化パスワード: {storedPassword}"); // デバッグ用ログ

                            if(storedPassword == hashedPassword) {
                                return Ok(new
                                {
                                    message = "ログインしました"
                                });
                            }
                            else {
                                return Unauthorized(new
                                {
                                    message = "パスワードが違います"
                                });
                            }
                        }
                        else {
                            return Unauthorized(new
                            {
                                message = "ユーザー名が違います"
                            });
                        }
                    }
                }
            }
            catch(Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }

        // パスワードをSHA256でハッシュ化するメソッド
        private string HashPassword(string password) {
            if(string.IsNullOrEmpty(password)) {
                throw new ArgumentNullException(nameof(password), "パスワードが指定されていません");
            }
            using(SHA256 sha256 = SHA256.Create()) {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                for(int i = 0; i < bytes.Length; i++) {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
