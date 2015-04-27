# Git Tag

Tagging can help you keep track of specific versions of your repository. Read about it online:

- [Tagging](http://git-scm.com/book/en/v2/Git-Basics-Tagging)

## Step 01
 
Create a tag and push it.

    git tag -a v00.01.00 -m "Week 01"
    git push origin v00.01.00

## Step 02 

Now create a file called **v00.02.00-lastname**, where lastname is your lastname. Commit your work. Like this:

    echo foo > v00.02.00-calvert
    git add v00.02.00-calvert
    git commit -m "v00.02.00-calvert"
    git push

## Step 03

Add a new tag tag:
    
    git tag -a v00.02.00 -m "Week 02"
    git push origin v00.02.00

## Step 04

Check out your repository in a new branch as it was before you created the v00.02.00-lastname text file:

    git checkout -b version1 v00.01.00


Type **dir** to see that there is indeed no copy of **v00.02.00-lastname** in this branch. Take screen shot. 

## Step 04

Now switch back to the master branch:

    git checkout master

Type **dir** and take another screenshot. 

## Step 05

View your two branches:

    git branch

View your tags:

    git tag

Take a screen shot showing the output from the two **git branch** and **git tag** commands.

 
 
## Turn it in


Turn in your three screen shots. You can simply attach them to your assignment when you submit it.

**NOTE**: *Do not embed your screen shots in a Word document. Simply submit the raw PNG or JPG files. I don't think there will ever be an occasion in this course when you should embed a screen shot in a Word document. I cannot easily see the details of a complex screen shot if it is embedded in a word document, so it will be considered an error if you do submit an assignment that way. If you do use a Word document or similar vehicle, I will probably, at minimum, ask you to resubmit the assignment.*   

When you are done, switch back to your main branch:

    git checkout master

You can see what branches are available by typing:

    git branch 
