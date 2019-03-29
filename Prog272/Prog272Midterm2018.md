## Overview

There are two parts to the Midterm.

## Part One

- Copy your version of the **Address Material-UI** assignment to a folder called **AddressMaven**.
- Polish it. No errors, no warnings, all tests pass.
- Get the addresses from a REST call to our Express Server. You will probably base it on **NodeRouteBasics**. Use **fetch** to make the call to the server. In **routes/index.js** create a route called **'/get-address-list'**. Use **respone.send** to send the addresses to the client.
- Add three addresses to our **addresses-list** to bring the total to five. All the addresses may be hard coded directly into **routes/index.js** for now, if you like. Or do something fancier if you are so inclined.
- Put two more buttons on the address page. Label them left and right or the equivalent. When the user clicks the right button, show the next record in the address-left, when they click the left button, show the previous record. Check for the beginning and end of the array and don't go beyond it.

## Part Two

- Polish your version of **AddressNative**.
- Load your address-list from your server.
- Put forward and backward buttons as in Part One.
- For extra credit:
	- Put your Express Server on EC2 running on Port 30026.
	- Get the data for **AddressNative** from EC2.

## Turn it in

When you turn in the Midterm, say specifically which server or servers I should run when I run your client. Say specifically which server you client depends on. Reference the server by Folder name.

Make sure all your tests pass and that ESLint is clean. I will not grade any assignments that do not include **node_modules** in your **.gitignore** file.


Let me know what folders you are working in and what tag you used:

- Folder: AddressNative
- Folder: AddressMaven
- Tag: v7.X.X

Make sure you tell me the folders in the tag annotation. For instance:

```
git tag -a v7.0.2 -m "Midterm push in AddressNative & AddressMaven"
```

Check it to make sure it looks right:

```
git tag -n
```

And push it:

```
git push origin v7.0.2
```

## Testing React Native

Details are [here][trn].

[trn]: /javascript-guide/JavaScriptReactNative.html
