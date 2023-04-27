1. create index.html - done
2. add 'build' scripts - done
   - copy index.html to dist
3. add 'preview' scripts
   - serving dist/index.html http server
4. add posts (in ./posts/post1.html)
5. create link to ./posts/post1.html in index.html
6. 'build' scripts resolve ./posts/post1.html
   - copy ./posts/post1.html to dist
7. ./posts/post1.html to post1.md
8. 'build' scripts resolve ./posts/post1.md
   - md to html
   - copy the html to dist
   - must header tag attachment!
9. add 'loadPosts' function (it's build time API)

