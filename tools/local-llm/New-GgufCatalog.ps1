#Requires -Version 5.1
<#
.SYNOPSIS
  Build apprenti.dev catalog.json from GGUF files in a folder.

.DESCRIPTION
  Scans a directory for *.gguf, hashes each file, and writes catalog.json in the
  schema the app reads (schemaVersion 1, source google_drive).

  Same-folder layout is recommended: catalog.json next to the GGUF files. The app
  does not list the Drive folder; it opens catalog.json by file id, then each
  model by its own driveFileId. Empty driveFileId rows stay listed but cannot
  download until you paste the id from
  https://drive.google.com/file/d/<id>/view

  Re-running merges driveFileId and contextWindow from an existing catalog.json
  (matched by fileName).

.PARAMETER Path
  Folder that contains the .gguf files (a Google Drive desktop sync folder is fine).

.PARAMETER OutFile
  Destination catalog.json. Defaults to <Path>\catalog.json.

.PARAMETER RecommendedFile
  File name (not path) to mark recommended: true. If omitted, keeps the previous
  recommended file when it still exists; otherwise the first Q4_K_M file, else
  the first GGUF.

.PARAMETER NoMerge
  Do not keep driveFileId values from an existing catalog.json.

.EXAMPLE
  .\New-GgufCatalog.ps1 -Path D:\Drive\apprenti-gguf
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string] $Path,

    [string] $OutFile,

    [string] $RecommendedFile,

    [switch] $NoMerge
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-GgufQuantization {
    param([string] $FileName)
    if ($FileName -match '(?i)(IQ\d+_[A-Z]+|Q\d+_K_[SML]|Q\d+_[01]|Q8_0)') {
        return $Matches[1].ToUpperInvariant()
    }
    return $null
}

function Get-GgufId {
    param([string] $FileName)
    $base = [System.IO.Path]::GetFileNameWithoutExtension($FileName).ToLowerInvariant()
    $id = $base -replace '[^a-z0-9]+', '-'
    return $id.Trim('-')
}

function Get-GgufDisplayName {
    param([string] $FileName)
    $base = [System.IO.Path]::GetFileNameWithoutExtension($FileName)
    $base = $base -replace '[._]+', ' '
    $base = $base -replace '\s+', ' '
    return $base.Trim()
}

function Get-ExistingByFileName {
    param([string] $CatalogPath)
    $map = @{}
    if (-not (Test-Path -LiteralPath $CatalogPath)) {
        return $map
    }
    $raw = Get-Content -LiteralPath $CatalogPath -Raw -Encoding UTF8
    if ([string]::IsNullOrWhiteSpace($raw)) {
        return $map
    }
    $parsed = $raw | ConvertFrom-Json
    foreach ($model in @($parsed.models)) {
        if ($null -eq $model.fileName) { continue }
        $map[[string] $model.fileName] = $model
    }
    return $map
}

$folder = (Resolve-Path -LiteralPath $Path).Path
if (-not (Test-Path -LiteralPath $folder -PathType Container)) {
    throw "Not a directory: $Path"
}

if ([string]::IsNullOrWhiteSpace($OutFile)) {
    $OutFile = Join-Path $folder 'catalog.json'
}
elseif (-not [System.IO.Path]::IsPathRooted($OutFile)) {
    $OutFile = Join-Path (Get-Location) $OutFile
}

$files = @(
    Get-ChildItem -LiteralPath $folder -File -Filter '*.gguf' |
        Sort-Object Name
)
if ($files.Count -eq 0) {
    throw "No .gguf files in $folder"
}

$existing = @{}
if (-not $NoMerge) {
    $existing = Get-ExistingByFileName -CatalogPath $OutFile
}

$recommendedName = $RecommendedFile
if ([string]::IsNullOrWhiteSpace($recommendedName)) {
    foreach ($file in $files) {
        $prior = $existing[$file.Name]
        if ($prior -and $prior.recommended -eq $true) {
            $recommendedName = $file.Name
            break
        }
    }
}
if ([string]::IsNullOrWhiteSpace($recommendedName)) {
    $q4 = $files | Where-Object { $_.Name -match '(?i)Q4_K_M' } | Select-Object -First 1
    if ($q4) {
        $recommendedName = $q4.Name
    }
    else {
        $recommendedName = $files[0].Name
    }
}

$models = @()
foreach ($file in $files) {
    Write-Host "Hashing $($file.Name) ($([math]::Round($file.Length / 1MB, 1)) MB)..."
    $hash = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    $prior = $existing[$file.Name]
    $driveId = ''
    $context = $null
    if ($prior) {
        if ($prior.driveFileId) { $driveId = [string] $prior.driveFileId }
        if (
            ($prior.PSObject.Properties.Name -contains 'contextWindow') -and
            $null -ne $prior.contextWindow -and
            "$($prior.contextWindow)" -ne ''
        ) {
            $context = [int] $prior.contextWindow
        }
    }

    $row = [ordered]@{
        id           = Get-GgufId -FileName $file.Name
        displayName  = Get-GgufDisplayName -FileName $file.Name
        driveFileId  = $driveId
        fileName     = $file.Name
        sha256       = $hash
        sizeBytes    = [int64] $file.Length
        quantization = Get-GgufQuantization -FileName $file.Name
        recommended  = [bool] [string]::Equals(
            $file.Name,
            $recommendedName,
            [StringComparison]::OrdinalIgnoreCase
        )
    }
    if ($null -ne $context) {
        $row['contextWindow'] = $context
    }
    $models += [pscustomobject] $row
}

$catalog = [ordered]@{
    schemaVersion = 1
    source        = 'google_drive'
    models        = @($models)
}

$json = $catalog | ConvertTo-Json -Depth 6
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($OutFile, $json + [Environment]::NewLine, $utf8NoBom)

Write-Host "Wrote $OutFile ($($models.Count) models)."
$missing = @($models | Where-Object { -not $_.driveFileId })
if ($missing.Count -gt 0) {
    Write-Host "Fill driveFileId after upload ($($missing.Count) empty). Re-run this script to refresh hashes; ids are merged."
}
