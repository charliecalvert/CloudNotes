## Overview

The midterm is an an extension of the [GitIgnoreTestDockerMicro][gitdm] and [DockerCompose][dc] assignments. In some cases, students have used [RestBasics][rb] rather than **DockerComposer**.

The goal will be to create a program that will allow us to query both the status of the current system, and a system running on EC2. The code should compile cleanly with no errors or warnings from **prettier** or **eslint**.

The screenshot is designed only to give you a general idea of where I would like to take this program. I haven't finished my version yet, so this is incomplete, but it gives you a good starting point. If you imitate this look and feel you should not have to undo anything, only add more.

![Midterm System Check Interface][mtsc]

## Images

These images are meant as rough guidelines or inspiration, there is no need to duplication them exactly. Indeed you can, within reason, do more or less what you want inside your React components, so long as you display data similar to that shown here. The data matters, not the format, but of course your data probably does not look exactly like mine.

**NOTE**: _Additional detail on these images is available in [GitIgnoreTestDockerMicro][gitdm]._


A single React component and displaying a bit of information gleaned from the **System Environment** container:

![Git React Get Branches][dcgrgb]

Here we check all branches for things missing from **.gitignore** and find that **.c9** is missing from **.gitignore** in the **week01** branch:

![Git React Missing C9][mc9]

## Four Tasks

In the image shown above the react component in **main** application calls into **system-environment** and performs three tasks:

- You Rang: Call **/you-rang**.
- Get Branches: Call **/getBranches** and display the branches in your repository.
- The Git Ignore Tests: For each branch, test the **.gitignore** file to be sure it contains all the strings we want it to contain.

The first two are, I believe, self explanatory. The third requires that you:

- Call **getBranches** to get an array of branches.
- Loop over the array and use the magic of async/await to allow you to call code that:
  - switches to a new branch
  - runs your **gitIgnoreTest** in the new branch

Here is a hint.

```javascript
for (let branch of allBranches) {
    console.log('BRANCH', branch);
    someInfo += await SomeAsyncAwaitFunc();
    const someMoreInfo = await SomeOtherAsyncAwaitFunc();;
    // Store return values in a structure such as an Array.
}
```

Of course, this code is not valid, you need to call the appropriate functions and handle their return values.

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

At this point, you should again check that you have completed the [Script Master Push and Tag][smt] assignment.

Push and tag:

    elf-tagger "Completed Midterm setup phase" "midterm"

## Push Container

    docker tag week04-docker-composer_main:latest charliecalvert/dcmain:first
    docker push charliecalvert/dcmain

## Turn it in

Tag and push with script:

- elf-tagger "Completed midterm" "midterm"

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
