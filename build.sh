rm -rf build
rm -rf dist
babel src -d dist/src --copy-files

version=`git describe --abbrev=0 --tags`
sha=`git rev-parse HEAD`

echo $version
echo $sha

perl -pi -e "s/SHA/$sha/g" dist/src/config.json
perl -pi -e "s/VERSION/$version/g" dist/src/config.json

mkdir build
zip -r build/build.zip . -x \"src\" -x \".git\"