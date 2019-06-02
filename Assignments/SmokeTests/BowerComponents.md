## Overview

Our goal is to clean up **.bowerrc**. A number of students have **.bowerrc** files that reference a directory called **components**. It should be **bower_components**.

In **.gitignore**, **.prettierignore** and **.eslintignore** and probably elsewhere we specifically talk about **bower_components**. Your **.bowerrc** must reference that directory.

## The Script

I've put together a hasty script to help you check for faulty .bowerrc files. It looks like this:

- [Bower Components Script](https://github.com/charliecalvert/JsObjects/blob/master/Utilities/Templates/Scripts/bower-components)

Go to JsObjects and run **git-pull-and-set-symbolic-links**:

    jo
    git pull
    ./git-pull-and-set-symbolic-links

You can skip the second step if have pulled recently.

## Run the Script

Here is a typical run from the root of a repository:

```nohighlighting
$ bower-components
Here are all the .bowerrc files found:
---------------------------------------
./week03-rest-basics/Micros/git-gist/.bowerrc
./week03-rest-basics/Micros/git-user/.bowerrc
./week03-rest-basics/Micros/qux/.bowerrc
./week03-rest-basics/server/.bowerrc
./week03-concurrently/server/.bowerrc

---------------------------------------
This is what what we want to see. All .bowerrc should be in this list:
---------------------------------------
./week03-rest-basics/Micros/qux/.bowerrc:  "directory": "public/bower_components"
./week03-rest-basics/server/.bowerrc:  "directory": "public/bower_components"
./week03-concurrently/server/.bowerrc:  "directory": "public/bower_components"

---------------------------------------
Items appearing below here are errors, it should be an empty list.
---------------------------------------
./week03-rest-basics/Micros/git-gist/.bowerrc:  "directory": "public/components"
./week03-rest-basics/Micros/git-user/.bowerrc:  "directory": "public/components"
```

The script first finds all the .bowerrc files and lists them. Then it finds those it thinks are correct. Then it finds those it thinks are incorrect.

## Turn it in

Fix the broken **.bowerrc** files.

Search for folders called **components** using our **FindNp** script:

```nohighlighting
$ FindNp "components"
./week03-rest-basics/client/src/components
```

Use **git rm -r components** or some similar command to ensure that you are not checking in any **components** folder that may have been created.    

I don't want to get too obsessive, but this should, at least in theory, but run in every branch. Do what you think will work to ensure I don't see any **components** folders when grading your work. For instance, it would not be good to have a **components** folder in your midterm or final.
