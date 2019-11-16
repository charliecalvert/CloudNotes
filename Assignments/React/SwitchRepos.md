Be sure to change your **nodemon.json** to include the repos you
want to explore. This cannot be done via hot reloading because
we are ignoring all files in the root of **system-environment** in
our **docker-compose.yml** file. We ignore those files
because we want to be able to clone our repos and they live
in the root of **system-environment**.

Something like this might work:

```json
{
  "verbose": true,
  "ignore": ["**/bower_components/**", "**/isit32*/**", "**/git-ignore-tests/**"]
}
```
