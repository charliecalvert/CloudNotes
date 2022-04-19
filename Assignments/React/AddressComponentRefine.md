---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/AddressComponentRefine.md
relativePath: Assignments/React/AddressComponentRefine.md
title: AddressComponentRefine
queryPath: Assignments/React/
subject: React
fileNameMarkdown: AddressComponentRefine.md
fileNameHTML: AddressComponentRefine.html
---


<!-- toc -->
<!-- tocstop -->

# Address Component Refine

Clean up the Address Program

## Goals

- New name for folder: CongressAddress
- Include svg image and **images** and **css** folders.
- Divide up tests into one test file per component.

## Rename

Change the name of the folder in which the program is stored:

  git mv week02-react-jest/ CongressAddress

## Images and CSS

  I found images here:

  - <https://pixabay.com/en/gold-fish-aquarium-goldfish-fins-30831/>
  - <https://pixabay.com/en/goldfish-fins-tropical-animal-47022/>
  - <https://commons.wikimedia.org/wiki/File:Small_SVG_house_icon.svg>
  - <https://commons.wikimedia.org/wiki/File:Flower-of-Life-91circles36arcs.svg>
  - <https://commons.wikimedia.org/wiki/File:Tree-of-Life_Flower-of-Life_Stage.svg>
  -
  Try also, this search in Chrome/Chromium:

  ```
  https://www.google.com/search?q=svg+free+small
  ```

  In Google, turn to the images page. Select tools, and select **Labeled for non-commercial reuse** or something similar.

  Also, let's put our images and CSS in their own folders:

  - **src/css**
  - **src/images**

  You will need to make some changes to your code after doing this. In fact, you may have to play with these paths several times over the course of this assignment.

## Create CSS and Image Directories

Inside the **src** directory create directories called **css** and **images**. Move your CSS and SVG files into these directories. Check your tests and run your program and make sure you are not getting errors or warnings.

- Start your program: npm start
- In Chrome, open the Developer Tools: F12 or CTRL-SHIFT-I or **Settings | More Tools | Dev Tools**
- Check for warnings or errors

![Uh-oh! A warning][dtw]

**IMAGE**: _Uh-oh! To fix this, I would follow the hints in the warning to my **src/index.js** file._

![Same warning from command line][warncmd]

**IMAGE**: _The same warning as seen from the command line. Sometimes you might see problems at the command line that you don't see in the developer tools and vice versa. As you result, you should check both places._

When you turn in your code, you should always strive to ensure that your program is completely free of warnings and errors.

[dtw]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-refine-warn.png

[warncmd]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-refine-cmdw.png

## Modular Tests {#modular-tests}

Divide up your tests so that each set of tests is in its own folder. To some degree, exactly how you do this is a judgment call. But for now, a simple heuristic would be to put all tests **Address** component in a file called **Address.test.js**, those for the Header in the **Header.test.js**, and so on.

At some point, you should move all your tests into a folder called **src/__tests__**. That's two underscores, the word tests, followed by two more underscores.

[Project Structure][proj-struct]

[proj-struct]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-refine-project.png

## Turn it in

Commit, push. When you turn in the assignment, designate the directory in your repo where you did your work.
