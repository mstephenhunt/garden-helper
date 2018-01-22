#!/bin/bash

# ensures you're on development
git checkout development

# get what's in git
git pull

# builds
npm run build

# auto add and commit
git add dist
git commit -m "auto-build"

# pushes to git
git push

# pushes to heroku
git push staging development:master