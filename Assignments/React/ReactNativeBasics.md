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

## Bridged Adapter

Also, make sure your Pristine Lubuntu is using the Bridged Adapter, and not NAT. Check this in **Settings | Network** for the VirtualBox Manager.

![Bridged Adapter in VirtualBox][bavb]

Your settings may differ in small ways, but the key point is the Attached to field is set to Bridged Adapter. In particulare the name and Adapter Type fields may be different in your case, but should be filled in properly by default or easily picked from the drop down.

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

## Working on EC2

I found that I could do this kind of development on EC2, though there were a couple extra steps.

**NOTE**: _I should add that I'm not sure how safe this is. I can't pinpoint a problem, but probably after you finish working, you should remove 19000 and 19001 from your security group. Then just add them again the next time you want to work on EC2._

There were a couple steps:

On EC2, at the bash prompt, set an environment variable:

```bash
export REACT\_NATIVE\_PACKAGER_HOSTNAME=<YOUR ELASTIC IP>
```

For instance:

```bash
export REACT\_NATIVE\_PACKAGER_HOSTNAME=52.38.23.147
```

Go to the EC2 Management console find the security group your using, and open up ports 19000 and 19001.

**NOTE**: _To find the security group associated with your instance, first select **Instances** in the Management Console, select your instance, then look for the name of your security group. It will be on the **Description** page on the left about five or six items down._

Here is what my Security Group looked like after I added in Ports 19000 and 19001:

![Expo Security Group](https://s3.amazonaws.com/bucket01.elvenware.com/images/expo-security-group.png)

## Hint

Don't forget to import the controls you need for your view:

```javascript
import {Button, StyleSheet, Text, View} from 'react-native';
```

[bavb]: https://s3.amazonaws.com/bucket01.elvenware.com/images/BridgedAdapter.png

[educat]: https://cat.eduroam.org/

[hped]: https://facebook.github.io/react-native/releases/next/docs/getting-started.html

[brn]: https://insights.daffodilsw.com/blog/10-amazing-apps-that-are-built-using-react-native

[rn]: (https://facebook.github.io/react-native/)

[10rn]: https://brainhub.eu/blog/famous-apps-built-with-react-native/

[asdk]: https://en.wikipedia.org/wiki/Android_software_development#Android_SDK

[adb]: https://developer.android.com/studio/command-line/adb

[expo]: https://expo.io/
