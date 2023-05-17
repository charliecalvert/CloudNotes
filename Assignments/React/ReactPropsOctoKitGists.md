---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactPropsOctoKitGists.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/React
fileName: ReactPropsOctoKitGists.md
relativePath: /React/ReactPropsOctoKitGists.md
title: ReactPropsOctoKitGists
directoryName: React
category : react-guide
---

## Overview

Learn to use OctoKit:

- [The OctoKit Docs](https://octokit.github.io/rest.js/#usage)
- [The OctoKit Repo](https://github.com/octokit/rest.js)
- [GitHub mentions OctoKit prominantly](https://developer.github.com/v3/libraries/)

I'm expecting to find your work in branches **week08** and **master**. Work mostly in **/micros/git-gist/routes/index.js**.

Log into your account on GitHub and create a secret, hidden Gist with exactly these properties:

- description: **Private Gist for Testing**
- file name: **elf-private.js**

Add one comment exactly like this to it: **This is my comment**.

Now create a public gist exactly like this:

- description: **Public Gist for Testing**
- file name: **elf-public.js**

Add one comment exactly like this to it: **This is my comment**.

## Get Started

Run some installs:

    npm i @octokit/rest
    npm i supertest

## Sanity Tests

Make sure JsObjects is up to date.

Create a directory called **micros/git-gist/sanity-tests**. Navigate into it. Run **get-tests**. Select the menu item labeled:

- Isit322 Midterm Git Gist

This should place a file called **Sanity.GetGists.test.js** in your **sanity-tests** folder.

Get the tests to pass.

Add a test item to the **scripts** section of **/micros/git-gist/package.json**:

    "test": "jest"

## Hints

Import Octokit into your **routes/index.js** as per the docs.

In the **constructor** for Octokit, I managed to get signed in by providing these properties in an object literal:

- **type** set to **'token'**
- **auth** set to my token
  - Consider using symbolic links so you have only one token file in your Git Explorer project.
- **username**: Your github user name.

The specific example I outline above is not in the docs, but you can read the docs [here](https://octokit.github.io/rest.js/#authentication).

In my implementation of both routes found in the tests, I used the call labeled like this in the [OctoKit docs][octo-gists] on handling Gists: _List the authenticated user's gists or if called anonymously, this will return all public gists_. This was the second call described in the set of calls under Gists. Of course, we are not calling it anonymously because we are logged in per the description of the **constructor**.

## Turn it in

Make sure eslint and prettier come back clean.

Push and then tag your work and tell me branch, directory and tag.

[octo-gists]: https://octokit.github.io/rest.js/#octokit-routes-gists
