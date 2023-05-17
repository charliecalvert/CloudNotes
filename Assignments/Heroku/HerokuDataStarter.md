---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Heroku/HerokuDataStarter.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Heroku
fileName: HerokuDataStarter.md
relativePath: /Heroku/HerokuDataStarter.md
title: HerokuDataStarter
directoryName: Heroku
category : heroku-guide
---



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
