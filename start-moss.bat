@echo off
chcp 65001 >nul
cd /d D:\Projects\网站\moss
echo.
echo  ==========================================
echo     Moss 正在生长 ... 稍后自动打开浏览器
echo     关闭这个窗口 = 关掉网站
echo  ==========================================
echo.
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3099"
npx next dev --port 3099
