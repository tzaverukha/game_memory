set -e
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:tzaverukha/game_memory.git master:gh-pages
cd -