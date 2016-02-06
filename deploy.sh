#!/bin/bash

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then

git config --global user.email "travis@travis-ci.org"
git config --global user.name "travis-ci"

# Clone *.github.io repo to staging folder
git clone https://github.com/bhamtestautomation/bhamtestautomation.github.io.git stage > /dev/null 2>&1
rm -rf stage/*

# Build latest commit and copy to stage
npm run build && mv build/* stage && cd stage

git add --all .
git commit -m "Deploying ${TRAVIS_COMMIT} to GitHub pages"
git push origin master --quiet > /dev/null 2>&1

fi