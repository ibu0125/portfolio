using Microsoft.AspNetCore.Mvc;
using backendApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace backendApp.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class FormController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public FormController(ApplicationDbContext context) {
            _context = context; // コンストラクタでContextを初期化
        }

        [HttpPost("submit")]
        public async Task<IActionResult> Submit([FromBody] Infomation user) {
            Console.WriteLine($"Name: {user.Name}, Email: {user.Email}, Message: {user.Message}");

            try {
                await _context.UserInfo.AddAsync(user); // ここでの user は Infomation 型でなければならない
                await _context.SaveChangesAsync(); // 変更をデータベースに保存
                return Ok(new
                {
                    message = "送信しました"
                });
            }
            catch(Exception ex) {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, new
                {
                    message = ex.Message
                });
            }
        }
        [HttpGet("contacts")]
        public async Task<IActionResult> GetContacts() {
            try {
                var contacts = await _context.UserInfo.ToListAsync();
                return Ok(contacts);
            }
            catch(Exception ex) {
                Console.WriteLine($"Error fetching contacts: {ex.Message}");
                return StatusCode(500, new
                {
                    message = "データ取得中にエラーが発生しました"
                });
            }
        }
    }
}
