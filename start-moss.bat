@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  ==========================================
echo     Moss 正在生长 ... 稍后自动打开浏览器
echo     关闭这个窗口 = 关掉网站
echo  ==========================================
echo.
if not exist "node_modules\next\dist\bin\next" (
  echo 请先在项目目录运行 npm install，再双击此文件。
  pause
  exit /b 1
)
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "$previewUrl = 'http://localhost:3099/mind/shouhuxing'; for ($attempt = 0; $attempt -lt 90; $attempt++) { try { $response = Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 2; if ($response.StatusCode -eq 200) { Start-Process $previewUrl; exit } } catch {}; Start-Sleep -Seconds 1 }"
node "node_modules\next\dist\bin\next" dev --port 3099
if errorlevel 1 pause
