# React Native Basics

Get started using React Native.

React Native is a relatively simple way of making native Android and iPhone applications. When completed, you can place these applications in the Android Play Store or the iPhone store and sell them for money, or share them with others. The Facebook, Twitter and Instagram apps are examples of native phone applications that you may use. They almost certainly weren't built with React Native, but they are also native Android and iPhone applications of the same type as we can make with React Native.

In this assignment, we will use a tool called [expo](https://expo.io/). The key thing about Expo is that it makes it easy to develop these kinds of applications. Or at least it is easy once you understand React, which hopefully we all do understand at this point.

**NOTE**: _This assignment was designed for my Prog272 course. This spring, 2017, I also gave a link to this assignment to my Isit322 course. This was simply so they can see how to get started with Expo and React Native. I am not suggestting that Isit322 follow the exact steps laid down in this assignment, though some of them may provide very useful hints as to how to proceed._

## Native with Expo

For this technology to work, your phone and your development tools should both be signed into the same network. At home, for instance, both your development machine and your phone should be signed in to your local network. You might have your phone on the wireless network, and your development machine wired into the network. That is fine, assuming they are both on the same network, which would normally be the case.

If you are at school, make sure your phone is signed into [eduroam](https://cat.eduroam.org/) before beginning. If you are on a laptop, make sure it is signed into Eduroam. The machines in N252 or in the lab for the N-Building are all linked to the same network as eduroam.

- [eduroam cat][educat]
- [eduroam US](https://www.eduroam.us/)
- [BC link](http://www.bellevuecollege.edu/wireless/)

Go to the Android Play store or the iPhone store and install Expo on your Android or iPhone. Follow the instructions. It's simple.

[educat]: https://cat.eduroam.org/

Also, make sure your Pristine Lubuntu is using the Bridged Adapter, and not NAT. Check this in **Settings | Network** for the VirtualBox Manager.

- [Home Page Expo Development][hped]


## First Build

In this example, you can build the app either in your repo or in the **~/Source** folder. It's your choice.

```
npm install -g create-react-native-app
cd ~/Source
create-react-native-app expo-lastname
cd expo-lastname
npm start
```

Now use your phone and the expo app to scan your code from the command prompt.

[hped]: https://facebook.github.io/react-native/releases/next/docs/getting-started.html

Now open the app in WebStorm and start making changes. The app on your phone should update automatically as you make changes in WebStorm.

For now, you have to run the application in Expo. But it is possible to run it standalone.

## The Address Component

```javascript
/**
 * by Charlie Calvert
 */

import React, {Component} from 'react';
import {
    Alert,
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foo: 'expo try state',
            firstName: 'default firstName'
            // ADD A DEFAULT LAST NAMED
        };
        // NOT USED NOW, BUT YOU MIGHT FIND IT HANDY LATER
        this.collection = [];
        this.fetchAddress = this.fetchAddress.bind(this);
    }

    fetchAddress(event) {
        this.setState({foo:'fetcher king'});
        const that = this;
        const ip = '168.156.47.60';
        fetch('http://' + ip + ':30025/all-data')
            .then((response) => response.json())
            .then(function(result) {
                this.collection = result.allData;
                that.setState({
                    foo: 'qux success',
                    // SET UP STATE FOR FIRST AND LAST NAMES
                    // FROM THE DATABASE
                });
            }).catch(function(ex) {
            that.setState({foo: 'qux error'});
        });
        if (event) {
            event.preventDefault();
        }
    };

    render() {
        console.log('tst');

        return (
            <View>
                <Text style={styles.instructions}>
                    {this.state.foo}
                </Text>
                // REPLACE THESE COMMENTS WITH CODE  FOR
                // DISPLAYING THE FIRST AND LAST NAMES
                <Button
                    onPress={this.fetchAddress}
                    title="Get Data"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('Address', () => Address);
```

## Link in Address Component

Now that we have created the **Address** component, all you need to do is link it in.

```javascript
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Expo Calvert!
                </Text>
                <Text>PUT THE ADDRESS COMPONENT JUST BELOW HERE.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

});
```

## Styles

Note that we don't use StyleSheets. Instead, we define CSS only in JavaScript:

```javascript
export default class App extends React.Component {
    render() {
      return (
          <View style={styles.container}/>
      )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

```

## React Router Menu

```
npm install --save react-router-native
```

```javascript
import { NativeRouter, Route, Link } from 'react-router-native'
```

## Turn it in

There are two parts to this assignment.

- Make sure CongressServer can serve up the **/all-data** route
- Create **expo_lastname** and ensure that it can display data from the **CongressAddress** server.

I will start **CongressServer**. Then I will adjust the IP address in **expo-lastname** and start it. I'm expecting to see data and for everything to just work.

Both projects should be in the root of your directory.

## Hint

Don't forget to import the controls you need for your view:

```javascript
import {Button, StyleSheet, Text, View} from 'react-native';
```
