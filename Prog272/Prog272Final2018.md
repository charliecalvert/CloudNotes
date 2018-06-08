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

Have **CongressServer** running on EC2 so that it can be accessed from Address Native.

Have Node Routes Basics running on EC2.

## Extra Credit

Get AddressMaven and CongressServer running on EC2 and give me a link to your running app.

## Turn it in

- prettier should pass
- eslint . should pass
- coverage
  - I don't really care what percentage of coverage you have.
  - In your README.md file, list the three files you created with the highest coverage.
  - Extra credit, get 80% coverage on all your files.
