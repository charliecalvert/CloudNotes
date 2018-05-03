## Overview

Get started using [React Native][rn].

React Native is a relatively simple way of making native Android and iPhone applications. When completed, you can place these applications in the Android Play Store or the iPhone store and sell them for money, or share them with others. The AirBnb and Instragram apps are examples of native phone applications built with React Native.

- Articles about apps built with react native are [here][brn] and [here][10rn]

In this assignment, we will use a tool called [expo](https://expo.io/). The key thing about Expo is that it makes it easy to develop these kinds of applications. Or at least it is easy once you understand React, which hopefully we all do understand at this point.

## Native with Expo

I believe [expo][expo] provides a simple way for us to create React Native programs. There are better ways to do it, but they require more set up, and are hard to use from inside our VirtualBox VM. For now, this is probably the best solution for us. Frankly, I think it is great, but at home or with a laptop you might find more direct ways to put your apps on your phone with the [Android SDK][asdk] and Android Debug Bridge, aka [adb][adb]. I use those technologies a lot, but will not discuss them here. For now, I'm focused on expo.

For this technology to work, your phone and your development tools should both be signed into the same network. At home, for instance, both your development machine and your phone should be signed in to your local network. You might have your phone on the wireless network, and your development machine wired into the network. That is fine, assuming they are both on the same network, which would normally be the case.

If you are at school, make sure your phone is signed into [eduroam](https://cat.eduroam.org/) before beginning. If you are on a laptop, make sure it is signed into Eduroam. The machines in N252 or in the lab for the N-Building are all linked to the same network as eduroam.

- [eduroam cat][educat]
- [eduroam US](https://www.eduroam.us/)
- [BC link](http://www.bellevuecollege.edu/wireless/)

Also, make sure your Pristine Lubuntu is using the Bridged Adapter, and not NAT. Check this in **Settings | Network** for the VirtualBox Manager.

## Expo

Go to the Android Play store or the iPhone store and install Expo on your Android or iPhone. Follow the instructions. It's simple.

- [Home Page Expo Development][hped]

## First Build

In this example, you can build the app either in your repo or in the **~/Source** folder. It's your choice.

```
npm install -g create-react-native-app
cd ~/Source
create-react-native-app Week05-ReactNativeStarter
cd Week05-ReactNativeStarter
npm start
```

Now use your phone and the expo app to scan your code from the command prompt.

Now open the app in WebStorm and start making changes. The app on your phone should update automatically as you make changes in WebStorm.

For now, you have to run the application in Expo. But it is possible to run it standalone.

## The Address Component

```javascript
import React, {Component} from 'react';
import {
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class ReactNativeStarter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foo: 'expo try state'
        };

    }

    fetchAddress = () => {
        //this.setState({foo:'fetcher king'});
        const that = this;
        const ip = 'ccalvert.com';
        fetch('http://' + ip + ':30027/you-rang')
            .then((response) => response.json())
            .then(function(result) {
                this.collection = result.allData;
                that.setState({
                    foo: result.result,
                });
            }).catch(function(ex) {
                that.setState({foo: 'qux error'});
            });
    };

    render() {
        console.log('tst');

        return (
            <View style={styles.container}>
                <Text>Getting started now</Text>
                <Text style={styles.instructions}>
                    {this.state.foo}
                </Text>

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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


AppRegistry.registerComponent('ReactNativeStarter', () => ReactNativeStarter);
```

## Styles

Note that we don't use CSS stylesheets. Instead, we define CSS only in JavaScript:

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

## Turn it in

Save your work in your repository in a folder called **Week05-ReactNativeStarter**. Push. When you turn in the assignment, tell me the name of the folder that contains your work:

- Folder: Week05-ReactNativeStarter

**NOTE**: _If you use the correct folder name, I won't have any trouble finding the right code to grade. But just to be safe, spell it out when you turn in the assignment. Be especially careful to do so if for some reason you have the assignment in a folder other than the one I suggest._

## Hint

Don't forget to import the controls you need for your view:

```javascript
import {Button, StyleSheet, Text, View} from 'react-native';
```

[educat]: https://cat.eduroam.org/

[hped]: https://facebook.github.io/react-native/releases/next/docs/getting-started.html

[brn]: https://insights.daffodilsw.com/blog/10-amazing-apps-that-are-built-using-react-native

[rn]: (https://facebook.github.io/react-native/)

[10rn]: https://brainhub.eu/blog/famous-apps-built-with-react-native/

[asdk]: https://en.wikipedia.org/wiki/Android_software_development#Android_SDK

[adb]: https://developer.android.com/studio/command-line/adb

[expo]: https://expo.io/
