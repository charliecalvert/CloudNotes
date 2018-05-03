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


## React Router Menu

```
npm install --save react-router-native
```

```javascript
import { NativeRouter, Route, Link } from 'react-router-native'
```

## Turn it in

- Make sure CongressServer can serve up the **/all-data** route
- Create **expo_lastname** and ensure that it can display data from the **CongressAddress** server.

I will start **CongressServer**. Then I will adjust the IP address in **expo-lastname** and start it. I'm expecting to see data and for everything to just work.

Both projects should be in the root of your directory.
