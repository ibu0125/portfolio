using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using backendApp.Models;
using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using DotNetEnv;

namespace backendApp.Controllers {
    [ApiController]
    [Route("api/[Controller]")]
    public class AdominController : ControllerBase {
        private readonly string connectionString;
        public AdominController() {
            connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING")
                ?? throw new InvalidOperationException("DB_CONNECTION_STRING環境変数が設定されていません。");
        }


        [HttpPost("login")]
        public IActionResult AdominLogin([FromBody] UserInformation adomin) {
            if(string.IsNullOrEmpty(adomin.UserName) || string.IsNullOrEmpty(adomin.Password)) {
                return BadRequest(new
                {
                    message = "ユーザー名またはパスワードが入力されていません"
                });
            }

            using MySqlConnection connection = new MySqlConnection(connectionString);

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
                                var token = GenerateJwtToken(adomin.UserName);
                                return Ok(new
                                {
                                    token
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

        private string GenerateJwtToken(string username) {
            var secretKey = Environment.GetEnvironmentVariable("SECRET_KEY");

            if(string.IsNullOrEmpty(secretKey)) {
                throw new InvalidOperationException("SECRET_KEY環境変数が設定されていません。");
            }

            // 秘密鍵を生成
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub,username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: "http://localhost:5165/api/adomin/login",
                audience: "http://localhost:3001/",
                claims: claims,
                expires: DateTime.UtcNow.AddSeconds(3),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        // パスワードをSHA256でハッシュ化するメソッド
        private string HashPassword(string? password) { // ここでnullableを受け入れる
            if(string.IsNullOrEmpty(password)) {
                throw new ArgumentNullException(nameof(password), "パスワードが指定されていません");
            }
            using(SHA256 sha256 = SHA256.Create()) {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password)); // ここでnullを防ぐ
                StringBuilder builder = new StringBuilder();
                for(int i = 0; i < bytes.Length; i++) {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

    }
}
