@echo off
cd /d "%~dp0"

echo.
echo  ==========================================
echo     Moss is growing ... opening in browser
echo     Close this window to stop the site
echo  ==========================================
echo.

if not exist "node_modules\next\dist\bin\next" (
  echo Run npm install in this folder first, then double-click this file.
  pause
  exit /b 1
)

rem Wait for the dev server, then open the homepage in the default browser.
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "$previewUrl = 'http://localhost:3099/'; for ($attempt = 0; $attempt -lt 90; $attempt++) { try { $response = Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 2; if ($response.StatusCode -eq 200) { Start-Process $previewUrl; exit } } catch {}; Start-Sleep -Seconds 1 }"

node "node_modules\next\dist\bin\next" dev --port 3099
if errorlevel 1 pause
