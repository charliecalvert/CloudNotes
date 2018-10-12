# Cloud 9 Intro

It will be simplest if you first, set up a Git repository as explained in the [Git New Repo][gnr] assignment.

Once you have the repository on GitHub, then next step is to set up Cloud 9. It is possible to join Cloud 9 for free if you get an invitation from me. I'm taking advantage of a deal which allows me let in as many students as I wish. When you get the invitation, click on the link provided.

[Sign into Cloud 9][c9login].

## Connect Cloud9 and GitHub

Once you are signed into Cloud9, you can connect the Cloud9 service to GitHub like this:

- Choose the gear icon in the upper right portion of the page.
- Select **Connected Services**
- Connect to GitHub by selecting the appropriate button and following the prompts.

You will also have to hit the gear icon a second time in Cloud9, go to the Cloud 9 SSH services, copy the public key that Cloud 9 gives you, and paste it into GitHub. (Choose the icon at the top right of the GitHub site, choose Settings, and then SSH.)

## Create Workspace

If you have not done so already,

- In Cloud 9 hit the Plus icon next to the **Bellevue College Dev Team Option** found on the [c9 home page](https://c9.io).

Create
  - new NodeJs private workspace
  - Based on your GitHub repository
    - Go to GitHub and copy the URL for your repository.
    - Put it in the field labeled **Clone from Git or Mercurial URL**.
  - If you have no GitHub repository then first complete the [Git New Repo][gnr] assignment.

Set up a workspace based on your repository. Typically, your repository will have a name like this, where **lastname** should be your lastname:

- **prog209-lastname-2018**
- **prog272-lastname-2018**
- **isit320-lastname-2018**
- etc...

Be very careful to get the casing and characters right. Use this as a guide:

* [Cloud 9 Slides](http://bit.ly/elf-cloud9)

## Getting Started

Your workspace should incode NodeJS and NPM. Thus you can skip any prompts to set up and run Node JS and NPM.

Now take three screenshots and attach them to your assignment.

- After you are logged in to Cloud9
  - take a screen shot showing that you are logged on
- Connect to your repository and create a Cloud 9 WorkSpace based on it.
  - Take a screenshot of the dashboard showing your workspace
- Open your workspace and open a file from your repository. At minimum, you should have a **README.md** file in your repository.
  - Take a screenshot showing the open file and the project Workspace file hierarchy on the left.

  The screenshot you want to create will be similar to, but not identical too, the image shown below:

  [![Cloud9Small][cloud9Small]][Cloud9]

  **Image01**: *The Cloud 9 IDE. Click the image above to expand it.*


## The .gitignore file

Make sure that your repository contains a **.gitignore** file with a section that at minimum looks like this:

```
# IDE Files
.idea
.c9

# Other
node_modules
bower_components
```

## Going further.

Students in Prog109 are now done with this assignment.

Students in other classes, may, if I specifically request, do the [advanced Cloud9 Setup][ac9].
## Turn it in

Submit your work and attach the screenshots.

<!---------------------------->
<!-- Links in this document -->
<!---------------------------->

[ac9]: CloudNine/CloudNineAdvanced.html
[gnr]: https://www.elvenware.com/teach/assignments/GitNewRepo.html

[c9login]: https://c9.io/login
[cloud9]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9Intro01.png
[cloud9Small]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9IntroSmall01.png
[jsobjects]: https://github.com/charliecalvert/JsObjects/blob/master/README.md

[webpack-c9]: https://github.com/webpack/webpack-dev-server/issues/230
