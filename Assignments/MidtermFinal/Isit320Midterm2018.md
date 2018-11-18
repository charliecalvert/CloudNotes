## Overview

The midterm is an an extension of the [SystemCheck][sc] and [SystemCheckRefactor][scr] assignments with perhaps an element or two from the [AWS Provision][awsp] assignment.

The goal will be to create a program that will allow us to query both the status of the current system, and a system running on EC2. The code should compile cleanly with no errors or warnings from **prettier** or **eslint**.

The screenshot is designed only to give you a general idea of where I would like to take this program. I haven't finished my version yet, so this is incomplete, but it gives you a good starting point. If you imitate this look and feel you should not have to undo anything, only add more.

![Midterm System Check Interface][mtsc]

## Get Started

We have spent a lot of time learning how to automate steps in our work, so I'll ask you to start again from the beginning again.

- Update JsObjects
  - slb
  - ./CreateSynbolicLinks (needed for semver-inc)
- Navigate back to your repository
- Branch: **midterm**
- Folder: **midterm**
- Navigate into folder
  - **get-gist** and choose **Elven Create Concurrently**
  - Run **elf-concur**, choose s for server

After you are done:

- elf-tagger "starting midterm" "midterm"

So part of the midterm is having a commit and tag made with **elf-tagger** and dated later than Wednesday, Oct 31 at 3:00 PM.

## Eslint and Prettier

Install eslint and prettier

- get-gist and choose **Run ESLintRc and Prettier**
- echo 'build' > .prettierignore
- Run prettier, and it should clean both **client** and **server**.

We set up **.prettierignore** because we need to avoid trying to run prettier on our **client/build** directory.

We also need to get **eslint** working. As a start, put **\*\*public/static\*\*** into **.eslintignore**. The goal is to be able to run the following command and have it come back quickly and cleanly: **eslint .**. If the command takes more than a few seconds to run, you probably need to add something else to **.eslintignore.**

To run eslint: **eslint .**. You may need to:

     npm i -g babel-eslint eslint-plugin-react

In .eslintignore:

**/public/static/**
service-worker.js
precache-manifest.*.js

## systemd

- cd server
- Run **get-gist** and run **Elven Node systemd Tools**
- Open **setup-environment-service** in WebStorm.

Here are the settings:

    export SYSTEMD_PROJECT_NAME=midterm
    export SYSTEMD_DESCRIPTION="Midterm Service"
    export SYSTEMD_PORT="MIDTERM_PORT=30035"

Add **MIDTERM_PORT** to both **.bashrc** and **/bin/www**. You need to **export** it from **.bashrc**.

    export MIDTERM_PORT=30035

**NOTE**: _Ultimately, we may want to put these exports in **.my_bash_aliases**._

Execute **run-setup-service** and confirm that it works. Use the **q** key to exit if necessary.

## Push and Tag

At this point, you should again check that you have completed the [Script Master Push and Tag] assignment.

Push and tag:

    elf-tagger "Completed Midterm setup phase" "midterm"

## Setup

Use **meld** to copy the key files from **SystemCheck** or other projects into this project.

- server/routes/script-pusher.js
- server/routes/run-ssh.js
- client/src/App.js

I'll leave it up to you how to edit **app.js**. The act of requiring new files from the **routes** directory should be fairly easy for you by this time.

There are two files that are helpful:

    run-ssh.js (aka ssh-runner.js)
    script-pusher.js

The [script-pusher.js][ec2c] file is in [Ec2CopyFile.html][ec2f].

The core of [run-ssh.js aka ssh-runner.js][arssr] is in [AwsRunSshScript.html][arss]:

The next section after the one I link above describes how to create **ssh-runner.js** or **run-ssh.js**. Whatever we call it. (Sorry about confusion on naming.) I'll go with **run-ssh.js** as the official name.


## Radio Buttons

We want to create an interface that will allow us to query both the status of the current system, and a system running on EC2. See the screenshot at the beginning of this document for some hints as to what I want.

Add or modify the radio buttons in your **src/App.js** to render put this before the return statement in render:

```javascript
const radioWeb = (
    <div className="container">
        <form onSubmit={this.handleSubmit}>
            <fieldset>
                <div className="elf-form-field">

                    <legend>Services</legend>
                    <input
                        type="radio"
                        name="app-choice"
                        data-endpoint="0"
                        value="CpuInfo"
                        id="elf-radio-cpu"
                        onChange={this.handleChange}
                    />
                    <label htmlFor="elf-radio-cpu">CpuInfo</label>

                    <input
                        type="radio"
                        name="app-choice"
                        data-endpoint="0"
                        value="VersionCheck"
                        id="elf-radio-version"
                        onChange={this.handleChange}
                    />
                    <label htmlFor="elf-radio-version">Version Info</label>

                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Run System Script</button>
                </div>
            </fieldset>
        </form>
    </div>
);
```

The **fieldset** and it's **legend** visually bind together the form elements by putting a box and title around them. Each **radio input** control is bound to a **label**. The binding occurs because the label's **for** and the input control's **id** values match. Because **for** is a reserved word in JavaScript, JSX uses **htmlFor** rather than **for**. But at runtime it is rendered as **for**, which is proper HTML. Here is the generated runtime code for one of the labels:

```html
<label for="elf-radio-uptime">Uptime</label>
```

I have to decided to create a convention for this about that the **value** of each **input** control is where you put the code that executes on the **server**. This is not magic, and it would not work this way in another program, but it works here because we make it work. Here is the attribute in context when we declare it:

    value="CpuInfo",

In the **handleChange** method shown [a bit later](#handle-ui) in this program you will find the code that picks up on this property and saves it to our React Component's **state**:

```javascript
const selectedValue = event.target.value;
```

In other words, if you set **value** attribute of the radio button to **CpuInfo** then we:

- Save it to our state when the user selects the radio button
- Pass it to our server if the user submits our form.

The **CpuInfo** script will be executed on the **server** side. The server uses a whitelist to ensure that only safe calls can be made from the client. We will discuss how to set up this whitelist [later](#whitelist) in this document.

## Modify render

Put this in the **render** method:

```html
<main>
    <section>
        {radioWeb}
    </section>
    <section>
        <pre>{this.state.allData}</pre>
    </section>
    <button onClick={this.runFoo}>Run Foo</button>
</main>
```

The key point is the JavaScript JSX expression {radioWeb}. We declared this variable in the previous section of this document.

## Handle User Interactions {#handle-ui}

Here is the code we use to handle the user's clicks on radio and submit buttons:

```javascript
constructor(props) {
    super(props);
    this.dataEndPoints = ['/script-pusher/run-script?script=', '/script-pusher/run-system-tool?script='];
    this.state = {
        allData: '',
        selectedValue: '',
        endPointIndex: 0
    };
}

runScript = (path, script) => {
    const that = this;
    if (!script) {
        return;
    }
    fetch(path + script)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log('allData', json.allData);
            console.log('result', json.result);
            console.log('code', json.code);
            console.log('error', json.error);
            let info = '';
            if (json.result === 'error') {
                info = json.error;
            } else if (script === 'CpuInfo') {
                var regex1 = RegExp('model name.*', 'g');
                let array1 = regex1.exec(json.allData);
                while (array1 !== null) {
                    info += array1[0] + '\n';
                    console.log(`Found ${array1[0]}.`);
                    array1 = regex1.exec(json.allData);
                }
            } else {
                info = json.allData;
            }
            that.setState({allData: info});
        })
        .catch(function (ex) {
            console.log('parsing failed, URL bad, network down, or similar', ex);
        });
};

handleChange = (event) => {
    const selectedValue = event.target.value;
    const endPointIndex = event.target.getAttribute('data-endpoint');
    console.log('HANDLE CHANGE', selectedValue);
    this.setState({
        ...this.state,
        selectedValue: selectedValue,
        endPointIndex: endPointIndex
    });

};

handleSubmit = (event) => {
    this.setState({allData: ''});
    console.log('A name was submitted: ', this.state);
    this.runScript(this.dataEndPoints[this.state.endPointIndex], this.state.selectedValue);
    event.preventDefault();
};
```

We want to perform two different types of actions on the server side:

- Run local scripts that we put in JsObjects or in our own repositories
- Run system code that is usually located in the **/usr/bin** directory.
  - This is the system wide bin directory, not the **~/bin** found in our home directory.

The point is that programs we want to run in order to get updates on the system status will be located in different places. So we need a system to differentiate between custom scripts in places like JsObjects, and system code found in the **/usr/bin** directory.

Here is the code I'm using to help sort this out:

```javascript
this.dataEndPoints = ['/script-pusher/run-script?script=', '/script-pusher/run-system-tool?script='];
```

Calls to **/script-pusher/run-script** run code from JsObjects. Calls to **/script-pusher/run-system-tool** run system utilities. It's up to you to see how this simple array is used in the program to help sort out this problem.

Here is a different way to think about it. In **script-pusher.js** we have multiple endpoints that looks something like this:

```javascript
router.get('/run-script', (request, response) => {...});
router.get('/run-system-tool', (request, response) => {...});
```

One is designed to help us run scripts found in the SLB directory:

```javascript
const pushScript = spawn(process.env.SETUP_LINUXBOX + '/' + script);
```

The other to run scripts found in the **/usr/bin** directory. (Type **which uptime** at the bash prompt to see how I found that directory.

**dataEndPoints** is an array of strings that contains the path to those two endpoints on our server side code. I give you the **handleSubmit** and **handleChange** methods which together ensure that the right endpoint is passed to the runScript method (which I also give you.) By creatomg the **dataEndPoints** array I'm just trying to give you a single place in the code where you can list these, and other other endpoints we use, so that we can look them up, and modify them - if necessary - in a single place.

## Middleware Whitelist {#whitelist}

Let's turn now to setting up the whitelist on the server that insures that we do not let a malicious user run some arbitrary script.

Put this code near the top of script-pusher. It defines middleware that will be executed before any of the other routes in **script-push**. Always set up this middleware first, before defining any other router methods. It sets up a whitelist of **validOptions**. You must add calls to this whitelist of **validOptions** before trying to execute them from the client. Otherwise, hackers could execute malicious code. The point is the only the calls **CpuInfo**, **VersionCheck**, and **uptime** will be allowed to execute. For instance, a call to "formate drive c:" would be rejected as an invalid option.

```javascript
const check = (request, response, next) => {
    console.log('REQUEST CHECK CALLED', request.query);
    const validOptions = ['CpuInfo', 'VersionCheck', 'uptime'];
    if (request.query.script) {
        console.log('INSIDE REQUEST SCRIPT');
        if (!validOptions.includes(request.query.script)) {
            console.log('INSIDE REQUEST INVALID OPTION');
            response.send({result: 'error', error: 'Invalid Option: ' + request.query.script, script: request.query.script});
            return;
        }
    }
    next();
};

router.use(check);
```

Notice the call to **next()**. If that line is not reached, then none of the other routes in the module will ever execute. Notice also the call the **router.use(check)**. This is when we insert our whitelist check into the list of calls that **Express** will execute before it tries to call any other route defined in this module.

Think of it this way. The client sends a request to execute **/script-pusher/cpu-info**. Before that calls is routed to its intended destination, the **check** method is called. If it passes, then the **/script-pusher/cpu-info** route is called, otherwise, an error is returned and the **/script-pusher/cpu-info** route is never called.

- [Reference](https://expressjs.com/en/guide/writing-middleware.html)

## Refactor

I'll talk you through the refactor.

## Deploy

Other than systemd reated issues, I think I see three issues that are central to deployment.

1. Create a script to automate running the build step in the client.
2. Create a **.gitignore** file for the server
3. Handle the case where we change branches on a deployed app.

## The Build Script

You need to create a script called **build-copy** in the client directory and is designed to be run from the **client** directory. It begins as usual with:

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

**NOTE**: _Only write the words **server/public** once: in the declaration for **SERVER_DIR**. The rest of the time, when you need to refer to that directory, use **\$SERVER_DIR**. And once again, you will probably want to use a relative path in the definition of **SERVER_DIR**._

When you are done, you should be able to run the script to perform a build, delete the old files from the **SERVER_DIR**, and copy in the new ones. It's not that these steps are hard to do without the script, but that the script makes the task simpler, and saves us from making a typo that might cause trouble when deleting or copying files.

Then: **chmod +x build-copy**

## The .gitignore for the Server

A **.gitignore** file belongs in the root of the **server** directory. I think this covers it:

    public/asset-manifest.json
    public/index.html
    public/precache-manifest.*.js
    public/service-worker.js
    public/static

## Changing Branches

Once we start a **systemd** service running, problems can occur if we switch branches in our repository. For things to work smoothly, each branch would need to contain more less identical code for a the directory hosting the service. This is not likely to be the case.

I can think of two solutions:

1. Copy the code for the program out of the repository and point symbolic link in the **~/bin** directory to the copy.
1. Have two copies of your repository on your hard drive: one in your **~/Git** folder in which you do your work, and one in a **~/Deploy** folder which contains the code for your services. Always having working code in the **master** branch and always have the code in **~/Deploy** pointing at **master**.

Of these two solutions, the second seems less likely to cause problems and simplest to maintain. The only draw back is that it takes up more disk space.

## Add SSH

We are going to use SSH to access services on one of our EC2 instances. Let's again use the NPM [ssh2][ssh2] package to help with that process:

   npm install ssh2 --save

Now bring over **ssh-runner** and call **uptime** on the remote server. I'll want you to call at least one other service as well. I'll update this document soon with more information.

## Turn it in

Tag and push with script:

- elf-tagger "Completed midterm" "midterm"

Probably a good idea to include a screenshot as well. Make sure **prettier** and **eslint** can be run without generating errors or warnings.

[sc]: https://www.elvenware.com/teach/assignments/Aws/SystemCheck.html
[scr]: https://www.elvenware.com/teach/assignments/Aws/SystemCheckRefactor.html
[awsp]: https://www.elvenware.com/teach/assignments/Aws/Ec2ProvisionRepo.html

[mtsc]: https://s3.amazonaws.com/bucket01.elvenware.com/images/midterm-system-check.png

[ec2f]: https://www.elvenware.com/teach/assignments/Aws/Ec2CopyFile.html
[ec2c]: https://www.elvenware.com/teach/assignments/Aws/Ec2CopyFile.html#copy-file-to-ec2
[arssr]: https://www.elvenware.com/teach/assignments/Aws/AwsRunSshScript.html#server-side
[arss]: https://www.elvenware.com/teach/assignments/Aws/AwsRunSshScript.html

[ssh2]:
