# Blog

## Development

```bash
$pnpm install
$pnpm build    # build posts/*.md
$pnpm serve    # run preview server
```

### TODO

- [x] create index.html
- [x] add 'build' scripts
   - copy index.html to dist
- [x] add 'preview' scripts
   - serving dist/index.html http server
- [x] add posts (in ./posts/post1.html)
- [x] create link to ./posts/post1.html in index.html
- [x] 'build' scripts resolve ./posts/post1.html
   - copy ./posts/post1.html to dist
- [x] add 'loadPosts' function (it's build time API)
- [x] ./posts/post1.html to post1.md
- [x] 'build' scripts resolve ./posts/post1.md
   - md to html
   - copy the html to dist
   - must header tag attachment!
- [ ] layout and styling
- [ ] preview server use Map<filename, content> instead of fs.readFileSync (cache)
- [ ] index.html to template(vue, astro and others)
- [x] frontmatter support
- [x] add frontmatter attributes 'publishedAt', and posts sort using it
- [ ] code highlight
- [ ] watch mode
- [ ] deploy
