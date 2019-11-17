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

**NOTE**: _This is a weak point in our app. Right now the glob statement that contains **isit32** will meet our purposes. However, this program could be used to check many repos with arbitrary names. We could probably solve this problem by putting our repos in a **Git** folder or a folder with some similar name. However, I'm reluctant to introduce that change just now, so I'll put off a decision on this issue until later._
