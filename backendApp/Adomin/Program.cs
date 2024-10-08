using backendApp.Models; // UserInfo ���f���̖��O��Ԃ��C���|�[�g
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);
Env.Load();

var secretKey = Environment.GetEnvironmentVariable("SECRET_KEY");
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

if(string.IsNullOrEmpty(secretKey)) {
    throw new InvalidOperationException("SECRET_KEY���ϐ����ݒ肳��Ă��܂���B");
}

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "http://localhost:5165", // ���s��URL
        ValidAudience = "http://localhost:3001", // ��M��URL
    };
});

// CORS�̐ݒ��ǉ�
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()   // ���ׂẴI���W��������
               .AllowAnyMethod()   // �C�ӂ�HTTP���\�b�h������
               .AllowAnyHeader();  // �C�ӂ̃w�b�_�[������
    });
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null; // JSON�̃v���p�e�B�������̂܂܂ɂ���
});

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

// CORS���g�p����
app.UseCors("AllowAllOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
