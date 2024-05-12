#!/bin/sh

cd ..
pwd
pnpm i
pnpm build

distName="dist-ssr.zip"

cd .output
rm -rf $distName
zip -r $distName ./*

serverPath="/data/wwwlemon8-web-ssr/dist-ssr"
ssh bitnami@54.249.39.10 "mv $serverPath/$distName $serverPath/${distName}.bk"
scp $distName bitnami@54.249.39.10:$serverPath
ssh bitnami@54.249.39.10 "cd $serverPath;unzip -o $distName;cd server;lsof -iTCP:3000 | awk '{print $2}' | tail -n 1 | xargs kill;node nidex.mjs"