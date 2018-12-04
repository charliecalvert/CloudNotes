## Overview

TELL THEM ABOUT build-copy-worker
TELL THEM ABOUT killnode and kcp.
TELL THEM TO ADD nohup.out to repo .gitignore

The goal of this assignment is to help you organze, finalize and hone the projects you have been working on this quarter.

- All your programs should _just work_ when started.
  - You need to test this by having two copies of your repo
  - It's best if the copies are on two different machines, but two copies on the same machine is much better than just one copy.
  - Don't worry about the user name in your systemd service files, as my scripts set that automatically.
- It should be possible to start effortlessly all your major programs in four ways:
  - With concurrently
  - By separately staring the client and server in the background
  - By starting the server in the backgrounnd with the client copied into the server with **build-copy**
  - As a systemd service
- All your programs should get a clean bill of health from:
  - eslint
  - prettier
- All code should be merged into your **master branch**
  - The best version of all your programs should be on **master**
- Each server side program must tell its name and author when viewed directly.

## Showing Server Side Name and Author

Suppose we are running the **server** for **SystemCheck** on port 30034. If we go to **http://localhost:30034**, we should see the following information:

- The server's name, which is **System Check Server**
- The author: **Charlie Calvert**

![System Check Server UI][scsui]

**NOTE**: _This will only work if you have not used **build-copy** to build your client and copy it in the server's **public** directory. If you have done that, then you should see the **client** interface, not the **server** interface._

## Start a project in the Background {#background}

You can use the Linux **nohub** command to start a program running in the background. The output from the program is saved in a file called **nohup.out**. Do not check **nohub.out** in to your repository. Probably the simplest solution is to **add this to the .gitignore file** in the root of your repository: **nohup.out**

Save this script as **try-run-both** in your **scripts** directory. Create a symbolic link to it from your **~/bin** directory. It should start both the **client** and the **server** running in the background.

```bash
#! /usr/bin/env bash

if [[ -z $1 ]]; then
    echo -e "======================================================"
    echo -e "Pass in build or run."
    echo -e "build means that npm install will be added to the mix."
    echo -e "  try-run-both build" # performs a build and then runs the app
    echo -e "  try-run-both run"   # there is no build, only run (npm start)
    echo -e "======================================================"
    exit
fi

if [[ $1 = "build" ]]; then
    cd client && npm i && cd ../server && npm i && bower install && cd .. && npm i
fi

cd server
nohup node bin/www &
cd ../client
nohup ./node_modules/react-scripts/bin/react-scripts.js start &
```

The point here is that running a build can take some time, as it runs **npm install** in three directories. The first time you run your app, you will need to pass in **build** as a parameter.

When you are done, commit any files you have modified, and run **kcp** from the root of your project. That alias should be built into JsObjects via **~/.bash_aliases**. It looks like this:

```bash
alias cleanher="git co client && git co server && find . -iname 'nohup.out' ! -type l | xargs rm -rv"
alias kcp="killnode && cleanher && plj"
```

**NOTE**: _The above script runs a checkout on the client and server directories, so it will overwrite any changes to files in those directories unless you have committed them! Read that again!_

## Run any Project from Repo Root {#repo-run}

I've saved the [run-all][rag] script as a gist. Click the link and save the file as **run-all** in the root of your repository.

Run it like this:

```bash
./run-all week06-system-check b $ELF_SYSTEM_CHECK_PORT
```

Or like this:

```bash
./run-all week06-system-check c
```

## Run from Project Root {#project-run}

Save this script as **run** in the root of your projects.

```bash
#! /usr/bin/env bash

if [[ -z $1 ]]; then
    echo -e "======================================================"
    echo -e "Pass in a parameter of a, b, or c."
    echo -e " a) Run Client Server"
    echo -e " b) Run Server"
    echo -e " c) Start Service"
    echo -e "======================================================"
    exit
fi

function runClientServer() {
    try-run-both build
    cd ..
}

function runServer() {
    cd client
    pwd
    ./build-copy-worker a
    cd ../server
    nohup node bin/www &
    firefox http://localhost:${ELF_SYSTEM_CHECK_PORT}
}

function startService() {
    cd server
    pwd
    ./run-setup-service
}

case $1 in
    [Aa]* ) runClientServer; shift;;
    [Bb]* ) runServer; shift;;
    [Cc]* ) startService; shift;;
    [XxQq]* ) break;;
    *) echo -e "\n$NC" + "Please answer with a, b, c, or x.";;
esac
```
Notice that this script specifically spells out the environment variable that contains the port number for this app. This number and enviornment variable name changes for each project. The most official list of ports is maintained in the [systemd Service Control][sdsc] assignment.

Run it like this from the root of your project:

```bash
./run a
```

## Merging Code

My current **~/.gitconfig**:

```
[user]
	email = <YOUR EMAIL>
	name = <YOUR NAME SUCH AS Charlie on forestpath>
[push]
	default = simple
[diff]
    tool = meld
[alias]
	co = checkout
	br = branch
	ci = commit
	st = status
	last = log -1 HEAD
    tags = tag -n1
```

If you are on branch x, and want to see what is different between it and master:

    git difftool -d master

The standard merge master into your current branch:

    git merge master

To copy one file from master into your current branch, go to your repo root and:

    git co master -- foldername/filename.txt

To copy one folder from master into your current branch:

    git co master -- foldername


## Turn it in

When you are done, I should be able to start at least the following projects either from the project root, or from the repo root, with a single command:

- Ec2CopyFile
- SystemCheck
- SystemCheckRefactor
- SystemCheckRefactorDetails
- Midterm
- Aws-Provision
- And, ultimately, your final. But you don't need that yet.

All of these projects should just work whether I start them with

- runClientServer (Both the **client** and **server** started with **try-run-both**)
- runServer       (All one app via **build-copy** in the server)
- startService    (systemd)

I want to make clear that this is at least as important as getting the final app running. You should prioritize getting this to work over getting the final project working.

I also want both **prettier** and **eslint .** coming back clean in from the root of all the projects listed above.

[scsui]: https://s3.amazonaws.com/bucket01.elvenware.com/images/system-check-server-ui.png

[sdsc]:https://www.elvenware.com/teach/assignments/Npm/SystemdServiceControl.html#official-ports

[rag]: https://gist.github.com/charliecalvert/f927c792ac248f2069a629b46ce6ada8
