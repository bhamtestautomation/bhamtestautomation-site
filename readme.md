# Birmingham Test Automation

### Building the Site

You'll need [NPM](https://www.npmjs.com/) to get started.

```bash
$ npm install
```

Once all your dependencies are installed, run `npm run build` to generate all of the static contents to `build/`.

### Contents

All of the site's structure is stored under `contents/` as [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). Posts can be created under `contents/posts` and any other folder/file contents will be created as static pages.

### Under the Hood

Need to tinker? This site is built on top of [metalsmith](http://www.metalsmith.io/) using [handlebars](http://handlebarsjs.com/) as the template engine behind the scenes.