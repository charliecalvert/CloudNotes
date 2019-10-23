## Overview

The midterm is an an extension of the [GitIgnoreTestDockerMicro][gitdm] and [DockerCompose][dc] assignments. In some cases, students have used [RestBasics][rb] rather than **DockerComposer**. As long as it works, then I'm fine with that decision.

The goal of the midterm is to create a program that will allow us to query our repositories to ensure they contain certain key elements. In particular, we are looking to see that all branches contain valid **.gitignore** files and that no inappropriate code, such as a **node_modules** directory, has been checked in.

Your code should compile cleanly with no errors or warnings from **prettier** or **eslint**.

## Images

These images are meant as rough guidelines or inspiration, there is no need to duplication them exactly. Indeed you can, within reason, do more or less what you want inside your React components, so long as you display data similar to that shown here. The data matters, not the format, but of course your data probably does not look exactly like mine.

**NOTE**: _Additional detail on these images is available in [GitIgnoreTestDockerMicro][gitdm]._


A single React component and displaying a bit of information gleaned from the **System Environment** container:

![Git React Get Branches][dcgrgb]

Here we check all branches for things missing from **.gitignore** and find that **.c9** is missing from **.gitignore** in the **week01** branch:

![Git React Missing C9][mc9]

I'll want you to add one more section, which should display any stray files or directories that should not have been checked in.

## Four Tasks

In the image shown above the react component in **main** application calls into **system-environment** and performs three tasks:

- You Rang: Call **/you-rang**.
- Get Branches: Call **/getBranches** and display the branches in your repository.
- The Git Ignore Tests: For each branch, test the **.gitignore** file to be sure it contains all the strings we want it to contain.

The first two are, I believe, self explanatory. The third requires that you:

- Call **getBranches** to get an array of branches.
- Loop over the array and use the magic of **async/await** to allow you to call code that:
  - switches to a new branch
  - runs your **gitIgnoreTest** in the new branch to confirm that the **.gitignore** file is valid, that it meets our requirements.

Here is a hint about how to compose a loop on a an array called **allBranches**.

```javascript
for (let branch of allBranches) {
    console.log('BRANCH', branch);
    someInfo += await SomeAsyncAwaitFunc();
    const someMoreInfo = await SomeOtherAsyncAwaitFunc();;
    // Store return values in a structure such as an Array.
}
// Send back a respose to main that contains at least an appropriate subset of the values returned from the functions in the loop.
```

Of course, this code is not valid, you need to call the appropriate functions and handle their return values.

## Get Started

Here are few steps you should take as you start work on the midterm proper.

- Update Pristine Lubuntu (update-all) and update the npm global packages (ncu -g).
- Update JsObjects
- Navigate back to your repository
- Create a branch called **midterm** based on your most recent work.
- Folder: **midterm**
  - This will probably mean renaming your working folder to **midterm**:
  - For instance: **git mv week04-docker-compose midterm**
- Tag your repo with this string: "Starting midterm in week06"

**HINT**: _To tag a repo, do something like this:_

    git tag -a v0.0.1 -m "Tagging in week06 just before the midterm"

Increment the tags as appropriate:

    git tag -a v0.0.1 -m "React component can display you-rang in a table"

So part of the midterm is having a commit and tag made with **elf-tagger**.

## The Private Key

I have come up with a two step solution to be sure that we never push a private key to DockerHub.

1) When creating the container, we delete the key immediately after using it to clone the repo.
2) When we pull the container onto our private server, we copy the key into our **system-environment** container.

**NOTE**: _One might object that once we have cloned the Git repo and deleted the private key were done, since we will have no further use for it. But we might, in some future assignment, want to pull our Git repo to update it and then confirm that all is still well. In that case, we will need the private key to pull from GitHub._

For the first step, we modify the **Dockerfile** for **system-environment** by adding one more line to our custom code:

    RUN mkdir /root/.ssh
    RUN chmod 700 /root/.ssh
    RUN ssh-keyscan github.com >> ~/.ssh/known_hosts
    RUN ssh-agent bash -c 'ssh-add YOUR_SSH_KEY; git clone git@github.com:charliecalvert/isit320-calvert-2019.git'
    RUN rm YOUR_SSH_KEY

For the second step, here is how to copy a file called **temp01** into our container:

    docker cp temp01 week04-docker-composer_system-environment_1:/usr/src/system-environment

Another solution would be to put our **system-environment** image in a private DockerHub repository, but I'm more comfortable this way.    

## Eslint and Prettier

Install eslint and prettier

- get-gist and choose **Run ESLintRc and Prettier**
- Run prettier, and it should clean both **client** and **server**.

It is best, I think, not to use double quotes in a **sed** statement, as a result, I was escape the single quotes in **getBranches** to satisfy **ESLint**:

```javascript
const { stdout, stderr } = await exec('git branch -a | sed -n -e \'s/remotes.origin*.//p\' | grep -v \'HEAD\'', {
    cwd: workingDir
});
```

**NOTES**: _This is a plain letter: n. Here is an escaped letter: \\n. We put a backslash in front of a character to escape it. Here are some common escaped characters:_

| Escape Sequence | Meaning              |
|:----------------|:---------------------|
| \\\             | Backslash (\\)       |
| \\'             | Single quote (')     |
| \\"             | Double quote (")     |
| \\a             | ASCII Bell           |
| \\b             | Backspace            |
| \\f             | Formfeed             |
| \\n             | Linefeed (LF)        |
| \\r             | Carriage Return (CR) |
| \\t             | Tab                  |
| \\v             | Vertical Tab         |
| \ooo            | The octal value ooo  |
| \xhh...         | The hex value hh...  |

In our case, we are interested in the second escaped character, the _single quote_.

## Push and Tag

At various points, you might want to push and tag:

    git tag -a vX.Y.Z -m "Completed Midterm setup phase"

## Working with JSX Tables

You don't have to use tables to display your data in your main application, but you have seen that is the choice I made.

**NOTE**: _Truly, you don't need to use tables if you have some other technique you think looks better. But if you want a suggestion, I found that tables give a clean and easy to understand format to our data._

For the most part, you can write ordinary HTML **table** syntax in your JSX:

```html
<h2>You Rang</h2>
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>result</td>
            <td className="left"> {this.state.result}</td>
        </tr>
        <tr>
            <td>file</td>
            <td className="left"> {this.state.file}</td>
        </tr>

        ETC...

    </tbody>
</table>
```

However, there are times when you will want to create the body of the table in a loop. You need to do this because you won't know, for instance, how many branches a call to **getBranches** is going to return. As a result, you can't hard code the table as we do above with **you-rang**.

Instead, you do something like this:

```html
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        {this.state.branches.map((branch, index) => {
            return (
                <tr key={index}>
                    // YOU WRITE THE TWO TD ELEMENTS
                </tr>
            );
        })}
    </tbody>
</table>
```

The code above assumes that your call to **getBranches** initialized a field of your **state** object called **branches** to the array of branches you got from the **system-environment** server. To do this, you declare state in your constructor:

```javascript
constructor(props) {
    super(props);
    console.log(props);
    this.state = {
        // PUT THE PROPS FOR YOU RANG HERE
        branches: ['unknown'],
        gitIgnoreTests: [{ branch: 'unknown', missing: ['none'] }]
    };
    this.queryGetBranches = this.queryGetBranches.bind(this);
}
```

    // npm install --save-dev  @babel/plugin-transform-runtime

Note that we are using **bind** to set up the **this** keyword in our call to **queryGetBranches**.

When you use **fetch** to call **getBranches** you should set the **this.state.branches** to the array of branches returned by your function. I'll give you the whole button response method as example of how to use **fetch** with **async/await**.

```javascript
async queryGetBranches() {
    try {
        let response = await fetch('/system-environment/getBranches');
        let result = await response.json();
        console.log(result);
        this.setState({branches: result.gitBranchesAsArray});
    } catch (ex) {
        alert(ex);
    }
};
```

This just works, they tell me, if you use **create-react-app**. To make this work in our elf-express apps, you need to do some configuration.

Make sure you install **@babel/plugin-transform-runtime** and **@babel/runtime**:

    npm i -D @babel/plugin-transform-runtime @babel/runtime

At lesat one [commentator](https://www.valentinog.com/blog/await-react/), who I have followed successfully, thinks we should also perform some inexplicable magic with **@babel/preset-env** in our **.babelrc**:

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": [
                        ">0.25%",
                        "not ie 11",
                        "not op_mini all"
                    ]
                }
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        ["@babel/transform-runtime", {
            "regenerator": true
        }]
    ]
}
```

Note that we also created or updated our **plugins** section of **.babelrc**. (Is **@babel/plugin-proposal-class-properties** needed in **.babel.rc**?)

**NOTE**: _One advantage of using **async/await** when calling **fetch** is that you can write **this.setState** rather than **that.setState** On the other hand, **fetch** is not a method that usually benefits much from async/await since it is rarely part of a set of nested callbacks. **fetch** without **async/await** takes some getting used to, but once you understand it, it rarely is a source of confusion._

## Push Container

Try something like this:

    docker tag week04-docker-composer_main:latest charliecalvert/dcmain:first
    docker push charliecalvert/dcmain

## Turn it in

Tag and push with script:

- Tag your repo "Submitting midterm"

If you need to resubmit, then you could write something like: "Submitting midterm for the second time"

Probably a good idea to include a screenshot as well. Make sure **prettier** and **eslint** can be run without generating errors or warnings.

## Reset

I ended up with two **reset** files. This one I call **reset** and it is the one I use most often:

```bash
#! /usr/bin/env bash

docker-compose down
```

Here is one I call **reset-hard**, and I think you should use it and then **build** before you turn in your assignment. I can't justify that logically, it just seems wise to me to be sure you know your containers can be built entirely from scratch:

```bash
#! /usr/bin/env bash

docker container stop week04-docker-composer_main_1
docker container rm week04-docker-composer_main_1
docker image rm week04-docker-composer_main

etc...
```

Where I write "etc..." you need to write code to completely delete **system-environment** and **route-tester**. It is very similar to the code shown in the first three active lines of the script.

<!--       -->
<!-- links -->
<!--       -->

[gitdm]: https://www.elvenware.com/teach/assignments/docker/GitIgnoreTestDockerMicro.html
[dc]: https://www.elvenware.com/teach/assignments/docker/DockerCompose.html
[rb]: https://www.elvenware.com/teach/assignments/react/RestBasics.html
[smt]: https://www.elvenware.com/teach/assignments/linux/ScriptMasterTags.html

[sc]: https://www.elvenware.com/teach/assignments/Aws/SystemCheck.html
[scr]: https://www.elvenware.com/teach/assignments/Aws/SystemCheckRefactor.html
[awsp]: https://www.elvenware.com/teach/assignments/Aws/Ec2ProvisionRepo.html

[mtsc]: https://s3.amazonaws.com/bucket01.elvenware.com/images/midterm-system-check.png

[ec2f]: https://www.elvenware.com/teach/assignments/Aws/Ec2CopyFile.html
[ec2c]: https://www.elvenware.com/teach/assignments/Aws/Ec2CopyFile.html#copy-file-to-ec2
[arssr]: https://www.elvenware.com/teach/assignments/Aws/AwsRunSshScript.html#server-side
[arss]: https://www.elvenware.com/teach/assignments/Aws/AwsRunSshScript.html

[ssh2]:
