#!/bin/bash

# ensures you're on master
git checkout development

# builds
npm run build

# auto add and commit
git add dist
git commit -m "auto-build"

# pushes to git
git push

# pushes to heroku
git push production master:master