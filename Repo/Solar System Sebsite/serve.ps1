param(
    [int]$Port = 8080,
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $Root) { $Root = (Get-Location).Path }

$MimeTypes = @{
    '.html'  = 'text/html; charset=utf-8'
    '.htm'   = 'text/html; charset=utf-8'
    '.css'   = 'text/css; charset=utf-8'
    '.js'    = 'text/javascript; charset=utf-8'
    '.mjs'   = 'text/javascript; charset=utf-8'
    '.json'  = 'application/json; charset=utf-8'
    '.svg'   = 'image/svg+xml'
    '.png'   = 'image/png'
    '.jpg'   = 'image/jpeg'
    '.jpeg'  = 'image/jpeg'
    '.webp'  = 'image/webp'
    '.ico'   = 'image/x-icon'
    '.woff2' = 'font/woff2'
}

$Listener = New-Object System.Net.HttpListener
$Prefix = "http://localhost:$Port/"
$Listener.Prefixes.Add($Prefix)
$Listener.Start()

Write-Host "Solar System 3D Tour Server running at $Prefix" -ForegroundColor Cyan
Write-Host "Serving directory: $Root" -ForegroundColor DarkGray
Write-Host "Press Ctrl+C to stop." -ForegroundColor Yellow

if (-not $NoBrowser) {
    Start-Process $Prefix
}

try {
    while ($Listener.IsListening) {
        $Context = $Listener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response

        $UrlPath = [Uri]::UnescapeDataString($Request.Url.AbsolutePath.TrimStart('/'))
        if ([string]::IsNullOrWhiteSpace($UrlPath)) {
            $UrlPath = 'index.html'
        }

        $SafeRelative = $UrlPath -replace '/', [IO.Path]::DirectorySeparatorChar
        $FilePath = Join-Path $Root $SafeRelative

        if ((Test-Path $FilePath -PathType Container)) {
            $FilePath = Join-Path $FilePath 'index.html'
        }

        if (Test-Path $FilePath -PathType Leaf) {
            try {
                $Ext = [IO.Path]::GetExtension($FilePath).ToLowerInvariant()
                $ContentType = $MimeTypes[$Ext]
                if (-not $ContentType) { $ContentType = 'application/octet-stream' }

                $Bytes = [IO.File]::ReadAllBytes($FilePath)
                $Response.ContentType = $ContentType
                $Response.ContentLength64 = $Bytes.Length
                $Response.Headers.Add('Cache-Control', 'no-cache')
                $Response.StatusCode = 200
                $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
            } catch {
                $Response.StatusCode = 500
            }
        } else {
            $Response.StatusCode = 404
            $NotFoundBytes = [Text.Encoding]::UTF8.GetBytes("404 Not Found: $UrlPath")
            $Response.ContentType = 'text/plain; charset=utf-8'
            $Response.ContentLength64 = $NotFoundBytes.Length
            $Response.OutputStream.Write($NotFoundBytes, 0, $NotFoundBytes.Length)
        }

        $Response.OutputStream.Close()
    }
} finally {
    $Listener.Stop()
    $Listener.Close()
}
