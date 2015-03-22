##Route Parameters

The goal of this assignment is to get the RouteParameters program running on:

- AWS
- A mobile devices

This is not a coding assignment. It is just an exercise. You will, however, 
have to demonstrate an understanding of the program we will be running.

- [Video](http://youtu.be/ft_ih30yqIY)

## Step One: Find Route Parameters


The Route Parameters program can be found on JsObjects. Here is the web app version:

- [Web App][nodeParams]

Here is the Cordova version:

- [Cordova App][cordovaParams]

It has a fairly simple interface. Here it is as a web app:

![RouteParameters on AWS](https://drive.google.com/uc?id=0B25UTAlOfPRGVG02a25FZENnMk0)

And here it is as Cordova application:

<img class="small" src="https://drive.google.com/uc?id=0B25UTAlOfPRGc1JqUWh1Tk5fZUE" alt="Isit 322 Final Home Page">

## Step Two: Run Route Parameters on AWS

First, make sure you have the most recent copy of JsObjects on your AWS instance:

```
$ ssh ubuntu@<SOME-ELASTIC-IP>
Welcome to Ubuntu 14.04.2 LTS (GNU/Linux 3.13.0-44-generic x86_64)

 * Documentation:  https://help.ubuntu.com/

  System information as of Thu Mar 19 15:18:36 UTC 2015

  System load:  0.0               Processes:           99
  Usage of /:   19.5% of 7.74GB   Users logged in:     0
  Memory usage: 10%               IP address for eth0: 172.31.33.228
  Swap usage:   0%

  Graph this data and manage this system at:
    https://landscape.canonical.com/

  Get cloud support with Ubuntu Advantage Cloud Guest:
    http://www.ubuntu.com/business/services/cloud

10 packages can be updated.
9 updates are security updates.


Last login: Thu Mar 19 15:18:36 2015 from c-24-22-247-196.hsd1.wa.comcast.net
Agent pid 15723
ubuntu@ip-172-31-33-228:~
$ cd Git
ubuntu@ip-172-31-33-228:~/Git
$ git clone http://github.com/charliecalvert/JsObjects.git
```

The key line, of course, is this one:

     git clone http://github.com/charliecalvert/JsObjects.git

## Step Three: Copy and Link
     
Copy the Route Params project to a folder of your choosing outside
of JsObjects:


```
    cd <TO SOME FOLDER OF YOUR CHOOSING SUCH AS ~/Source>
    cp -r ~/Git/JsObjects/JavaScript/NodeCode/NodeRoutesParams/ .
```    

Now we need to create a symbolic link to our project. We want it to
appear that our project is in the **~/bin directory**. To do this, create
a symbolic link. The simplest way to do that is to navigate to the
folder that contains your project. For instance, if you project is in
**Source** directory, then navigate to the source directory. Then
create the symbolic link like this:

    $ ln -s ~/Source/NodeRoutesParams/ ~/bin/NodeRoutesParams
    
If all works out, you can see the symbolic link in your **bin** directory
by issuing a command like this:

    $ ls -l ~/bin
    
You should see that NodeParams is a symbolic link to your Source/NodeRoutesParams
directory:

    NodeRoutesParams -> /home/charlie/Source/NodeRoutesParams/

Here is the whole process:

```
cd ~/bin
ubuntu@ip-172-31-33-228:~/bin
$ ls -l
total 0
lrwxrwxrwx 1 ubuntu ubuntu 37 Mar 19 22:58 NodeRoutesParams -> /home/ubuntu/Source/NodeRoutesParams/
ubuntu@ip-172-31-33-228:~/bin
```

## Step Four: Set Port

In **bin/www**:


```
#!/usr/bin/env node
var debug = require('debug')('expressapp');
var app = require('../app');

app.set('port', process.env.PORT || 30101);
```

Go to your AWS console. Go to Security Groups, edit the rules for your security
group to open up port 30101. If there is any confusion, you can find the security
group associated with your instance on the **instances** page in the AWS console.
In particular, select your instance, and look down and to your right.

- Type: Custom TCP
- Protocol: TCP
- Port Range: 30101 (Can we write: 30101-30105?)
- Source: Anywhere


## Step Five: Start Upstart

Upstart can be used to keep your program running after you close 
your shell and to ensure that it restarts automatically when you
reboot the system. Take a momement to learn about upstart:

- [UpStart on Elvenware][elfUpstate]
- [UpStart home page](http://upstart.ubuntu.com/index.html)

[elfUpstart]:http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#upstart

Our upstart script is called **NodeRoutesParams**. If you look inside it, you will see that
it assumes your copy of NodeRoutesParams is in **~/bin**:

    exec /usr/bin/nodejs $HOME/bin/NodeRoutesParams/bin/www >> /var/log/node.log 2>&1
    
That is why we created a symbolic link in that folder. That way, regardless of where
you keep **NodeRoutesParams** on your system, our script can find it.    

Copy the **NodeRoutesParams** file to the **/etc/init** directory:

    sudo cp NodeRoutesParams.conf /etc/init/.
    
Start the program

    sudo start NodeRoutesParams
    
Stop the program

    sudo stop NodesRoutesParams

If you reboot the system, your program will start automatically.

Error messages and and other output are in: /var/log/node.log 

Browse to your instance:

    <elasticIp>:30101/
    
For instance, if you were testing all this out on your copy of Lubunutu,
you would do this:

    127.0.0.1:30101/    


## Step Six: Edit Elastic IP
    
Navigate into your copied version of **CordovaNodeRoutes** 

Edit **Control.js**:

    cd ~/Git/JsObjects/Cordova/CordovaNodeRoutes/
    geany www/javascripts/Control.js    

Change the IP address to your elastic IP and the port to the number
you set up in the previous step:

```
var Control = (function() {

        // Constructor
        function Control() {
        $("button").click(function(event) {
            var id = event.target.id;
            var route = 'http://52.11.190.176:30101/routeParams/' + id;
            $("#clientRoute").html('ClientRoute: ' + route);
            $.getJSON(route, function(response) {
                // $('#response').html(JSON.stringify(response));
                $('#route').html("ROUTE: " + response.route);
                $('#result').html("RESULT: " + response.result);
                $('#query').html("QUERY: " + JSON.stringify(response.query));
                $('#params').html("PARAMS: " + JSON.stringify(response.params));
                $('#id').html("ID: " + response.id);

                // elf.utilities.showMessage(choice, true);
            });
        });
```

The relevant line is this one:

    var route = 'http://<CHANGE ME>:30101/routeParams/' + id;
    
Save your work.

## Step Seven: Install 

Now install this cordova application on your phone or on AndroidX86
running in VirtualBox. 


First use ADB to ensure that you are connected to your device:

```
$ adb devices
List of devices attached 
e8e5bc06	device
```

If you are using your phone you don't have to 
explicitly connect adb. But if you are using VirtualBox, you
have to run **adb connect <IP OF ANDROIDX86>.**

Remember these commands:

- cordova platform add android
- cordova build android
- adb install platforms/android/ant-build/CordovaApp-debug.apk

**NOTE**:*On some systems it may be **MainActivity** instead of **CordovaApp**.*

To uninstall it:

- adb uninstall com.elvenware.elven_node_routes

Details are here: [http://bit.ly/elven-android-studio](http://bit.ly/elven-android-studio)
     
## Turn it in

Create screen shots of your web app and cordova app running. Attach
these screen shots when you submit the assignment. Also include
the address of your instance running on AWS at your Elastic IP
and assignment Port.


[nodeParams]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutesParams
[cordovaParams]:https://github.com/charliecalvert/JsObjects/tree/master/Cordova/CordovaNodeRoutes

