## Overview

**NOTE**: _This is a very rough outline of where I am headed for the midterm. You can probably only take a few preliminary steps at this time._

There are new sanity tests as of May22 9:30 PM.

There are two parts to the Midterm. Some of them have not been covered in class yet, but they will be covered this week. By outlining the midterm now, I'm making clear to you what you will need to know finish the midterm.

In particular, you will need to learn about two subjects:

- [Reading files with the NodeJs File System library][fs]
- [Local Storage][ls]

Perhaps you'll want to create something like this:

<img class="sizer" alt="React Address Show Fields" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/address-maven-address-show-2019.png" />

## Address Data

We will need at least a few addresses that we can use in the Midterm. Please use these addresses exactly as they appear here. Save this code as **routes/address-list.json**. As explained below, you will load this data on the server side, from an endpoint in **routes/index.js** called **/get-address-list**.

```json
[
	{
		"firstName": "Lamar",
		"lastName": "Alexander",
		"street": "455 Dirksen Senate Office Building",
		"city": "Washington DC",
		"state": "TN",
		"zip": "20510",
		"phone": "202-224-4944",
		"website": "https://www.alexander.senate.gov/public",
		"email": "",
		"contact": "http://www.alexander.senate.gov/public/index.cfm?p=Email"
	},
	{
		"firstName": "Susan",
		"lastName": "Collins",
		"street": "413 Dirksen Senate Office Building",
		"city": "Washington DC",
		"state": "ME",
		"zip": "20510",
		"phone": "202-224-2523",
		"website": "https://www.collins.senate.gov",
		"email": "",
		"contact": "http://www.collins.senate.gov/contact"
	},
	{
		"firstName": "John",
		"lastName": "Cornyn",
		"street": "517 Hart Senate Office Building",
		"city": "Washington DC",
		"state": "TX",
		"zip": "20510",
		"phone": "202-224-2934",
		"website": "https://www.cornyn.senate.gov",
		"email": "",
		"contact": "https://www.cornyn.senate.gov/contact"
	},
	{
		"firstName": "Richard",
		"lastName": "Durbin",
		"street": "711 Hart Senate Office Building",
		"city": "Washington DC",
		"state": "IL",
		"zip": "20510",
		"phone": "202-224-2152",
		"website": "https://www.durbin.senate.gov",
		"email": "",
		"contact": "https://www.durbin.senate.gov/contact/"
	},
	{
		"firstName": "Michael",
		"lastName": "Enzi",
		"street": "379A Russell Senate Office Building",
		"city": "Washington DC",
		"state": "WY",
		"zip": "20510",
		"phone": "202-224-3424",
		"website": "https://www.enzi.senate.gov",
		"email": "",
		"contact": "http://www.enzi.senate.gov/public/index.cfm/contact?p=e-mail-senator-enzi"
	},
]
```

## Part One

This part of the midterm focuses on the server and the Node Js File System.

- Rename your version of the **Address** assignment to **AddressMaven**.
  - Hint: use the **mv** command.
- Get the addresses from a REST call to our Express Server. You will probably base the call on work you did in **NodeRouteBasics**. Use **fetch** to make the call to the server. In **routes/index.js** create a route called **/get-address-list**.
- Add five addresses to a file called **addresses-list.json**. Load the addresses into **routes/index.js** using the built-in Node Js [fs][fs] module. In particular, use the async version of **read-file** wrapped in a promise.
- From inside the **/get-address-list** route use **response.send** to send the addresses to the client.

## Part Two

Create a new file called **load-address.js**. **import** the file into **control.js**. Make the **fetch** call to **/get-address-list** from **load-address.js**. Execute the call before you do anything else. In other words, the addresses should be loaded from the server before you show any of the UI. Once you have the addresses, store them in local storage.

Export a single function from **load-address.js** that performs both the tasks outlined above:

- It can **fetch** the addresses from the server.
- It can store them in Local Storage.

The export should look like this:

    export default loadData;

When you are done use the exported **loadData** function to wrap the code from **control.js** that loads items selected via the menu:

```javascript
export default loadData;
// Code omitted here

loadAddress()
    .then((result) => {
        console.log('LOAD STATUS', result.status);
        ReactDOM.render(<ElfHeader/>, document.getElementById('root'));
        const selectors = document.querySelectorAll('.__react-root');
        selectors.forEach(renderAppInElement);
    })
    .catch((err) => {
        console.log(err);
    });
````

**loadAddress** is the promise you exported from **load-address.js**. The code in the then block is essentially the same code we have been using to bootstrap our pages. The catch statement writes out any errors that might have occurred in **load-address.js** or in **control.js**.

After you have found you can successfully load the addresses into local storage and start your program, you are ready to find a way to display the addresses that are now stored in local-storage. Create a new page for your **AddressMaven** project called **AddressShow**. Add the page to the menu, and modify **control.js** and **tileData.js** as necessary to display the page.

- Display the first of the five records now in Local Storage in **AddressShow**
- Put two more buttons on the address page. Label them **Prev** and **Next** or the equivalent. When the user clicks the **Next** button, show the next record in Local Storage, when they click the **Prev** button, show the previous record. Check for the beginning and end of the array and don't go beyond it.

## Sanity

Before you begin, go to JsObjects and run **git pull** and also **git-pull-and-set-symbolic-links**.

**NOTE**: _Though it may not be present until you do a git pull, I have added a script in the root of **JsObjects** called **git-pull-and-set-symbolic-links**. Once you have the file, you can run it to perform a git pull and then run CreateSymbolicLinks. I think someone in class suggested this, and it seemed like a good idea._

Create a folder in the root of your project called **sanity-tests** if it does not exist already. Navigate into that folder. Run **get-tests** and choose **g) Prog272 Midterm 2019** from the menu. By the time you turn in the final, all these tests should pass.

Remember that you have some tools when working with tests.

- Change **it** to **fit** or **it.only** if you want to run only one test in a file. Actually, you can mark several tests this way, and they will be run and the others skipped.  
- Conversely, you can put an x in front of a test (xit) to signify that you don't want to run it.

You can [also use fdescribe and xdescribe](https://jest-bot.github.io/jest/docs/api.html). If you go to the docs following the link I give here, look for the sections on test.skip, test.only, descript.skip and describe.only. Note the aliases they have created, which tend to be way I access these calls.

You can **xdescribe** a test to skip it. You can use **p** at runtime to filter which tests are run.

## Sanity Files

The sanity tests may grow over time, but just now the contain these files:

| File Name                         | Purpose                                            |
|:----------------------------------|:---------------------------------------------------|
| Sanity.AddressShow.Layout.test.js | Examine the structure of AddressShow               |
| Sanity.Components.test.js         | Ensure core components can be loaded               |
| Sanity.Files.test.js              | Ensure key files exist                             |
| Sanity.LocalStorage.test.js       | Test that local storage tools are set up correctly |
| Sanity.MidtermFiles.test.js       | Check for files associated with Midterm and beyond |
| test-data.js                      | A few address records for use in testing           |

## Sanity Midterm Files

Here are some Notes on **Sanity.MidtermFiles.test.js**.

Two of the files listed here, **AddressLister** and **AddressForm** can be boilerplate React Components of the type you get when you run **get-gist** and select **Simple React Class Component**. We will use these files later, but for now they just need to:

- Exist
- Be loadable as React Components

## Turn it in

- Polish it. No errors, no warnings, all tests pass. **eslint** and **prettier** should come back clean.

Tag your work:

    git tag -a v8.0.0 -m "The Midterm"

Push your work, including the words **final midterm** in your commit message. If you end up with multiple commits that contain that text, I will take the most recent.

Remember, your work must be in a directory called **AddressMaven**. If that folder is missing, you will get a five and a chance to try again, but it will cost you several points. Don't put the wrong work in the **AddressMaven** folder. That would be a mistake.

Be sure your menu includes, and your app can display:

- Home (Show an image on this page, like tree-of-life.)
- Go
- First
- AddressShow
- About (include an image of your self)
  - Your last name should also appear in the AppBar, per the image at the top of this document.
- All my Sanity tests must pass
- You must write at least 10 tests that pass.

[fs]: https://nodejs.org/api/fs.html
[ls]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Local_storage
