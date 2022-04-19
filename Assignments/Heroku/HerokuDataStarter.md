---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Heroku/HerokuDataStarter.md
relativePath: Assignments/Heroku/HerokuDataStarter.md
title: HerokuDataStarter
queryPath: Assignments/Heroku/
subject: Heroku
fileNameMarkdown: HerokuDataStarter.md
fileNameHTML: HerokuDataStarter.html
---


<!-- toc -->
<!-- tocstop -->



https://elements.heroku.com/addons/heroku-postgresql

https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database

Be sure to git pull in JsObjects

heroku addons:create heroku-postgresql:hobby-dev

"dependencies": {
    "pg": "6.x",
    "ejs": "2.5.6",
    "express": "4.15.2",
    "cool-ascii-faces": "1.3.4"
}

db.politicians.find({state:"MS"}, {_id: 0, firstName:1, lastName:1}).limit(54)
db.politicians.find({state:"MS"}, {_id: 0, firstName:1}).limit(54)
db.politicians.find({state:"MS"}, {_id:0}).limit(54)
db.politicians.find({state:"MS"}).limit(54)
db.politicians.find({state:"NE"}).limit(2)
db.politicians.find().limit(2)
db.politicians.find()
