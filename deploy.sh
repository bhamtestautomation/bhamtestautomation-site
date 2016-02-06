#!/bin/bash

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then

git config --global user.email "travis@travis-ci.org"
git config --global user.name "travis-ci"

# Clone *.github.io repo to build folder
git clone https://github.com/bhamtestautomation/bhamtestautomation.github.io.git build > /dev/null 2>&1
rm -rf build/*

# Build latest commit
npm run build && cd build

git add --all .
git commit -m "Deploying ${TRAVIS_COMMIT} to GitHub pages"
git push origin master --force --quiet > /dev/null 2>&1

fi