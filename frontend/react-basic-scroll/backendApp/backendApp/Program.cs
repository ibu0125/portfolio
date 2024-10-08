using backendApp.Models; // UserInfo モデルの名前空間をインポート
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// CORSの設定を追加
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:3001", "http://localhost:3002", "http://localhost:3000") // フロントエンドのURLを指定
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// MySQL データベースの設定
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 21)))); // 環境変数または設定ファイルから接続文字列を取得

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if(!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// CORSを使用する
app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
