## Overview

Run an SSH script remotely. In particular we will:

- Create a program on Pristine Lubuntu
- From that program we will run the CpuInfo script on our EC2 instance and display the output in our client.
  - Recall that we copied that file to our Ec2 instance in the assignment called **EC2 Copy File.**

## Get Started

Make sure you have pulled the most recent version of JsObjects.

    jo
    git pull

Remember that you can get back to the directory you were in before typing **jo** by typing **cd -**.

In the root of your repository, create a directory called **week05-run-ssh** and navigate into it.

From the root of your new directory, run the **get-gist** program by typing its name at the command prompt and hitting the **enter** key. Select **Elven Create Concurrently** which is probably option **l**.

Run the **elf-concur** script. When prompted, choose the **server** option on 30026 from the menu. It should create the **client** and **server** directories, configure them, and set up [concurrently][concur] in the **week05-run-ssh** directory.

The **elf-concur** script should have set your programs up so that HTTP commands issued by the **client** will be proxied to the **server**. It did this by placing a **proxy** property in **package.json**. In short, the programs were set up for you automatically.

Navigate to the **client** directory. Run **get-gist** a second time. Select:

    a) Run ESLintRc and Prettier (cdef)

Exit **get-gist**. Run the program again in the **server** directory, again selecting the ESLintRc option from the **get-gist** menu.

Navigate back to the root of the **week05-run-ssh** directory. Run **npm start**. The **client** and **server** should now be running on the appropriate ports.

- See **/server/bin/www** for the set up of the port for the server.
- See **/client/package.json** for the proxy, which is at the bottom of the file.
- See **week05-run-ssh** for the set up of **concurrently**
  - **package.json**
  - **start-client.js**

## Get Live Templates

Open the project in WebStorm.

At the bash shell, issue this command to download the latest Elven WebStorm [Live Templates][lt]:

    wget https://s3.amazonaws.com/bucket01.elvenware.com/images/elf-webstorm-settings.jar

Choose **File | Import Settings** from the WebStorm menu. Select the **jar** file you just downloaded.

**NOTE**: _If you start creating your own Live Templates, I strongly suggest that you export them frequently so that you do not lose any of your work. I don't think importing live templates deletes existing ones, but I am not sure._

## Header in render Method

We can view the templates by selecting **File | Settings | Editor | Live Templates | user**. Note that some of the templates only work in certain places. For instance, the JSX related templates will only run if your cursor is in the appropriate part of, for instance, a react **render** method.

Let's test our new Live Template. Open up **src/App.js**. In the render method, remove the JSX HTML **header**. Type **elf-jsx-start** to set up one of our live templates. Press tab or enter to invoke it. The following code should be inserted automatically into your code:

```html
<header>
    <h1></h1>
    <p className="byline">by </p>
</header>
<main>

</main>
<footer>
    <p>&copy; 2018 </p>
</footer>
```

Fill in the missing pieces. For instance, insert your name in the appropriate places, and add some text for the H1 element. Suggested text might **Run SSH**.

## Button

In the **main** element run the **elf-react-button** live-template:

```html
<button onClick={this.}></button>
```

Fill in the missing pieces.

## Call Fetch

Above the **render** method but inside the **App** class declaration, run the **elf-call-fetch** live-template:

```javascript
= () => {
   fetch('/')
       .then(function (response) {
           return response.json();
       })
       .then(function (json) {
           console.log('JSON from server:', json);

       })
       .catch(function (ex) {
           console.log('parsing failed, error on server, URL bad, network down, or similar');
           console.log(JSON.stringify(ex, null, 4));
       });
};
```

Fill the missing pieces. The method should be called **callCpuInfo**. The endpoint URL for our route should be:

- call-cpu-info

## Server Side

We will need the **ssh2** NPM package.

    npm install ssh2 --save

At the top of **routes/index.js** require the package:

```JavaScript
var Client = require('ssh2').Client;
```

Near the top of **routes index.js** put these declarations and method:

```javascript

const hostAddress = '<YOUR ELASTIC_IP_HERE>';

let allData = '';

const runCpuInfo = (hostAddress, response) => {
    var conn = new Client();
    conn.on('ready', function() {
        console.log('Client :: ready');
        conn.exec('~/CpuInfo', function(err, stream) {
            if (err) throw err;
            stream
                .on('close', function(code, signal) {
                    console.log(
                        'Stream :: close :: code: ' +
                            code +
                            ', signal: ' +
                            signal
                    );
                    conn.end();
                    response.send({ result: 'success', allData: allData });
                })
                .on('data', function(data) {
                    console.log('STDOUT: ' + data);
                    allData += data;
                })
                .stderr.on('data', function(data) {
                    console.log('STDERR: ' + data);
                    allData += data;
                });
        });
    }).connect({
        host: hostAddress,
        port: 22,
        username: 'ubuntu',
        privateKey: require('fs').readFileSync(
            process.env.HOME + '/.ssh/<YOUR_PRIVATE_KEY_HERE>'
        )
    });
};
```

Put your elastic IP in the hostAddress variable. Put the name of your private key in the appropriate place near the bottom of the **callCpuInfo** method.

In **routes/index.js** also put an endpoint for **call-cpu-info**. The **elf-router-get** live-template should help you handle this. from that endpoint, call the method we declared above like this:

```javascript
runCpuInfo(hostAddress, response);
```

Test your code and make sure it works. You should see the output from running the CpuInfo script on your EC2 server.

## Create sshRunner Module

Create a file called **routes/ssh-runner.js**. Move the



[lt]: https://www.jetbrains.com/help/webstorm/using-live-templates.html
[concur]: https://www.npmjs.com/package/concurrently
