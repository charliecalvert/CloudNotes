## Overview

THIS IS A WORK IN PROGRESS. IT IS NOT THE FINAL FINAL, BUT HOPEFULLY CLOSE ENOUGH TO LET YOU GET STARTED.

The goal of the final is to demonstrate your ability to deploy web sites to the cloud. In particular, I want to see:

- WebCrafts working
- The specified tests working
- Code running on EC2
- Code running on the Firebase site
- Docker Container running on Port 30028

Please get the FirebaseReact assignment melded into your WebCrafts assignment.

## The Config File

Place your working ElvenConfig.json file in a folder of your repository called **ElvenConfig**. Include a section of the users node called **lastname**, where lastname is your last name. For instance, if your last name is Smith:

```json
{
  "users": {
    "calvert":{...},
    "smith": {...}
  },
  "selectedElvenImages": [...],
  "elvenImages": [...]
}
```

Go through your tests and find the places where the 'calvert' user is being used explicitly, and replace it with your last name. For instance, replace it with Smith.

The goal is to allow me to insert your lastname section in my ElvenConfig file and have it work out of the box.

Make sure the most recent Config file is on EC2.

When I run **Week10-FirebaseReact**, turn to the **Show Users** page and click a button, I expect them to be configured to use **/home/ubuntu**.

Here is how to change all instances of **bcuser** to **ubuntu** inside the **ElvenConfig.json** file:

    sed -i "s/bcuser/ubuntu/g" ElvenConfig.json

## Merge Code you Forked1

Be sure to merge in the latest changes from the repositories that you forked. I made changes as recently as November 29, 2017, but may do more.

If you have things set up correctly, per the [UpToDate][wu] assigment, it should be relatively easy to **fetch** and **pull**.

The Atom editor makes merging conflicts easier:

![Atom makes merging easy][am]

## Tests

The following programs should the specified number of tests passing.

## Firebase

Part of the security mechanism for Firebase is to make sure that the app can only be run from authorized locations. When you move to EC2, you might get an error like this one: **uncaught exception: Error: This domain (34.333.134.3) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.**

![Firebase EC2 Error][fbe]

When adding the domain, use the long name from EC2. It looks something like this:

    ec2-34-233-323-3.us-west-2.compute.amazonaws.com

You can find it on the AWS EC2 **instances** page.

## EC2 Ports and Security Groups

View your EC2 instances **inbound rules** and make sure 30025, 30026 and 30027 are listed as open:

- [Details are here][ecsg]

## Turn it in

Here is a preliminary list of what I'm looking for:

- Webcrafts should work
  - Markdown to HTML
  - Images to HTML
- On EC2 and kept running with **systemd**
  - WebCrafts running on port 30025
  - Firebase React on 30026
  - Firebase Express (the HTML version) on 30027
  - Send me the link to the long name for your app:
    - ec2-xxx-us.west-2-compute-amazonaws.com:3002X.
  - Install Apache and after I run WebCrafts I should be able to see pages there.
- Repositories:
  - Webcrafts
    - Webcrafts
    - isit-code
    - isit-site-tools
  - Main Repository:
    - ...
- Firebase
  - Load code that allows me to log in
- Tests
  - Read the tests section above and make sure you meet the requirements

For all the code I need to see:

- repository
- directory
- branch

I'm expecting to find your _final_ code in **master**, but it would not be a serious mistake to have it elsewhere so long as you say where. If you don't say where, I will look only in master. But I want to see that you have been working in various branches with checkin dates distributed throughout the quarter.

## Long Link to EC2

This is reminder to send me the long link to your EC2 instance. It might look a bit like this:

- ec2-xxx-us.west-2-compute-amazonaws.com.

## Attitude

Complete as much of the exam as you can. It is better to get it in, and get it in more or less on time, than to spin trying to complete something you don't understand.

I'm mostly interested in seeing that you:

- Show clear evidence that you learned something
- Did the homework more or less on time
- Came to class

Students start in different places. I'm looking for evidence that a student worked hard and learned something new rather than being overly concerned with whether they can complete each assignment perfectly.

When I was growing up, A's were not fetishized. People could and very frequently did get into Ivy League colleges with a B average. Today, in the technical world, what matters is the interview, not your grades. As a result, I try to keep things simple and give students the grade they deserve.

## Server Ports

Make sure programs that run on a server port such as 30026 are set up like this in **www/bin**:

```javascript
var port = normalizePort(process.env.SERVER_PORT || '30026');
```

Note that we are using **SERVER_PORT** rather than **PORT**.

## Gratuitous Hint

Fancier Bash hints on current repo. Near top of **.bashrc**:

```bash
COLOR_RED="\033[0;31m"
COLOR_YELLOW="\033[0;33m"
COLOR_GREEN="\033[0;32m"
COLOR_OCHRE="\033[38;5;95m"
COLOR_BLUE="\033[0;34m"
COLOR_WHITE="\033[0;37m"
COLOR_RESET="\033[0m"

function git_color {
  local git_status="$(git status 2> /dev/null)"

  if [[ ! $git_status =~ "working directory clean" ]]; then
    echo -e $COLOR_RED
  elif [[ $git_status =~ "Your branch is ahead of" ]]; then
    echo -e $COLOR_YELLOW
  elif [[ $git_status =~ "nothing to commit" ]]; then
    echo -e $COLOR_GREEN
  else
    echo -e $COLOR_OCHRE
  fi
}

function git_branch {
  local git_status="$(git status 2> /dev/null)"
  local on_branch="On branch ([^${IFS}]*)"
  local on_commit="HEAD detached at ([^${IFS}]*)"

  if [[ $git_status =~ $on_branch ]]; then
    local branch=${BASH_REMATCH[1]}
    echo "($branch)"
  elif [[ $git_status =~ $on_commit ]]; then
    local commit=${BASH_REMATCH[1]}
    echo "($commit)"
  fi
}
```

Below the PS1 statements and right before **unset color prompt** :

```bash
PS1+="\[\$(git_color)\]"
PS1+="\$(git_branch)"                       # prints current branch
PS1+="\[$COLOR_BLUE\]\n\$\[$COLOR_RESET\] "   # '#' for root, else '$'
```

## Close Down EC2 Instances

You can keep, delete, mangle, change in whatever way you want your EC2 instances after December 11, 2017. See the Canvas announcement on this subject for more information.

[ecsg]:http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2GetStarted.html#step-04-b-security-groups
[wu]: http://www.ccalvert.net/books/CloudNotes/Assignments/WebCrafts/WebCraftsUpToDate.html
[am]: https://s3.amazonaws.com/bucket01.elvenware.com/images/up-to-date-merge-atom.png
[fbe]:https://s3.amazonaws.com/bucket01.elvenware.com/images/firebase-not-auth.png
