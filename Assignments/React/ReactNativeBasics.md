# React Native Basics

Get started using React Native.


## Native with Expo

There is also something that brought down my entire home network. Very bizarre. But it seems to be working better now. I would make sure your phone is signed into EduRoam before beginning.

Install Expo on your Android or iPhone. Follow instructions. It's simple.

- [Home Page Expo Development][hped]

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

## Turn it in

There are two parts to this assignment.

- Make sure CongressServer can serve up the **/all-data** route
- Create **expo_lastname** and ensure that it can display data from the **CongressAddress** server.

I will start **CongressServer**. Then I will adjust the IP address in **expo-lastname** and start it. I'm expecting to see data and for everything to just work.

Both projects should be in the root of your directory.
