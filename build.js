'use strict';

var metalsmith = require('metalsmith')
  , slug = require('slug')
  , path = require('path')
  , ignore = require('metalsmith-ignore')
  , markdown = require('metalsmith-markdown')
  , layouts = require('metalsmith-layouts');

function permalinks(files, metalsmith, done) {
  setImmediate(done);

  Object.keys(files).forEach(file => {
    var data = files[file];
    if(/^posts/i.test(file)) {
      var postSlug = slug(data.title, { lower: true })
        , extension = path.extname(file);
      delete files[file];
      files[`posts/${postSlug}${extension}`] = data;
    }
  });
}

metalsmith = metalsmith(__dirname)
  .source('contents')
  .use(ignore([
    '**/*.draft.md'
  ]))
  .use(markdown())
  .use(permalinks)
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts',
    'default': 'default.hbs'
  }))
  .build(err => {
    if(err) {
      throw err;
    }
  });
