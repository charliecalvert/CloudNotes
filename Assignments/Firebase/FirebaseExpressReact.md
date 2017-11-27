## Overview

The goal is to expand the **FirebaseExpress** project so that it works with **React** and **Redux**.

## Where

Place your work in a folder called **Week10-FireBaseReact** in your main repository. Work in the **Week10** branch. User **CreateExpressProject** to bootstrap your project.

## Login

Here is the **elven-fire-login.js** file converted to React. The file is now called **FireBaseLogin**:

```javascript
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';

const buttonStyle = {
    margin: '10px 10px 10px 0'
};

const defaultState = {
    googleApiToken: 'Unknown',
    elfUser: "Unknown",
    signInStatus: 'Not Logged In',
    email: 'Unknown',
    emailVerified: false,
    isAnonymous: false,
    providerData: 'Unknown',
    photoURL: "favicon.png",
    uid: 0
};

class ElvenLogin extends Component {

    constructor(props) {
        super(props);
        if (!this.props.configured) {
            this.elfConfigure();
        } else {
            this.elfSignIn();
        }

        this.state = defaultState;
        this.elfUser = {};
    }

    // Handle Login/Logout button.
    toggleSignIn() {
        if (!firebase.auth().currentUser) {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithRedirect(provider);
        } else {
            firebase.auth().signOut();
        }
        document.getElementById('elf-sign-in').disabled = true;
    }

    elfConfigure = () => {
        const config = {
            apiKey: "AIzaSyDv-GtVcZGjqeZXHYh6aB1ewhRe4nyPYcE",
            authDomain: "prog270-data-calvert.firebaseapp.com",
            databaseURL: "https://prog270-data-calvert.firebaseio.com",
            storageBucket: "prog270-data-calvert.appspot.com",
            messagingSenderId: "250292177396"
        };
        firebase.initializeApp(config);
        this.elfSignIn();
    };

    elfSignIn = (showLoginStatus) => {
        const that = this;
        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                that.setState({googleApiToken: result.credential.accessToken})
            } else {
                that.setState({googleApiToken: 'Unknown'})
            }
            that.elfUser = result.user;
        }).catch(function (error) {
            const fireBaseAuthCredential = error.credential;
            if (error.code === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
                // If you use multiple auth providers handle linking accounts here.
            } else {
                console.error(error);
            }
        });

        firebase.auth().onAuthStateChanged(function (user) {
            that.props.dispatch({type: 'LOGIN_STATUS', loggedIn: user });

            if (user) {
                // User is signed in.
                that.elfUser = user;
                that.setState({
                    elfUser: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    signInStatus: 'Logged In',
                    isAnonymous: user.isAnonymous,
                    providerData: user.providerData,
                    photoURL: user.photoURL,
                    uid: user.uid
                })
            } else {
                that.setState(defaultState)
            }

            document.getElementById('elf-sign-in').disabled = false;
        });

    };

    render() {
        return (
            <div>
                <p>ElvenLogin</p>
                <RaisedButton
                    id="elf-sign-in"
                    label={this.props.signInLabel}
                    style={buttonStyle}
                    primary={true}
                    onClick={this.toggleSignIn}
                />

                <p><span>{this.state.signInStatus}</span></p>
                <pre><code>{this.state.elfUser}</code></pre>
                <pre><code>{this.state.email}</code></pre>

                <img id="elfPhoto" src={this.state.photoURL} alt='' width="10%" min-width="120px"/>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        signInLabel: state.signInLabel,
        configured: state.configured
    }
};

ElvenLogin = connect(mapStateToProps)(ElvenLogin);

export default ElvenLogin;

```

Here is the login page:

![asdf](https://s3.amazonaws.com/bucket01.elvenware.com/images/firebase-express-signin.png)

## Use Firebase Login

You could use the **ElvenLogin** Firebase code as shown below. Note that I give you the code to get your ElvenConfig file into the Firebase database:

```javascript
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import ElvenLogin from "./ElvenLogin";

const buttonStyle = {
    margin: '10px 10px 10px 0'
};

class App extends Component {

    setConfig() {
         // Change the value of the base-dir for the user.
         // You write the code.
    }

    insertConfig() {
        fetch('/get-config')
            .then(function (response) {
                return response.json();
            })
            .then(function (configuration) {
                console.log(configuration);
                firebase.database().ref('/').set(configuration);
            })
            .catch(function (ex) {
                console.log('parsing failed', ex);
            });
    }

    render() {
        return (

            <div>
                <p>React Stuff</p>

                <RaisedButton
                    label='Insert Config'
                    style={buttonStyle}
                    primary={true}
                    onClick={this.insertConfig}
                />

                <RaisedButton
                    label='Update user'
                    style={buttonStyle}
                    primary={true}
                    onClick={this.setConfig}
                />

                <ElvenLogin />
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        signInLabel: state.signInLabel,
        configured: state.configured
    }
};

App = connect(mapStateToProps)(App);

export default App;
```

This picture shows what the ElvenConfig.json file looks like after it has been loaded into the Firebase databases:
![sadf](https://s3.amazonaws.com/bucket01.elvenware.com/images/firebase-react.png)

## The Reducer

This reducer worked for me:

```javascript
const initialState = {
    loggedIn: true,
    signInLabel: 'Sign Out',
    component: 'app',
    configured: false
};

const fireReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SWITCH_COMPONENT':
            return {
                ...state,
                configured: true,
                component: action.component,
                userName: action.userName
            };
        case 'GET_LOGIN_STATUS':
            return {...state };
        case 'LOGIN_STATUS':
            return {
                ...state,
                loggedIn: action.loggedIn,
                signInLabel: action.loggedIn ? 'Sign Out' : 'Sign In'
            };
        default:
            return state;
    }
};

export default fireReducer;
```

It should, of course, be in a file called fireReducer.

## The Main Component

The **render** method for my main component, looks like this:

```javascript
// CODE OMITTED HERE

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'

// CODE OMITTED HERE

render() {
     let content = null;
     switch (this.props.component) {
         case 'app':
             content = <App/>;
             break;

         case 'show_users':
             content = <ShowUsers/>;
             break;

         case 'show_user':
             content = <ShowUser/>;
             break;

         default:
             content = <App/>

     }

     return (
         <div>
             <AppBar
                 iconClassNameRight="muidocs-icon-navigation-expand-more"
                 title="Title"
                 onLeftIconButtonTouchTap={this.handleToggle}
             />

             <Paper style={paperStyle} zDepth={5}>

                 <Toolbar style={{"justifyContent": "center"}}>
                     <ToolbarTitle text="Material UI"/>
                 </Toolbar>
                 {content}
             </Paper>
             < Drawer
                 docked={false}
                 width={200}
                 open={this.state.open}
                 onRequestChange={(open) => this.setState({open})}>

                 <AppBar title="AppBar"/>
                 <MenuItem onClick={this.handleShowLogin}>Show Login</MenuItem>
                 <MenuItem onClick={this.handleShowUsers}>Show Users</MenuItem>

             </Drawer>


         </div>
     );
}
// CODE OMITTED HERE
```     

## The Show Users Page

Even if you have only one user at this point, you should create a page that will display that user

![Users](https://s3.amazonaws.com/bucket01.elvenware.com/images/firebaser-react-user.png)

Each user should be represented by a button, shown here in blue. In this case, the buttons are labeled **ALLENBC** and **CALVERT**. If a button is selected, then a new component that displays information about the user should be be instantiated.

Show users contains these JSX (HTML) components:

- H1
- P
- One or more Raised buttons.

It gets its data (the list of users) from a call to the Firebase database. Look at the **elven-fire-data.js** file for examples of these types of calls that use **firebase.database.ref(...)**.

When the user's button is selected, a 'SWITCH_COMPONENT' Redux action is dispatched:

```javascript
this.props.dispatch({type: 'SWITCH_COMPONENT' ...})
```

## The Show User Page

If the user of the program selects one of the users in the Show Users page, then you should display that user:

![User](https://s3.amazonaws.com/bucket01.elvenware.com/images/firebase-react-user.png)

The **ShowUser** page has the following tags:

- H1
- Two P tags

It also gets its data from the Firebase database. The selected user is discovered by examing the Redux props.

## Turn it in

Push your code, specify:

- Repository
- Directory
- Branch

Features I want to see:

- Create a ShowUsers component. Even if you have only one user.
  - All the user to select a user
- Create a ShowUser component. Display some of the properties for the user.
