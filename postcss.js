'use strict';

var postcss = require('postcss')
  , cssimport = require('postcss-import')
  , autoprefixer = require('autoprefixer')
  , cssnano = require('cssnano')
  , fs = require('fs');

postcss([cssimport, autoprefixer, cssnano])
  .process(fs.readFileSync('assets/global.css', 'utf8'))
  .then(result => {
    fs.mkdirSync('build/assets');
    fs.writeFileSync('build/assets/global.min.css', result.css);
  });