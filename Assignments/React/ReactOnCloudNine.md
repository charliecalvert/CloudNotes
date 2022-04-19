---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactOnCloudNine.md
relativePath: Assignments/React/ReactOnCloudNine.md
title: ReactOnCloudNine
queryPath: Assignments/React/
subject: React
fileNameMarkdown: ReactOnCloudNine.md
fileNameHTML: ReactOnCloudNine.html
---


<!-- toc -->
<!-- tocstop -->

## Cloud 9 Client

You can skip this section, as we are not running on Cloud9 just now.

Alright. I finally got the Rest Basics type of app to run on Cloud 9. Here is what I did.

Run the server on 30026 as we normally do. We can't ever see this server running, it is just going in the background. Remember to set export SERVER_PORT=30026 or whatever we decided. Test it:

```
echo $SERVER_PORT
30026
```

Now run your client on PORT 8080 (export PORT=8080). In the client directory, create a file called **.env.development.local** and put this in it:

```
# NOTE: THIS IS DANGEROUS!
# It exposes your machine to attacks from the websites you visit.
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

<p>After doing that, things started to work for me. See this and this:</p>

<ul>
<li><a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#invalid-host-header-errors-after-configuring-proxy">Dangerous Reference</a>&nbsp;</li>
<li><a href="https://github.com/facebook/create-react-app/issues/2271">https://github.com/facebook/create-react-app/issues/2271</a></li>
</ul>

<p>Search for comments by Gearon, and especially the place where he wrote:</p>

<p>If you do use the proxy feature, please <a  href="https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#invalid-host-header-errors-after-configuring-proxy">follow these instructions</a>.</p>

<p>gearon is Mister React. He sits on the team and is one of the most important React developers. </p>

<p><a href="https://github.com/gaearon">https://github.com/gaearon</a></p>


## Run the client on Cloud 9

For a long time, I could not get this type of app to work on Cloud 9. Eventually I found the solution shown above. If that does not work for you then try this alternative. Edit your code Cloud 9. Test everything but the button click. If all is clean:

- Push your code from Cloud 9 or Pristine Lubuntu to GitHub.
- Log into AWS.
- Pull your repository on AWS (Clone first if necessary, but your repository should already be on AWS, so you shouldn't need to clone. Don't clone unless your repository is not already on your AWS server. If it is there, just pull. Don't clone.)
- Edit your security group in the EC2 console to open ports 30025 and 30026
- Run your server. It runs on 30026.
- Log into AWS in a second console
- It runs by default on some weird port, so set the port: **export port=30025**
- Run the client.

It works for me.

We'll do this later, but skip it for now.:

- Remove the line proxy line from client/package.json:
  - "proxy": "http://localhost:30026",
- Then create a final build for the client with this command from the root of the **client** project:
  - **npm run build**
- Now create links to your build from the server's **public** directory:
  - Use your common sense to navigate to your server/public directory
  - do this: **ln -s ../../client/build/* .**
