1. create index.html - done
2. add 'build' scripts - done
   - copy index.html to dist
3. add 'preview' scripts - done
   - serving dist/index.html http server
4. add posts (in ./posts/post1.html) - done
5. create link to ./posts/post1.html in index.html - done
6. 'build' scripts resolve ./posts/post1.html - done
   - copy ./posts/post1.html to dist
7. add 'loadPosts' function (it's build time API) - done
8. ./posts/post1.html to post1.md - done
9. 'build' scripts resolve ./posts/post1.md - done
   - md to html
   - copy the html to dist
   - must header tag attachment!
10. layout and styling
11. use Map<filename, content> instead of fs.readFileSync
12. index.html to template(vue, astro and others)
13. frontmatter support - done
14. add frontmatter attributes 'date', and posts sort using it
15. code highlight
