#!/usr/bin/env bash


npm run build;
cp src/index.html ./build;
./node_modules/.bin/firebase deploy;

