## Overview

Create a program that will allow us to check various system services by running scripts.

This program should be setup as a service running on port 30032

## Get Started

		mkdir week07-system-check

		cd week06-system-check/

		git-gist

Run the **Create Concurrently** option and then exit **get-gist**.

Run **./elf-concur** to create the server and client. When prompted, choose **s** for server.

After **elf-concur** completes, immediately, before doing anything else, go on to the _Commit and Tag_ step. Complete that step before doing anything else.

## Commit and Tag

Immediately after **elf-concur** completes, commit and tag your work.

Use exactly this commit message: "Finished elf-concur for SystemCheck."

Then tag your work, following this template as closely as possible:

		git tag -a vXXX -m "Finished elf-concur for SystemCheck on branch <BRANCH_NAME>."

I don't care what the version number for your tag is, but specify the name of the branch where you are working in the appropriate place.

**NOTE**: _It's probably clear that I want to be able to confirm that you are starting your project from scratch. This is an important part of this process, so be sure to follow my guidance._

## Set up systemd

Before doing anything else, let's set up systemd.

Run **get-gist** and select "Elven Node systemd Tools" or similar from the menu.
