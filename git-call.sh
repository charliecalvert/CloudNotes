#! /usr/bin/bash
pwd

# see `git help log` for detailed help.
#   %h: abbreviated commit hash
#   %d: ref names, like the --decorate option of git-log(1)
#   %cn: commiter name
#   %ce: committer email
#   %cr: committer date, relative
#   %ci: committer date, ISO 8601-like format
#   %an: author name
#   %ae: author email
#   %ar: author date, relative
#   %ai: author date, ISO 8601-like format
#   %s: subject

# git log /home/ubuntu/Git/CloudNotes/elvenware/About.md
# git log $1
# git log --pretty=fuller $1
# git log --graph --pretty=format:'%C(auto)%h%d (%cr) %cn <%ce> %s' $1
git log --pretty=format:'%ci' $1
