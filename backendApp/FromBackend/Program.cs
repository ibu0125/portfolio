using FromBackend.Models; // UserInfo モデルの名前空間をインポート
using Microsoft.EntityFrameworkCore;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 環境変数からの設定
var secretKey = Environment.GetEnvironmentVariable("SECRET_KEY");
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
// CORSの設定を追加
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()   // 開発環境ではすべてのオリジンを許可
               .AllowAnyMethod()   // 任意のHTTPメソッドを許可
               .AllowAnyHeader();  // 任意のヘッダーを許可
    });
});

// JSONの設定
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null; // JSONのプロパティ名をそのままにする
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

// HTTPリクエストパイプラインの設定
if(!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// CORSを使用する
app.UseCors("AllowAllOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
