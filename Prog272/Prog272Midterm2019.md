## Overview

There are two parts to the Midterm. Some of them have not been covered in class yet, but they will be covered this week. By outlining the midterm now, I'm making clear to you what you will need to know finish the midterm.

In particular, you will need to learn about two subjects:

- [Reading files with the NodeJs File System library][fs]
- [Local Storage][ls]

Perhaps you'll want to create something like this:

<img class="sizer" alt="React Address Show Fields" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/address-maven-address-show-2019.png" />

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

If will be defining the Sanity tests in this section. It is not ready yet.

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
