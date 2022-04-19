---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog272/Week10.md
relativePath: Prog272/Week10.md
title: Week10
queryPath: Prog272/
subject: Prog272
fileNameMarkdown: Week10.md
fileNameHTML: Week10.html
---


<!-- toc -->
<!-- tocstop -->

Prog 272 Week 10
================

GIT
---

-   Advantages of SSH over HTTPS
-   RequreJs
-   PubSub
-   Express and Jade in AwsBasicS3

##AWSBasic

- [Set environment variables JSOBJECTS and PYTHONPATH](https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/NodeCode/AwsBasicS3/README.md)
- You need to get the access keys from the [AWS security page](https://console.aws.amazon.com/iam/home?#security_credential) and put them in **config.json**
- Your dropbox folder

## Require

- [Design RequireBoat](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/RequireBoat)
- [Design RequireJsO1](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/RequireJs01)
- [Data MongoTalk05](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/RequireJs01)

## Express

If you have not done so already:

	sudo npm install -g express

**sudo** is not needed on Windows.

Then create a project:

	express MyProject

- JavaScript NodeCode HelloExpress03

Set the environment variable PORT to 30025:

	app.set('port', process.env.PORT || 30025);

Argo Uml
--------

- <http://argouml.tigris.org/>
- [Plant UML](https://github.com/pjkersten/PlantUML)
- [Text UML](https://github.com/abstratt/textuml)
- <http://modeling-languages.com/uml-tools-textual-notations-define-uml-models/>

Agile
-----

-   TestFirst
-   Your tests should prove your code is simple to use
-   If you have to do a lot to set up a test, then something is wrong.
-   It's not that complexity is always wrong, but it must be hidden.
