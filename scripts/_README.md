# SCRIPTS

List of scripts that bundles project differently:

- build.cmd
  > Builds project to build directory, which contains ready production code.

- dev.cmd
  > Builds project to dist directory, which contains only dev code, don't use in production!

- json_server.cmd
  > Starts local server which shares API based on ./API/db.json file.

- start_build.cmd
  > Starts local server with ready for production code, good for handling production code dynamically.

- start_dev.cmd
  > Starts local server with dev code, which is primarily used during development.

- watch.cmd
  > Compiles project to dist directory, watches for any changes you made.

## Tips

For production, use 'build.cmd' script and attach index.html to any route, it can handle itself the routes, or if you want dynamic update use 'start_build.cmd' script which runs local server and updates web on fly when anything is changed in project.
