#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE_DIR="$ROOT_DIR/apps/web"
TARGET_DIR="${1:-$ROOT_DIR/.public-repo}"
STAGING_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$STAGING_DIR"
}

trap cleanup EXIT

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "Source directory not found: $SOURCE_DIR" >&2
  exit 1
fi

mkdir -p "$TARGET_DIR"
mkdir -p "$STAGING_DIR"

cp -R "$SOURCE_DIR/app" "$STAGING_DIR/app"
cp -R "$SOURCE_DIR/lib" "$STAGING_DIR/lib"
cp -R "$SOURCE_DIR/public" "$STAGING_DIR/public"
cp "$SOURCE_DIR/.env.example" "$STAGING_DIR/.env.example"
cp "$SOURCE_DIR/next-env.d.ts" "$STAGING_DIR/next-env.d.ts"
cp "$SOURCE_DIR/next.config.mjs" "$STAGING_DIR/next.config.mjs"
cp "$SOURCE_DIR/tsconfig.json" "$STAGING_DIR/tsconfig.json"
cp "$ROOT_DIR/templates/public-repo/README.md" "$STAGING_DIR/README.md"
cp "$ROOT_DIR/templates/public-repo/.gitignore" "$STAGING_DIR/.gitignore"

node - "$SOURCE_DIR/package.json" "$STAGING_DIR/package.json" <<'NODE'
const fs = require('node:fs')

const [sourcePath, targetPath] = process.argv.slice(2)
const pkg = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))

pkg.name = 'unv-hmnd'
pkg.description = 'Public portfolio-ready Next.js frontend for UNV-HMND'
delete pkg.private

fs.writeFileSync(targetPath, `${JSON.stringify(pkg, null, 2)}\n`)
NODE

rsync -a --delete --exclude '.git/' "$STAGING_DIR/" "$TARGET_DIR/"

if [[ ! -d "$TARGET_DIR/.git" ]]; then
  git init -b main "$TARGET_DIR" >/dev/null
fi

echo "Public repo synced to: $TARGET_DIR"
echo "Next steps:"
echo "  cd \"$TARGET_DIR\""
echo "  git remote add origin <your-public-repo-url>"
echo "  npm install"
echo "  git add ."
echo "  git commit -m \"sync: refresh public portfolio\""
echo "  git push -u origin main"
