---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/CongressAddressServer.md
relativePath: Assignments/React/CongressAddressServer.md
title: CongressAddressServer
queryPath: Assignments/React/
subject: React
fileNameMarkdown: CongressAddressServer.md
fileNameHTML: CongressAddressServer.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Create a server to serve up addresses. Later we will convert this to a CouchDB server. For now, we will just have the server forward the list of addresses we created in the **GetAddress** assignment.

**NOTE**: _We could more easily put that JSON file in the public directory of our client, but I want to incrementally move toward the point where we will be serving data from a database. The first step is to set up the server that will eventually serve MongoDB data. For now, however, we will just have it forward the content of the **address-list.json** file in JSON format._

Add code into our **AddressMaven** project to iterate over the data served by our **AddressServer** by selecting forward and back buttons.

![Address Proxy Iterate Buttons][api]

**IMAGE**: _The user can click the pink buttons to iterate over the records. As always, the developer tools are open on the right._

## Step One

Go to JsObjects:

	jo

Pull the latest from the repository: **git pull**.

Navigate back to your repository. From the root of your repository:

	CreateExpressProject CongressServer
	cd CongressServer
	npm install

Open the project in WebStorm and make sure your JavaScript settings are configured for ES6.

- **File | Settings | Languages & Frameworks | JavaScript**

## Step Two

Set up bower. Your **bower.json** probably already contains Bootstrap, and hence jQuery. But just in case:

- bower install bootstrap --save

Just to be save. Though the above call install bootstrap, lets just be certain all is well:

	bower install

Now might be a good time to start the project: **npm start**

## Ignore Politicians

Add or open a file called **nodemon.json** in the root of your project. Be sure the following content can be found in it:

```javascript
{
  "verbose": true,
  "ignore": ["politicians.json", "**/bower-components/**"]
}
```

This project may create a file called **politicians.json** each time you insert data into the database. By default, this will cause **nodemon** to restart the project each time we write data to **politicians.json**. This can cause miscellaneous errors on the on the client side, such as a false report for failure for the **insertValidCollection**. The fix is to ask nodemon to ignore **politicians.json**. We should also ask it to ignore our components folder.

For more on **nodemon** configuration, see here:

- <https://github.com/remy/nodemon>
- <https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md>

You should also create a **.gitignore** file for this project and put the single line **politicians.json** in it. While you are at it, check your .bowerrc and make sure it has **bower-components** rather than **components** in it:

```javascript
$ cat .bowerrc
{
  "directory": "public/bower-components"
}
```

## Step Three

Let's practice setting up the **favicon**. Because you used **CreateExpressProject**, you should already have a **favicon.png** or **favicon.ico** file in **public.** But in case you have some reason to do it manually, here is how to get a default favicon on Linux (first example) or on Windows:

	cp $JSOBJECTS/Data/MongoBootstrap/favicon.png public/.
	copy %USERPROFILE%\Git\JsObjects\Data\MongoBootstrap\favicon.png public\.

Or better, get a nice 32X32 PN favicon from the web.

- [Wikimedia][wmex]
- [Wikimedia search for favicon][wms]

The next step is to check views/layout.pug and check out the LINK that CreateExpressProject made for you:

```
link(rel="icon", type="image/png" href="favicon.png?v=1")
```

For more information, see this documented [on the W3 site][w3icon].

## Set the Port

Set up the port in **bin/www**:

```javascript
var port = normalizePort(process.env.CONGRESS_SERVER_PORT || '30026');
```

And then a few lines further down let's tell the developer which port is being used:

```javascript
server.listen(port, () => {
    console.log('listening on port', port);
});
```

## Serve Data

The first step will be to read in the address-list.json file:

```JavaScript
const fs = require('fs');

function readFile(fileName) {
    'use strict';
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, 'utf8', function(err, fileContents) {
            if (err) {
                reject(err);
            }
            resolve({
                'result': fileContents
            });
        });
    });
}
```

Now you need to send it to the world when they call the **/address-list** route:

```JavaScript
router.get('/address-list', function(req, res) {
    'use strict';
    readFile(__dirname + '/address-list.json')
        .then((json) => {
            res.send(<YOU WRITE THIS PART>);
        });    
});
```

The data you read in from **address-list.json** will be in text format. It will be a string. You will need to convert it JSON. But note that the data sent back from **readFile** comes in the form of a simple JavaScript object. The object itself is not a string, but only the part that was read from the file.

## Set up a Proxy {#proxy}

Modify **AddressMaven**, or whatever you are calling it, to read this data.

Start by setting up a proxy in **package.json**:

```javascript
{
    "name": "week03-react-jest",
    "version": "0.1.0",
    "private": true,
    "proxy": "http://localhost:30026", <=== HERE
    "dependencies": {
        "material-ui": "^0.20.0",
        "react": "^16.3.2",
        // AND SO ON
     }
     // AND ON
}
```

Now, when we call **fetch**, our requests are proxied to the **CongressAddressServer**.

## Call Server

Modify the first few lines of **Address.js** in **AddressMaven**:

```JavaScript
import tempAddressList from '../address-list';

class Address extends Component {
    constructor() {
        super();
        this.debug = false;        
        this.canceled = false;
        this.state = {            
            addressIndex: 0,
            addressList: [{}],
            address: tempAddressList[0]
        };        
        this.log('Temp Address List:', tempAddressList);
    }

    componentDidMount() {
       this.getAddressList();
    }

    componentWillUnmount() {
        this.canceled = true;
    }
}
```

You write **getAddressList**. It's just another call to **fetch**, this time with the route being **/address-list**. In the method, include a line that sets **this.state.addressList**. It might look something like this, where **addressListFromServer** is the JSON data you retrieved from the server:

```javascript
if (!this.canceled) {
    this.setState({addressList: addressListFromServer});
    this.setState({index: 0});
}
```

The key points to note here:

- Don't call **fetch** from the constructor. Instead, call it from [componentDidMount][cdm] which React will automatically call after the component is mounted.
- Don't call setState if the component is not mounted. If you do, you get the error below.


**ERROR**: _You might get this error, especially while testing: Warning: "Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the **componentWillUnmount** method." To avoid this error, we create a variable called **this.canceled**._

## Load after component is mounted

```javascript
componentDidMount() {
    this.getAddress();
}
```		

## Help with Errors

This might help you find your errors if you get any. Insert a **console.log** statement as shown below and then set a break point at the start of your render method on the console.log statement that you added:

```javascript
render() {
    console.log('Address render called', this.state.address);
    return (...)
}
```

The goal is to see what your state looks like after your fetch.

One more hint. In your fetch method, consider calling **setAddress**.

## Next and Previous Buttons

The final step is to add two buttons to your project so you can iterate forward and backwards through the address. The buttons should be in the Presentation component, which we are calling **AddressShow** and the logic for iterating over the record should be in a **Address**.

By splitting up our code into Presentation and Log (sometimes called business rules) we are following [good programming practices][gpp].

There is no need to create special event handlers for the forward and backward buttons. Instead, all your buttons can call **Address.setAddress** which now takes a numeric parameter called **offset**.

```javascript
setAddress = (offset) => { ... }
```

In **AddressShow**, use the trick **onClick** property shown here to pass a parameter to **setAddress.**

```javascript
<RaisedButton
    id="setAddress"
    primary={true}
    onClick={(e) => this.props.setAddress(1, e)}>
    Set Address
</RaisedButton>
```

The code shown here set's the **offset** parameter of **setAddress** to 1.

**HINT**: _You could, if you found it convenient, pass in -1 in some cases._

## Testing AddressShow

We can't use our Address.setAddress because we are using shallow, and will not access methods from address. So we mock it up in the simple two line **setAddress** method shown here. Then we pass it in as **props** to **AddressShow** as shown in **afterClickFieldTest**. There are no changes to **defaultFieldTest**.

```JavaScript
let wrapper = null;

const setAddress = () => {
		const address=addresses[1];
		wrapper.setProps({ address: address });
};

const defaultFieldTest = (name, index, talkToMe) => {
		const wrapper = shallow(<AddressShow address={addresses[0]} />);
		const welcome = <p className="App-intro">{name}</p>;
		getIndex(wrapper, index, talkToMe);
		expect(wrapper.contains(welcome)).toEqual(true);
};

const afterClickFieldTest = (name) => {
		wrapper = shallow(<AddressShow address={addresses[0]} setAddress={setAddress}/>);
		const patty = <p className="App-intro">{name}</p>;
		wrapper.find('#setAddress').simulate('click');
		//console.log(wrapper.debug());
		expect(wrapper.contains(patty)).toBe(true);
};

it('renders and displays the first name', () => {
		defaultFieldTest('First Name: unknown', 0);
		afterClickFieldTest('First Name: ' + addressTest.firstName, 0);
});

```

## Testing Address

We have to wait for two events to take place. This is one way to do it. You can reuse **afterClickFieldTest** just as reused a method with the same name in **AddressShow.test.js**.

```javascript
const afterClickFieldTest = (wrapper, finder) => {
	 setImmediate(() => {
			 wrapper.update();
			 wrapper.instance().setAddress(0);
			 setImmediate(() => {
					 wrapper.update();
					 try {
							 finder();
					 } catch (e) {
							 console.log(e);
					 }
			 });
	 });
};

it('renders state of firstName after button click', () => {
	 const wrapper = shallow(<Address addressList={addresses}/>);
	 afterClickFieldTest(wrapper, () => {
			 expect(wrapper.find('AddressShow').prop('address').firstName).toEqual('Patty');
	 });
});
```

## Turn it in

Tag it:

```
tag -a vX.X.X -m "Completed CongressAddressServer"
```

Tell me:

- Tag
- Directory for AddressMaven
- Directory for AddressServer
  - Also tell me the port if not 30026
- Branch if relevant

## Setting the port

I believe this code is not portable:

	"start": "PORT=30030 nodemon ./bin/www"

It works in Linux and the Mac but not on Windows.

So I usually set the environment variable for PORT separately, in a script or in my .bashrc:

	export PORT=30025

Sometimes I do something like this:

	var port = normalizePort(process.env.SERVER_PORT || '30030');

Then in my .bashrc or elsewhere I can set the port for specific projects.

	export SERVER_PORT=30025

When using systemd you can set the port in your configuration file:

	Environment=SERVER_PORT=30027

## The Same Origin Policy {#same-origin-policy}

Note that we can query the **CongressServer** running on EC2 from Native React programs running on our local machine.

However, the _Same Origin Policy_ (closely related to CORS) prevents us from querying **CongressServer** running on EC2 from a Web App running on our local machine. If both the Web App called **AddressMaven** and **CongressServer** were running on EC2 or on our local machine, then it would work...

It is possible to modify **CongressServer** so that it can handle CORS requests, but I haven't done that for two reasons:

- It can be dangerous.
- I want you to understand what CORS is. If everything just works all the time, then you will never understand what CORS and the Same Origin Policy is all about. This is an important concept in Web Development and one that you need to understand if you want to work in this field.

Actually try to read some of these links:

- [MDN on Same Origin Policy][msop]

- [Wikipedia on Same Origin Policy][wsop]

[msop]:https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Cross-origin_network_access

[wsop]: https://en.wikipedia.org/wiki/Same-origin_policy

[w3icon]: https://www.w3.org/2005/10/howto-favicon

[wmex]: https://commons.wikimedia.org/wiki/File:FAVICON_R5.png

[wms]: https://commons.wikimedia.org

[gpp]: http://www.elvenware.com/charlie/development/web/JavaScript/GettingStarted.html#good-code

[jsonv]: https://chrome.google.com/webstore/search/json%20viewer

[api]: https://s3.amazonaws.com/bucket01.elvenware.com/images/address-proxy-iterate.png

[cdm]: https://reactjs.org/docs/react-component.html#componentdidmount
