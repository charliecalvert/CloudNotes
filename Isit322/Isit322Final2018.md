## Overview

The main goals of the 2018 Final for Isit322 are to:

- Create a working GitExplorer integrated with PouchDB.
- Create a working NativeExplorer
  - I'm not expecting PouchDB here, but if you can do it, great.
- Have at least 20 tests running on GitExplorer
  - Get at least 10 tests running for Native Explorer

## Database Steps

I'll do something like this when looking at GitExplorer:

1. Look to see if you told me what folder you want me to look at.
2. Go to that folder and start your program.
  1. I'll also start servers and microservers
  2. You must provide a script called **build-it** that will build your servers and microservices. Then concurrently should start them all. Make sure the script has executable permissions. Git will preserve them. Put the script in your the directories where your final lives.
3. Give me the address of CouchDB running on EC2. Point me at Fauxton or Futon.
  1. http://xx.xx.xx.xx:5984/_utils
3. Empty Storage and any database with your name on it in CouchDB
4. Go to your **InitializeDatabase** page and run:
  1. Get Gist List
  2. Convert Gist
  3. Create Index if you want one.
5. Go to the **GistLister** page and:
  1. Iterate
  2. Edit
  3. Delete
6. Go back to **InitializeDatabase** and sync.
7. Open a second browser, go to your app and sync
  1. Then repeat Step 5.
  2. I'll look in CouchDb and confirm that things are looking okay there.
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

## Address Native

Have your servers and microservers running on EC2 so that it can be accessed from Address Native.

Have Node Routes Basics running on EC2.

## Testing

Get at least 20 test to pass.

Don't include **PouchDbManager** and **InitializeDatabase** in your tests nor in **coverage**.

## Turn it in

- Link to GitExplorer Running on EC2
  - Don't install CouchDB, I won't test Sync on EC2. I'll only test Sync locally on my machine.
- **prettier** should pass
- **eslint .** should pass
- coverage
  - I don't really care what percentage of coverage you have.
  - In your README.md file, list the three files you created with the highest coverage.
  - Extra credit, get at least 80% coverage in all your files.

State:

- Branch: Final
- Folder: GitExplorer
- Tag: vX.X.X

## Data Details

I want you to be able to do offline and online editing of some data that you pull from GitHub. We should be able to edit records found in **IndexedDb** and in **CouchDB**. We are not, however going to try to push this data back to GitHub.

For now, I suggest that we just just download the data we get when we ask for information on Gists. This would be the fields we see in routes/gists.js:

```javascript
const results = data.map(item => ({
    htmlUrl: item.html_url,
    id: item.id,
    gitPullUrl: item.git_pull_url,
    description: item.description,
    ownerLogin: item.owner.login,
    avatarUrl: item.owner.avatar_url,
    files: Object.keys(item.files)
}));
```

We can store all those fields in the CouchDB database and in IndexDB. We can also edit, delete and refresh them.

The most difficult one would be files if we were storing more than one file in a gist. But I am not in any of my examples and I would settle for the first file if you have gists with more than one file.

## Testing Hints

There are some hints on testing that can be found [here][th].

## Links

Read about the PouchDb, IndexedDB and CouchDB [Data Cycle][pdbd].

[pdbd]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressEditDialog.html#data-cycle

[th]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/GitUserTesting.html
