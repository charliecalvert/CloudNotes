---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Aws/SystemCheckRefactor.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Aws
fileName: SystemCheckRefactor.md
relativePath: /Aws/SystemCheckRefactor.md
title: SystemCheckRefactor
directoryName: Aws
category : aws-guide
---

=## Overview

Learn to clean code with prettier and eslint and refactor React components.

## Get Started

Let's start from the beginning again.

- Update JsObjects
  - slb
  - ./CreateSynbolicLinks (needed for semver-inc)
- Navigate back to your repository
- Branch: **week07**
- Folder: **week07-system-check-refactor**
- Navigate into folder
  - **get-gist** and choose **Elven Create Concurrently**
  - Run **elf-concur**, choose s for server

## Eslint and Prettier

Install eslint and prettier

- get-gist and choose **Run ESLintRc and Prettier**
- echo 'build' > .prettierignore
- Run prettier, and it should clean both **client** and **server**.

We set up **.prettierignore** because we need to avoid trying to run prettier on our **client/build** directory.

## systemd

- cd server
- get-gist and run **Elven Node systemd Tools**
- Open **setup-environment-service** in WebStorm.

Here are the settings:

    export SYSTEMD_PROJECT_NAME=scref
    export SYSTEMD_DESCRIPTION="SystemCheck Refactor Service"
    export SYSTEMD_PORT="ELF_SCREF_PORT=30030"

Add **ELF_SCREF_PORT** to both **.bashrc** and **/bin/www**. You need to export it from **.bashrc**.

```JavaScript
var port = normalizePort(process.env.ELF_SCREF_PORT || '30030');
```

**NOTE**: _Ultimately, we may want to put these exports in **.my_bash_aliases**._

Execute **run-setup-service** and confirm that it works. Use the **q** key to exit.

We also need to support the SETUP_LINUXBOX environment variable. Append this to the appropriate place in your service file completing the steps above:

```bash
Environment=SETUP_LINUXBOX=/home/bcuser/Git/JsObjects/Utilities/SetupLinuxBox
```

Of course, the user name (bcuser) might change depending on where you run it from. If you move from Pristine Lubuntu to EC2, for instance, just execute **run_setup_service** to automatically change **bcuser** to **ubuntu** on all lines in the service file that use it.

## Push and Tag

At this point, you should check that you have completed the [Script Master Push and Tag] assignment.

Push and tag:

    elf-tagger "Completed setup phase" "week07-system-check-refactor"

## Setup

Use **meld** to copy the key files from SystemCheck into this project.

- server/app.js
- server/routes/script-pusher.js
- client/src/App.js

## Radio Buttons

Add radios to render put this before the return statement in render:

```javascript
const radioLocal =  (
      <div className="container">
          <form onSubmit={this.handleSubmit} >

              <div className="elf-form-field" >
                  <input type="radio" name="app-choice" value="CpuInfo" id="elf-radio-cpu" onChange={this.handleChange}/>
                  <label htmlFor="elf-radio-cpu">CpuInfo</label>

                  <input type="radio" name="app-choice" value="VersionCheck" id="elf-radio-version" onChange={this.handleChange}/>
                  <label htmlFor="elf-radio-version">Version Info</label>
              </div>

              <div className="form-group">
                  <button type="submit" className="btn btn-primary">Run System Script</button>
              </div>
          </form>
      </div>
  );
```

## Modify render

Put this in the **render** method:

```html
<main>
    <section>
        {radioLocal}
    </section>
    <section>
        <pre>{this.state.allData}</pre>
    </section>
    <button onClick={this.runFoo}>Run Foo</button>
</main>
```

The key point is the JavaScript JSX expression {radioLocal}.

And we handle it like this:

```javascript
handleChange = (event) => {
    const selectedValue = event.target.value;
    console.log('HANDLE CHANGE', selectedValue);
    this.setState({
        ...this.state,
        selectedValue: selectedValue
    });

};

handleSubmit= (event) => {
    this.setState({allData: ''});
    console.log('A name was submitted: ' , this.state);
    //if (this.state.selectedValue === 'cpu') {
    this.runCpuInfo(this.state.selectedValue);
    //}
    event.preventDefault();
};
```

## Refactor

I'll talk you through the refactor.

## Deploy

Other than systemd reated issues, I think I see three issues that are central to deployment.

1. Create a script to automate running the build step in the client.
2. Create a **.gitignore** file for the server
3. Handle the case where we change branches on a deployed app.

## The Build Script

Create a bash script file called **build-copy**. This script is designed to be run from the **client** directory. It begins as usual with:

```bash
#! /usr/bin/env bash
```

Declare a variable called **SERVER_DIR** that points at the **public** directory in the server folder. This will be a relative link that starts one directory closer to the root than the **client** directory : **../<THE PATH>**

Now run the build:

    npm run build

The next three lines will all use the **SERVER_DIR** variable. They:

- Delete the file called **precache-manifest*.js** from **server/public**
  - The part where I place the wildcard (\*) will differ every time we build.
- Delete the **static** directory from the **server/public**
- Recursively copy the contents of the build directory into **server/public**

**NOTE**: _Only write the words **server/public** once: in the declaration for **SERVER_DIR**. The rest of the time, when you need to refer to that directory, use **$SERVER_DIR**. And once again, you will probably want to use a relative path in the definition of **SERVER_DIR**._

When you are done, you should be able to run the script to perform a build, delete the old files from the **SERVER_DIR**, and copy in the new ones. It's not that these steps are hard to do without the script, but that the script makes the task simpler, and saves us from making a type that might caues trouble when deleting or copying files.

I suggest storing the **build-copy** file in your scripts directory and creating a symbolic link to it from your **client** directory. (It makes sense to also create a link to it from your **~/bin** directory, but I want you to also create one from your **client** directory so I can use it while grading.)

## The .gitignore for the Server

A **.gitignore** file belongs in the **server** directory. I think this covers it:

    public/static
    public/precache-manifest.\*.js
    public/asset-manifest.json
    public/index.html
    public/service-worker.js

## Changing Branches

Once we start a **systemd** service running, problems can occur if we switch branches in our repository. For things to work smoothly, each branch would need to contain more less identical code for a the directory hosting the service. This is not likely to be the case.

I can think of two solutions:

1. Copy the code for the program out of the repository and point symbolic link in the **~/bin** directory to the copy.
1. Have two copies of your repository on your hard drive: one in your **~/Git** folder in which you do your work, and one in a **~/Deploy** folder which contains the code for your services. Always having working code in the **master** branch and always have the code in **~/Deploy** pointing at **master**.

Of these two solutions, the second seems less likely to cause problems and simplest to maintain. The only draw back is that it takes up more disk space.

## Turn it in

Make sure **prettier** and **eslint** come back with no errors when run from project root, **client**, or **server**.

Set up **systemd** to run locally, but not on EC2.

Tag and push with script:

- elf-tagger "Completed system check refactor" "week07-system-check-refactor"

## SLB

Issues sometimes surface with the environment variable **SETUP_LINUXBOX**. On my system it looks like this:

```
$ echo $SETUP_LINUXBOX
/home/charlie/Git/JsObjects/Utilities/SetupLinuxBox
```

In our JavaScript code we access that variable like this:

    process.env.SETUP_LINUXBOX

In systemd service files, we set it like this:

    Environment=SETUP_LINUXBOX=/home/charlie/Git/JsObjects/Utilities/SetupLinuxBox

Though the username can differ. In ~/.bash_aliases it gets set on line 14

    export SETUP_LINUXBOX=$ELF_UTILS/SetupLinuxBox

You will need to put the path in **conn.exec** when running a remote call to a file found in the SLB directory.
