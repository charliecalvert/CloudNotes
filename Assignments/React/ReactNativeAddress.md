---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactNativeAddress.md
relativePath: Assignments/React/ReactNativeAddress.md
title: ReactNativeAddress
queryPath: Assignments/React/
subject: React
fileNameMarkdown: ReactNativeAddress.md
fileNameHTML: ReactNativeAddress.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Our goal is to recreate our best current version of AddressShow in React Native. By now you might be calling it AddressMenu or AddressMaterial. But whatever our best Web App code might be, we want to recreate it in React Native.

## State and Props

It is important to understand the difference between State and Props.

![State and Props][sap]


## Get Started

Create an empty React Native project called **AddressNative**:

```bash
create-react-native-app AddressNative
```

## Recreate AddressShow

Begin by copying over the core files from your best version of **AddressShow**:

```
cp ../AddressMaterial/src/components/Address.js .
cp ../AddressMaterial/src/components/AddressShow.js .
cp ../AddressMaterial/src/components/GetFile.js .
cp ../AddressMaterial/src/components/ElfHeader.js .
cp ../AddressMaterial/src/components/elf-styles.js .
cp ../AddressMaterial/src/address-list.js .
```

## StyleSheet

Over time we can develop a good styleSheet for our program. Start by deleting the existing content in **elf-styles** and replacing it with this:

```
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
        marginBottom: 1,
        padding: 50,
        backgroundColor: 'powderblue'
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'skyblue'
    },
    displayArea: {
        flexDirection: "column",
        backgroundColor: "steelblue",
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 20
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    subNavItem: {
        padding: 5
    },
    topic: {
        textAlign: 'center',
        fontSize: 15
    },
    buttonView: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        width: '75%'
    }
});

export default styles;
```

## Start Porting Our Code

It is time to start porting our code from React to React Native. Some things are easy. For instance, a **DIV** usually becomes a **VIEW**, and a **P** element usually becomes **TEXT**. I'll leave details like that up to you and instead focus on the sticking points.

Open up **App.js** and try to link in **GetFile.js**:

```javascript
import GetFile from './GetFile';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.addressContainer}>
        <GetFile />
      </View>
    );
  }
}
```

Don't do anything else at this time, instead, just run your project (npm start). You will likely get errors about the code in **GetFile.js**. The problem, of course, is that the the code in a React Web Application is not entirely compatible with the code in a React Native. Our goal is to fix those errors.

You might, for instance, get an error like this:

```bash
Unable to resolve ../App.css from ./GetFile.js
```

This one is fairly simple to fix because we know that CSS stylesheets do not have a role in React Native. So you should delete this reference to **App.css** from **GetFile.js**.

## Buttons

The next error you hit might look like this:

```javascript
Unable to resolve material-ui/RaisedButton from ./GetFile.js
```

There are no **RaisedButtons** in standard React Native, so remove the **import** for it and for **AndroidIcon**. Replace them with these basics of the React Native interface:

```javascript
import  { Text, View, Button } from 'react-native';
```

Recall that a button in React Native looks a bit like this:

```javascript
<View style={styles.buttonView}>
    <Button
        onPress={this.getFile}
        title="Get Data"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
    />
</View>
```

Note that I have wrapped the button in a style.

At this point, your program should look a bit like this on your phone:

![Native Address and Git File][nagf]


## Link in Address Component


As for the the **Address** component, all you need to do is link it in. I suggest that you leave AddressShow out of the mix for now, as it is the most time consuming component to fix up.

```javascript
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default class Address extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Expo Calvert!
                </Text>

                {/* Eventually we will link in AddressShow here, but not yet. */}
                {/* For now, just comment it out, using the syntax I have used here. */}
            </View>
        );
    }
}

```

Don't forget to comment out the import for **AddressShow** from **Address**. For now, we don't want AddressShow in the mix at all.

An explanation of how to create comments in JSX is found [here][cjsx].

## React Router Menu

Let's start by linking in the version of React Router that works with React Native:

```
npm install --save react-router-native
```

Let's start with the changes we need to make to **ElfHeader**. The code is much the same as in our Address Material assignment, but there are differences. Rather than try to detail them, I'll just ask you to set its content to the following:

```javascript
import React, {Component} from 'react';
import {Link} from 'react-router-native';
import {Text, View} from 'react-native';
import styles from "./elf-styles";

class ElfHeader extends Component {

    render() {
        return (
            <View style={styles.nav}>
                <Link
                    to="/"
                    underlayColor='#f0f4f7'
                    style={styles.navItem}>
                    <Text>Address</Text>
                </Link>
                // You create a /get-file link here.
                // Hint: Just **to** and the **Text** change.
            </View>
        );
    }
}

export default ElfHeader;
```

Go back and look at the code for the **ElfHeader** in the AddressMenu program:


```javascript
import { Link } from 'react-router-dom';
<div>
  <div className="App">
      <ul>
          <li><Link to="/">Address</Link></li>
          <li><Link to="/get-file">Get File</Link></li>          
      </ul>
  </div>                
</div>
```

The code in React Native follows the same pattern, but instead of **LI** elements, we use **Link** elements.

## Routes in App.js

In **App.js** import these items from React Router Menu.

```javascript
import { NativeRouter, Route } from 'react-router-native';
```

Now look at the **App.js** file from Address Material. Much remains essentially the same, but instead of a **BrowserRouter**, we use a **NativeRouter** and instead of a **DIV**, we use a **View**.

At this stage we have a primitive menu at the top. When we click on Address, we see the **Address** component, when we click on **GetFile** we see this:

![Native Address with menu and view of Get File][nasm]

## Clean Up AddressShow

Now you need to go through **AddressShow**, converting **DIV** elements to **View** elements, and **P** elements to **Text** elements. There are other changes to make, but I will leave all that up to you.

![Send Props][sp]

## Turn it in

Commit and push your work. Test it again after pushing to make sure what you committed actually works. (We are having a rash of incidents where bits of stray code are inserted into a file, breaking an otherwise clean assignment.)

When you are done, tag it with something like this:

```
git tag -a v7.0.0 -m "Address Native assignment complete"
```

If you are using branches, specify which you used.

[cjsx]: https://wesbos.com/react-jsx-comments/

[nasm]: https://s3.amazonaws.com/bucket01.elvenware.com/images/native-address-simple-menu.png

[nagf]: https://s3.amazonaws.com/bucket01.elvenware.com/images/native-address-get-file.png

[sap]: https://s3.amazonaws.com/bucket01.elvenware.com/images/AddressProps.svg

[sp]: https://s3.amazonaws.com/bucket01.elvenware.com/images/SendProps.svg
