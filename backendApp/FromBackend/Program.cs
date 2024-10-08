using FromBackend.Models; // UserInfo ���f���̖��O��Ԃ��C���|�[�g
using Microsoft.EntityFrameworkCore;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ���ϐ�����̐ݒ�
var secretKey = Environment.GetEnvironmentVariable("SECRET_KEY");
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
// CORS�̐ݒ��ǉ�
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()   // �J�����ł͂��ׂẴI���W��������
               .AllowAnyMethod()   // �C�ӂ�HTTP���\�b�h������
               .AllowAnyHeader();  // �C�ӂ̃w�b�_�[������
    });
});

// JSON�̐ݒ�
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null; // JSON�̃v���p�e�B�������̂܂܂ɂ���
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

// HTTP���N�G�X�g�p�C�v���C���̐ݒ�
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
