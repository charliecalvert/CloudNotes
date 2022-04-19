---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog272/Prog272Final2018.md
relativePath: Prog272/Prog272Final2018.md
title: Prog272Final2018
queryPath: Prog272/
subject: Prog272
fileNameMarkdown: Prog272Final2018.md
fileNameHTML: Prog272Final2018.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

The main goal is to integrate the code from the Small Address program into Address Maven.

I'll also be looking at:

- ESLint
- Prettier
- Tests and coverage
- EC2

## Database Steps

I'll do something like this:

1. Look to see if you told me what folder you want me to look at.
2. Go to that folder and start your program.
  1. I'll also start CongressServer
3. Empty Storage and any database with your name on it in CouchDB
4. Go to your **InitializeDatabase** page and run:
  1. Get Address List
  2. Convert Address
  3. Create Index
5. Go to the **Address** page and:
  1. Iterate
  2. Edit
  3. Delete
6. Go back to **InitializeDatabase** and sync.
7. Open a second browser, go to your app and sync
  1. Then repeat Step 5.
8. Run your tests
9. Check for coverage and note in README about coverage.

## Database Name

Include your lastname in your database name. For instance:

```
address-list-lastname
```

## Coverage

Run coverage at least once on your project. Go ahead and tweak .gitignore if necessary and check in your coverage directory. I'll look for it when grading.

Add **coverage** to **.eslintignore**. We don't need to run eslint on the files you generate when you run coverage.

To run coverage:

```
npm/yarn test --coverage
```

## Testing

Get at least 20 test to pass.

Don't include **PouchDbManager** and **InitializeDatabase** in your tests nor in **coverage**.

## Address Native

Have **CongressServer** running on EC2 so that it will be accessed from your copy of Address Native when I run it.

Have Node Routes Basics running on EC2.

## Extra Credit

Get AddressMaven and CongressServer running on EC2 and give me a link to your running app.

## Turn it in

- AddressMaven should run
- prettier should pass
- eslint . should pass
- 20 Tests should pass.
- coverage
  - I don't really care what percentage of coverage you have.
  - In your README.md file, list the three files you created with the highest coverage.
  - Extra credit, get 80% coverage on all your files.
  - Estra Credit AddressMaven on EC2

## Grading

In the table below, if you got it right, you get a zero. If something went wrong, then you lose a certain number points up to the number shown below. Extra Credit you gain points. The graph below shows the estimated max points off you can get for each feature.

| Skill              | Points Off     |
| :----------------  | :------------- |
| Congress Server    | -3  |
| AddressMaven       | -20 |
| Material UI Update | -3  |
| PouchDB            | -5  |
| CouchDB            | -5  |
| ESLint             | -3  |
| Prettier           | -3  |
| 20 Tests           | -10 |
| Coverage           | -3  |
| EC2 CongressServer | -5  |
| EC2 NodeRouteBasics| -5  |
| Address Native     | -2  |
| EC2 AddressMaven   | +3  |

| Total              |     |

This means that if you turn in a final that does anything like what I want, the lowest score you can get is a 33. If the final is a complete failure, for instance a default **create-react-app** program with no changes, I might go lower than 33. But if you made some real effort to complete the final, 33 is the lowest possible score.

## Links

Read about the PouchDb, IndexedDB and CouchDB [Data Cycle][pdbd].

[pdbd]: /teach/assignments/react/ReactAddressEditDialog.html#data-cycle
