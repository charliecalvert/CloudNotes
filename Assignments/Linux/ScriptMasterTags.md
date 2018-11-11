## Overview

Our goal is to make it simple to commit and push our work, providing:

- A string for our commit message
- A string for our tag message
- A version number for our tag that is autoincremented with each commit.
- A reference to the current branch in both the commit and tag message.

- [Rename a tag](https://stackoverflow.com/a/5719854/253576)

## Prime the Pump

Our script will not work if there are no tags. In other words, you have to create the first tag yourself with code like this:

    git tag -a v0.0.1 -m "Tagging the initial commit"
    git push origin v0.0.1

Our script assumes that version numbers take this form:

    vX.Y.Z

In other words, they start with a V.

We also assume that they are ascending numbers. We assume the first tag has a version number lower than the second, and so on.

This is not very robust, but it meets our purposes.    

## Parameters

Our script will be passed two parameters:

- The first is the commit message.
- The second is the name of the project you are working on.

For instance:

    elf-tagger "This is my commit message" "week01-my-project"

Here the commit message is "This is my commit message." The project is "week01-my-project".

Create script called **elf-tagger**. Put this at the top:

- **#! /usr/bin/env bash**.

Our script might blow up if we do not have both of these parameters. Here is how to detect if you have one parameter:

```bash
if [[ -z $1 ]]; then
    echo -e "You must pass in one parameter"
    exit
fi
```

The **-z** option asks if the length of a string is zero. Type **man test** at the bash prompt to look this up.

In this case, the **$1** code is the first parameter to passed to our script.

The call to **exit** tells the script to bail, to terminate immediately.

So here is how to test if the user passed in two parameters:

```bash
if [[ -z $2 ]]; then
    echo -e "You must pass in a commit message and the project name"
    exit
fi
```

It is not likely the user will pass in three parameters, but it is likely they will forget to put quotes around the strings the pass in. This will make it appear that they meant to pass in more than two parameters. Here is one way to test that the user passed in more than two parameters:

```bash
if [[ ! -z $3 ]]; then
    echo -e "Too many parameters"
    exit
fi
```

The bang (!) here negates the statement. So we are saying, in effect, if the third parameter exists, that is, if it has more than zero characters, then terminate the script.

With these two tests out of the way, we are ready to begin writing our script.

## Get Branch Name

Just use this method. It is quite advanced and you don't need to understand it:

```bash
# IFS is the default separator of white space
# BASH_REMATCH gets the first Regular Express match
function git_branch {
  local git_status="$(git status 2> /dev/null)"  
  local on_branch="On branch ([^${IFS}]*)"  
  local on_commit="HEAD detached at ([^${IFS}]*)"

  if [[ $git_status =~ $on_branch ]]; then
    local branch=${BASH_REMATCH[1]}
    echo "$branch"
  elif [[ $git_status =~ $on_commit ]]; then
    local commit=${BASH_REMATCH[1]}
    echo "$commit"
  fi
}
```

When you call the method, it will return the name of your current branch. You need, of course, to be in your repository when you make the call. The script does not need to be kept in your repository, but your current working directory when you call the script should be inside your repository.

## Increment Version

Here is how to get a list of tags:

    git tag

Here is how to get the last item from the list:

    git tag | tail -1

And here is how to strip off the v from version numbers such as v1.0.0

    git tag | tail -1 |  sed -En "s/v(.*)/\1/p"

We use said to find the values after the v, and then we return that value. In effect, we are saying this:

    sed "s/v(1.0.0)/\1/p"

The \1 means to get the value in parenthesis. All this is regex and I'm not going to explain it here.

So we get the current largest tag version like this:

    OLD_TAG_VERSION=`git tag --sort=taggerdate | tail -1 |  sed -En "s/v(.*)/\1/p"`

Then we use the **semver-inc** script from the latest JsObjects (git pull) to increment the patch value of the tag:

    TAG_VERSION=v`semver-inc -p $OLD_TAG_VERSION`

Now we get the branch:

<pre>
BRANCH=&#96;git_branch&#96;
</pre>

And put it altogether to see the message we are going to use on our commit and tag:

    TAG_STRING="$1 for $2 on branch `git_branch` with tag ${TAG_VERSION}."
    echo $TAG_STRING

We echo it out as a sanity check.

## Push and Tag

At this point, we have everything we need to do our actual work. The last step is to write a bash function that calls:

- git add
- git commit
- git push

Then we call git tag, passing in -a and -m as we have done multiple times.

```bash
function push_tag() {
  git status
  # You call git add and commit. Commit is the tricky one.
  # Here is push:
  git push --set-upstream origin ${BRANCH}

  git tag -a "${TAG_VERSION}" -m "${TAG_STRING}"
  git push origin "${<WHAT GOES IN HERE TO GET THE TAG VERSION?>}"
}

push_tag
```

And that is the end of our script.

## Turn it in

In your repository, create a directory called **scripts**. Save the script your created as **elf-tagger** and put it in your scripts folder. Create a symbolic link from the bin directory to your script.

Use the script to add, commit and push your work, and then tag it.

The command should be:

    elf-tagger "Finished elf-tagger" "scripts"
