'use strict';

var metalsmith = require('metalsmith')
  , slug = require('slug')
  , path = require('path')
  , handlebars = require('handlebars')
  , moment = require('moment')
  , ignore = require('metalsmith-ignore')
  , markdown = require('metalsmith-markdown')
  , layouts = require('metalsmith-layouts');

handlebars.registerHelper('dateFormat', function(date, format) {
  return moment(date).format(format);
});

function permalinks(files, metalsmith, done) {
  setImmediate(done);

  Object.keys(files).forEach(file => {
    var data = files[file];
    if(/^posts/i.test(file)) {
      var postSlug = slug(data.title, { lower: true })
        , permalink = `posts/${postSlug}/`
        , extension = path.extname(file);
      delete files[file];
      data.permalink = '/' + permalink;
      files[`${permalink}/index${extension}`] = data;
    }
  });
}

function posts(files, metalsmith, done) {
  setImmediate(done);

  var metadata = metalsmith.metadata()
    , collection = [];

  Object.keys(files)
    .filter(x => /^posts/i.test(x))
    .forEach(file => {
      var data = files[file];
      collection.push(data);
    });

  collection.sort((a, b) => b.date - a.date);

  // Add prev/next post metadata
  collection.forEach((post, index) => {
    post.next = collection[index + 1];
    post.previous = collection[index - 1];
  });

  metadata.posts = collection;
}

metalsmith = metalsmith(__dirname)
  .source('contents')
  .use(ignore([
    'readme.md',
    '**/*.draft.md'
  ]))
  .use(markdown())
  .use(permalinks)
  .use(posts)
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
