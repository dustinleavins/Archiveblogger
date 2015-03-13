#!/bin/bash
FOLDER=dist

mkdir $FOLDER
NODE_ENV=production browserify . | uglifyjs -cm > $FOLDER/browser-bundle.js
cp index.css $FOLDER
cp index.html $FOLDER
