---
layout: post
date: 2023-05-08 03:38:38 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/Azure.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud
fileName: Azure.md
relativePath: /cloud/Azure.md
title: Azure
directoryName: cloud
category : cloud-guide
---

# Azure on Elvenware V

<!-- markdownlint-disable MD046 -->

This page covers Windows Azure and related subjects.

Azure is Miscrosoft's cloud development platform. Like Amazon Web
Services and other tools, there are several different services, ranging
from storage, to VMs to platforms for installing applications.

Here are links to key areas in the Azure world:

- Main Site:
  [https://www.windowsazure.com/en-us/](https://wwwwindowsazure.com/en-us/)
- Azure Console:
  [https://windows.azure.com/](https://windows.azurecom/)
- Developer platform installs:
  [https://www.windowsazure.com/en-us/develop/overview/(https://www.windowsazure.com/en-us/develop/overview/)
- 90 Day free Trial:
  [https://www.windowsazure.com/en-us/pricingfree-trial/](https://www.windowsazure.com/en-uspricing/free-trial/)
- Pricing:
  [https://www.windowsazure.com/en-us/pricingcalculator/](https://www.windowsazure.com/en-uspricing/calculator/)

As with Amazon, you need an account and a credit card to start working
in this world. There is a three month free trial available. Again like
Amazon, you probably already have an account with Microsoft, but you
will need to configure it to use the Azure services.

## Install Tips {#installTips}

Using the [Microsoft Web Platform
Installer](http://www.microsoft.com/web/downloads/platform.aspx), make
sure you have the latest [Windows Azure SDK for .NET and the Visual
Studio Tools](https://www.windowsazure.com/en-us/develop/net/). This
will give you the

- Azure SDK
- The Azure Emulator
- IIS ASP.NET, .NET, ISAP, HTTP, MVC3
- Visual Studio Tools

| ![Azure SDK .NE Install](/assets/images/Azure01.png)_ |
|:--:|
| _Figure 01: Installing the Windows Azure SDK for .NET with the Web Platform Installer_ |

[![The success screen for the Azure .net
Install](/assets/images/Azure02Small.png)](/assets/images/Azure02.png)
|:--:|
| _Figure 02: The Successful Install of Azure for .NET and VS_ |

When you are done, you should be able to choose File | New Project
ASP.NET Web Application in Visual Studio, open the Project Manager,
right click on your projects main node (WebApplication1) and select
**Add Windows Azure deployment project**.

While you have the Web Installer open, there are other tools that you
want to install. Two of the most important are the Python Tools for
Visual Studio and the Windows Azure SDK for NodeJS. These installs
include IIS Node and the Node Package Manager.

[![Python tools for Visual Studio and Node JS
Support](/assets/images/Azure03Small.png)](/assets/images/Azure03.png)

**Figure 03: Python tools for Visual Studio and Windows Azure SDK for
Node JS Support**

[![Python Tools for VS and NodeJS for Azure Success
Screen](/assets/images/Azure04Small.png)](/assets/images/Azure04.png)

|:--:|
| _Figure 04: Python Tools for VS and NodeJS for Azure Success Screen_ |

When looking at the Web Platform Installer, you probably noticed that
there is an option to install Visual Studio Service Pack 1. In many
cases, if you check the about screen for Visual Studio, you will find
that you already have SP1 installed, even though this option is
available in the Web Platform Installer. My opinion is that you are all
set so long as you have Visual Studio SP1 installed. If, however, you
feel a strong need to glog up your system with additional useless DLLs
and tools, you can select this option in the Web Platform Installer.
When the procedure completes, you will be greeted with the following
rather depressing list of tools that are now making your system run even
slower than it was. When you go back to the Web Platform Installer, you
will find, of course, that you are still told that you have not
installed VS SP1. Thank you so very much! None of this is meant to
discourage you from installing SP1, which is, of course, an essential
and very valuable tool.

[![Visual Studio SP1
Effluvia](/assets/images/Azure05Small.png)](/assets/images/Azure05.png)

|:--:|
| _Figure 5: Visual Studio SP1 Effluvia._ |

### Install NodeJS {#installNodeJS}

You will also need to install the Windows Azure SDK for NodeJS:

[https://www.windowsazure.com/en-us/develop/nodejs/](https://www.windowsazure.com/en-us/develop/nodejs/)

Here is what the Platform Installer looks like if you have successfully
installed this product.

| ![Windows Azure SDK for NodeJS](/assets/images/Azure06.png)_ |
|:--:|
| _Figure 06: Windows Azure SDK for NodeJS_ |

### Php Install {#phpInstall}

Installing PHP for Azure is a bit different. The install is on CodePlex,
and all you will need to download is a zip file:

[http://phpazure.codeplex.com/](http://phpazure.codeplex.com/)

There are set of five directories in the zip file:

![Azure install for PHP](/assets/images/Azure07.png)

You should copy this 22 MB of files to some well known location on your
hard drive. As always, make sure there are no spaces in the path to your
folder. It is all right if you folder itself has a complex name with no
spaces, such as:
**[J:\\Src\\PHPAzure-4.1.0](file:///J:\Src\PHPAzure-4.1.0)**. You will
notice that this SDK is made by a company called RealdolMan, and
sponsored by Microsoft. As a result, I suppose it has only semi-official
status, but so far I have found it be quite professional.

### Python Install {#pythonInstall}

The [Python install for
Azure](http://blog.smarx.com/posts/tutorial-running-a-python-web-application-in-windows-azure),
on the other hand, is without official sanction from Microsoft.
Nevertheless, it does not really differ so greatly in its fundamentals
from the PHP install. The simplest way to install the product is to be
sure you have a [GitHub client](http://git-scm.com/downloads) of some
kind, links are available for that client at the bottom of this
document. Then you can paste in the following URL and pull down the
files:

- **git://github.com/smarx/pythonrole**
- **[https://github.com/smarx/pythonrole.git](https://github.com/smarx/pythonrole.git)**

Otherwise, you can just go here, and download the zip file:

[https://github.com/smarx/pythonrole](https://github.com/smarx/pythonrole)

![Azure Install for Python from GitHub using GitGui](/assets/images/Azure08.png)

For Python, you will also want to be sure you have installed
easy-install, pip, flask, virtualenv and rocket. You should also install
the Python tools for Windows Azure Storage

- [](http://www.elvenwa/charlie/development/web/Python/install.html#easyins/charlie/development/web/Python/install.html#easyinstall</a></li>%20<li><a%20href=)

## Platforms

There are four languages with top level support on Azure: C\#,
NodeJS, PHP and Java. I have also found a way to run Python on
Azure, though it does not enjoy official support.

### C\# {#c#}

- Overview:
    [http://msdn.microsoft.com/en-us/windowsazure/wazplatformtrainingcourse\_windowsazure\_unit](http://msdn.microsoft.com/en-us/windowsazure/wazplatformtrainingcourse_windowsazure_unit)
- .NET install:
    [https://www.windowsazure.com/en-us/develop/net/](https://www.windowsazure.com/en-us/develop/net/)
- Quick Start:
    [http://msdn.microsoft.com/en-us/library/gg663908.aspx](http://msdn.microsoft.com/en-us/library/gg663908.aspx)
- Code Samples:
    [http://code.msdn.microsoft.com/windowsazure/](http://code.msdn.microsoft.com/windowsazure/)
- C\# CGI in IIS:
    [http://chalaki.com/8-steps-program-install-setup-call-csharp-cgi-programs-in-iis-7/321/](http://chalaki.com/8-steps-program-install-setup-call-csharp-cgi-programs-in-iis-7/321/)

### NodeJs {#nodeJs}

- SDK Download:
    [https://www.windowsazure.com/en-us/develop/nodejs/](https://www.windowsazure.com/en-us/develop/nodejs/)
- Azure Tutorial:
    [https://www.windowsazure.com/en-us/develop/nodejs/tutorials/getting-started/](https://www.windowsazure.com/en-us/develop/nodejs/tutorials/getting-started/)
- Node JS Home: [http://nodejs.org/](http://nodejs.org/)
- Guide: [http://nodeguide.com/](http://nodeguide.com/)
- API Reference: [hhttp://nodejs.org/api/](http://nodejs.org/api/)

Start a NodeJs Powershell in Adminstrator mode by right clicking on
the following link and choosing **Run as administrator**:

**Start | All Programs | Windows Azure SDK for NodeJs | Windows
Azure Powershell for Node JS**

Switch to the drive where you store your source code. Assuming you
want to place your node js code at the root of the drive you should
type

    mkdir \nodejs
    cd \nodejs
    New-AzureService webroles
    Add-AzureNodeWebRole WebRole01
    cd WebRole01
    notepad++ server.js

Here is the code you should place in server.js:

    var http = require('http');
    var port = process.env.port || 1337;
    var server = http.createServer(function (req, res) {
     res.writeHead(200, { 'Content-Type': 'text/html' });
     res.write('<h1>BarBar</h1>');
     res.end('<p>Hello HTTP from the JSNode\n</p>');
    })

    server.listen(port);

If you prefer slightly more valid HTML, then write this instead:

    var http = require('http');
    var port = process.env.port || 1337;
    var server = http.createServer(function (req, res) {
     res.writeHead(200, { 'Content-Type': 'text/html' });
     res.write('<!DOCTYPE html>\n');
     res.write('<html>\n');Running Python
     res.write('<head>\n<title>WebRole01</title>\n</head>\n');
     res.write('<body>\n');
     res.write('\t<h1>BarBar</h1>\n');
     res.write('\t<p>Hello HTTP from the JSNode</p>\n');
     res.write('</body>\n');
     res.end('</html>');
    })

    server.listen(port);

Now start the Azure Emulator:

    Start-AzureEmulator -launch

The entire session looks a bit like this:

    PS C:\> mkdir nodejs
     Directory: C:\
    Mode LastWriteTime Length Name
    ---- ------------- ------ ----
    d---- 6/4/2012 3:48 PM nodejs

    PS C:\> cd .\nodejs
    PS C:\nodejs> New-AzureService webroles

    Service has been created at C:\nodejs\webroles

    PS C:\nodejs\webroles> Add-AzureNodeWebRole WebRole01

    Role has been created at C:\nodejs\webroles\WebRole01. For easy access to Windows Azure services fr
    om your application code, install the Windows Azure client library for Node.js by running ‘npm inst
    all azure’.

    PS C:\nodejs\webroles> cd .\WebRole01
    PS C:\nodejs\webroles\WebRole01> notepad++ .\server.js

    C:\nodejs\webroles\WebRole01>"c:\Program Files (x86)\Notepad++\notepad++.exe" .\server.js
    PS C:\nodejs\webroles\WebRole01> Start-AzureEmulator -launch

    Creating local package...
    Starting Emulator...
    Role is running at http://127.0.0.1:81
    Started
    PS C:\nodejs\webroles\WebRole01>;

You can now use the icon on the taskbar to shutdown the emulator.
The next step is to publish the service to Azure itself.

    Get-AzurePublishSettings

Save the settings to your hard drive:

![Azure Note Credentials](/assets/images/AzureNode.png)

Now import the settings. Below you can see a call to
Import-AzurePublishSettings where the parameter is the name of the
settings file that I downloaded. You can delete or store secretly
the file after you download it. The second call actually publishes
the service under the name Elvenware001.

    Import-AzurePublishSettings .\CharlieCred.publishsettings
    Publish-AzureService -Location "North Central US" -Name Elvenware001

### UUID {#uUID}

Start by opening a command prompt at the root of your project and typing this command:

    npm install node-uuid

Then create the following program:

```javascript
var http = require('http');var uuid = require('node-uuid');

var port = process.env.port || 1337;  var server = http.createServer(function (req, res) {   res.writeHead(200, { 'Content-Type': 'text/html' });   res.write('<!DOCTYPE html>\n');   res.write('<html>\n');
 res.write('<head>\n<title>UUID Demo</title>\n</head>\n');
 res.write('<body>\n');   res.write('\t<h1>UUID Generation</h1>\n');
 res.write('\t<p>' + uuid.v4() + '</p>\n');
 res.write('</body>\n');   res.end('</html>');  })
server.listen(port);
```

Run the program in node and in the browser you will see something
like this:

    UUID Generation
    63163d6b-ce4d-4a14-86d3-28721f6106e6

I have placed a sample program like the one quoted above in AndElf
in the folder Python/AzureRelated.

### Debugging Your Server Side Code {#debuggingYourServerSideCode}

You can debug your server side code in Eclipse. Here is how to
proceed:

- Start Eclipse and optionally set up your project to run in it.
    You don't actually have to set up the project to run Node from
    the IDE, but if you want, you can set everything else up.
- ChoRunning Python on Azureose Help | Install New Software
- Press the Add button
- Enter this address:
    **[http://chromedevtools.googlecode.com/svn/update/dev/](http://chromedevtools.googlecode.com/svn/update/dev/)**
- Choose to install the **Google Chrome Developer Tools**
- Chrome will restart
- Go to the command prompt and run your program in Node with the
    Debug switch:
- `node --debug server.js // See Figure D01`
- In Eclipse, switch to the Debug perspective. (**Window | Open
    Perspective | Other | Debug**)
- Choose **Run | Debug Configurations** from the menu
- Select **Standalone V8 Vm**
- Click the plus button to get a new configuration
- Call it **Server on Port 5858**
- Set the Host to **localhost** and the port to **5858**
- Press Apply to save your work // See Figure D02
- Click the **Debug** button
- In the project explorer find the source for the file you want to
    debug. Look carefully at shots D04 and D05. Notice that I'm
    opening a file with a long name and lots of underscore
    characters. I picked this file from the Project Explorer or
    Script Explorer -- I believe either one will work.
- Open the program in a browser: **<http://localhost:3000>
    //**Figure D03
- Put a break point on one of your methods, such as **request
    //**Figure D04. If you have trouble setting a breakpoint using
    the tools, go into your source code, write the command
    **debugger;**in your source at the place where you want to stop,
    and then restart your debug session.
- Do something in the browser that will fire the call to
    **request**
- Check Eclipse: you should be at the breakpoint. // Figure D05
- When you are done, you should right click on the project and
    close it. Either that, or make sure you are running node in
    Debug mode (Figure D01) when you next open Eclipse. If you don't
    do one of these two things, you may get a lot of errors when you
    open Eclipse. If you do get the errors, right click and close
    the project and restart Eclipse. Yea, I know, it is pretty
    funky: but it does work if you baby it along some.

| ![Starting node in debug mode](/assets/images/Node01.png) |
|:--:|
| _Figure D01: Starting node in debug mode_ |

| ![Setting up the debug Run Configuration](/assets/images/Node02.png)_ |
|:--:|
| _Figure D02: Setting up the debug run configuration_ |

| ![Running your script in the browser](/assets/images/Node03.png)_ |
|:--:|
| _Figure D03: Running the program in a browser_ |

[![Setting the breakpoint in your
source](/assets/images/Node04Small.png)](/assets/images/Node04.png)
|:--:|
| _Figure D04: Setting a breakpoint. Click to expand_ |

If you are not able to set the breakpoint by double clicking or
right clicking in the gutter on the far left of the IDE, then you
can instead insert a breakpoint with code by inserting the word
**debugger**:

    sdb.listDomains(function(error, result, meta) Running Python{
     if( error ) {
     res.send('listDomains failed: '+ error.Message );
     }
     else {
    debugger;
     res.send(result);
     }
    });

You should enter this breakpoint not in your original source code
file, but in the one with the funny long name. You will be asked to
make the file writable, and you should choose yes. Then right click,
choose **V8 Debugging | Push Changes to VM.** Do something in the
browser to cause the line of code you want to execute to be
activated, and your program will stop as expected when it hits the
word **debugger**. You can also put this word in your original
source file, but that seems like an even more unwieldy solution.

Figure D05 shows what it looks like when you hit a breakpoint set
with the IDE tools. It will look the same if you manually enter the
word **debugger** in the source, except of course there will be an
extra line of code where you entered the word that set the
breakpoint:

     else {
    debugger;
     res.send(result);
     }

[![Hitting a breakpoint in your server side
code.](/assets/images/Node05Small.png)](/assets/images/Node05.png)

**Figure D05: Hitting a breakpoint in your server side code. Click
to expand**

| ![Error you get if you don't have node running in debug_ |
mode.](/assets/images/Node06.png)

**Figure D06: Error you get if you don't have node running in debug
mode. (See Figure D01.)**

When looking at Figure D05, note that the **Expressions**,
**Breakpoints** and **Variables** windows are all visible. We are
inspecting the variable called result in both the **Variables**and
the **Expressions** windows.

Reference:
[https://github.com/joyent/node/wiki/Using-Eclipse-as-Node-Applications-Debugger](https://github.com/joyent/node/wiki/Using-Eclipse-as-Node-Applications-Debugger)

### Working on Linux: {#workingOnLinux:}

You can install Node like this:

    sudo apt-get install nodejs
    sudo apt-get install npm

That might not be the most recent nodejs. If that is hte case, then
go here:

    https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

If you need to do file difs, use Meld.

### Running Node from NotePad++ {#runningNodeFromNotePad++}

You can run your Node programs directly from Notepad++:

- Select **Run | Run** from the menu
- Using quotes around any paths that contain spaces, type in the
    path to node and a macro that points to your main script file:
- "C:\\Program Files (x86)\\nodejs\\node.exe"
    "\$(FULL\_CURRENT\_PATH)"
- SavRunning Python on Azuree the command under a name like MyProgram. Specify a shortcut
    like Ctrl + F5
- Now you can run your program directly from NotePad++. At any
    rate, its starts **Node**, and then you can browse to
    <http://localhost:3000> or something similar to use the program.

Notice that NotePad++ starts up a blank command window that runs
your instance of Node. This like the way Node starts, and then seems
to "hang" when you run it from the command line. When you are done,
you can Alt-Tab to this window and press Ctrl-C to close it.

## PHP {#pHP}

- SDK Download:
    [http://phpazure.codeplex.com/](http://phpazure.codeplex.com/)
- Docs:
    [http://azurephp.interoperabilitybridges.com/](http://azurephp.interoperabilitybridges.com/)
- QuickStart:
    [http://azurephp.interoperabilitybridges.com/articles/build-and-deploy-a-windows-azure-php-application](http://azurephp.interoperabilitybridges.com/articles/build-and-deploy-a-windows-azure-php-application)
- SQL Azure from PHP:
    [http://msdn.microsoft.com/en-us/library/windowsazure/ff394110.aspx](http://msdn.microsoft.com/en-us/library/windowsazure/ff394110.aspx)

## Python

- Install:
    [https://github.com/smarx/pythonrole](https://github.com/smarx/pythonrole)
- Install Instructions:
    [http://blog.smarx.com/posts/tutorial-running-a-python-web-application-in-windows-azure](http://blog.smarx.com/posts/tutorial-running-a-python-web-application-in-windows-azure)
- Windows Azure for Python:
    [http://pypi.python.org/pypi/windowsazure/0.1.1](http://pypi.python.org/pypi/windowsazure/0.1.1)
- Azure Storage:
    [https://github.com/sriramk/winazurestorage](https://github.com/sriramk/winazurestorage)
- Flask Docs:
    [http://flask.pocoo.org/docs/](http://flask.pocoo.org/docs/)
- Flask QuickStart:
    [http://flask.pocoo.org/docs/quickstart/\#quickstart](http://flask.pocoo.org/docs/quickstart/#quickstart)
- Larger Applications:
    [hhttp://flask.pocoo.org/docs/patterns/packages/](http://flask.pocoo.org/docs/patterns/packages/)

To get started, make sure have installed Flask, [Virtual
Env](http://www.virtualenv.org/en/latest/index.html), etc:

You should also have the most recent files [AndElf
Mercurial](Mercurial.html).

Copy the Python\\AzureRelated\\AdditionSqlite project to a directory
on your system. Open a command prompt and Navigate to that folder
and create virtual environment by typing v**irtualenv venv**:

    J:\Src\PyDevProjects\AdditionSqlite>virtualenv venv
    New python executable in venv\Scripts\python.exe
    Installing setuptools................done.done.
    InsInstalling pip...................done.

You can see that I have a copy of AdditionSqlite in a directory on
my J drive. You may have installed it somewhere else, but the rest
of the command shown above should look about the same on your
system. If something goes wrong, that probably means that you don't
have virtual environment installed, or else your
**C:\\Python27\\Scripts** folder is not on your path.

Your virtual environment contains a local copy of your Python
installation, just as it will be configured on Windows Azure. That
ensures two things:

- You have Python installed on Azure
- It is the same version of Python that you are expecting
- Your copy of Python is configured exactly as you expect

In short, Virtual Environment gives you the chance to configure your
machine in quite specific ways without actually changing any of the
global settings on your machine.

Start the virtual environment:

    J:\Src\PyDevProjects\AdditionSqlite>venv\Scripts\activate
    (venv) J:\Src\PyDevProjects\AdditionSqlite>

Notice the (**venv**) inserted before your command prompt. This
shows that you are running inside your virtual environment. Now
install Flask into the Python installation for your virtual
environment:

    (venv) J:\Src\PyDevProjects\AdditionSqlite>pip install Flask

Flask is a fairly complex tool that gives you three great tools:

- A light weight web server called Werkzeug. (Should not conflict
    with running instances of IIS or Apache.)
- A template engine called Jinja2 for manipulating HTML
- Flask, a library for writing Python web applications

Now you should have the virtual environment configured properly and
you are ready to run the program by typing **python runserver.py**:

    (venv) J:\Src\PyDevProjects\AdditionSqlite>python runserver.py
    * Running on http://127.0.0.1:5000/7.0.0.1:50* Restarting with reloader

Now you are ready to actually run the program. Fire up a browser and
navigate to the url provided at your command prompt:

[http://127.0.0.1:5000](http://127.0.0.1:5000)

Or, to say the same thing in human readable format:

<http://localhost:5000>

You are now browsing to the AdditionSqlite program using the Wekzeug
web server. The presence of this web server should not conflict with
existing running installs of IIS or Apache. Try the following URLs
to see how the program works:

- <http://localhost:5000/show>
- <http://localhost:5000/add>
- [Call show again](http://localhost:5000/show)

The second time you call show you should see a new row has been
inserted in the Sqlite database from which the program is pulling
data.

When you are done exploring the program, you can press **CTRL-C** at
the command prompt to close the Web Server. To exit the virtual
environment, type **deactivate** at the command prompt.
****

## Running Python on Azure

**NOTICE**: _As Microsoft rolls out there new tools for Azure, it is
becoming clear that we will have an alternative to the Azure
Emulator and the Azure Cloud Services. Instead of using Cloud
Services, which is a **Platform as a Service** model, we can use the
Azure virtual machines, which is an **Infrastructure as a Servic**e
model. Azure virtual machines is still in beta, but it works fairly
well, and it is similar to AWS, so it should be easy for you to use,
or at least easy for you to understand from a conceptual point of
view. You can create an instance of Windows Server or Linux on
Azure, and install your program onto that instance. Just as on AWS,
you need to take a moment to open the ports to let your program
through. On Azure, this means opening endpoints, and you want to
open port 9000 for Python and port 3000 for node, though of course
you can run your programs on whatever port you want, including port
80. Because you can run your programs directly in the Azure virtual
machine, this means that you are nearly done writing code if you
want to use this option rather than Azure Cloud service. Please
note: to use Python on Azure you should use **Rocket** rather
than **Werkzeug**; read the next view paragraphs to see the
simple technique for transforming your Werkzueg code into a Rocket
code._

So now you have the program, such as it is, running locally. The
next step is to try it in the Azure Cloud Services emulator. To
begin, find the copy of the Python Tools for Azure that you
downloaded earlier. Though you can work directly in the GIT
repository, you should probably copy the entire (small) folder to a
new location. Navigate to the WorkerRole\\app directory in the
Python Azure tools and paste in the contents of AdditionSqlist
directory, but without the virtual environment folder:

| ![The app directory just before running on the Azure_ |
emulator](/assets/images/AzurePython10.png)

**Figure P01: The app directory just before running on the Azure
emulator. Notice that I have not copied the venv folder.**

We do not copy the virtual environment folder because the Python
Azure tools will set that up for us autamatically when it is needed.
Before we run the program, you should edit **runserver.py.** You can
see this file in Figure P01. It is a very small text file. All you
need to do is uncomment the references to Rocket:

    import os
    from rocket import Rocket
    from packme import app import app


    if __if __name__ == "__main__":#
    Rocket((os.environ.get('ADDRESS', '0.0.0.0'), int(os.environ.get('PORT', 9000))), 'wsgi', {'wsgi_app': app}).start()
     app.run(debug=True)

Rocket is yet another web server, and for some reason Steve Marx
wanted to include it in his version of the Python Azure even though
Flask already had a web server. Above you can see the way that
**runserver.py**should look after you have uncommented the two
references to Rocket.

The console for the Azure cloud looks very different in its most
recent incarnation. In Figure P00 you can see the Virtual servers,
Cloud Service, databases and Storage Accounts that I have set up in
the cloud.

[![The new interface for the Azure
cloud](/assets/images/Azure15Small.png)](/assets/images/Azure15.png)

**Figure P02: The services you have configured in the cloud appear
in a list.**

[![Figure P04: Setting up the endpoints in the Azure
cloud](/assets/images/Azure14Small.png)](/assets/images/Azure14.png)

|:--:|
| _Figure P03: Setting up the endpoints in the Azure cloud_ |

You can use the Remote Desktop Connection tool that ships with
Windows to connect and configure your server. You will probably see
a button at the bottom edge of one of the Azure screens that will
set up your connection automatically. If you need to do it manually,
you first need to know the name of the server you connect to. Look
at the endpoints panel (Figure P03) to get the port.

When you sign on, you will be prompted for a user name and password.
You supplied the password when you created the VM. You need to
attach using the Remote Desktop Connection. You should use
**Adminstrator** as the user and provide the password you gave when
you created the VM as your credentials. For the domain, you can
probably supply almost anything, but the name of the server itself
can probably act as the domain. For instance, if I call my server
server01, and I access it at server01.cloudapp.net:52333, then you
can probably sign on as:\
\
server01\\Administrator

| ![Connect to the Azure cloud with Remote Desktop_ |
Connection](/assets/images/Azure16.png)

**Figure P04: Connect to the Azure cloud with Remote Desktop
Connection. Note the port number you get from the endpoint screen,
seen below.**\
\
And then give the password you assigned when creating the VM. If
you've lost that password you can always delete the VM and start
over.\
\
To install programs on the server that you already have on your
local machine, you can simple right click on the folder that
contains your node application, choose copy, then pick a destination
on your F drive for your server, and pick paste. It might make sense
to skip big folders like node\_modules and then use NPM on the
server after installing node from this address:\
 \
[http://nodejs.org/](http://nodejs.org/)\
\
Below you can see several program set up to run on an Azure server.

[![Running three web servers on
Azure](/assets/images/Azure11Small.png)](/assets/images/Azure11.png)

**Figure P05: Running three web servers running three web apps on a
beta of Server 2012 in the Azure Cloud. Click to enlarge.**

The screenshot shown in Figure P05 is of a remote desktop
connection. Notice that there is a port number shown in the caption
bar; you need to use that number when setting up the connection. You
can see that I have web apps running at port 80, 3000 and 5000. The
browser, seen in the background, displays the program that is
running at Port 80 in the Rocket web server.

| ![Looking at the Azure apps running in the browser on my home_ |
machine](/assets/images/Azure12Small.png)

**Figure P05: Looking at the Azure apps running in the browser on my
home machine**

In Figure P03 I've minimized my connection to the Azure virtual
machine and connected to the applications that it is running in my
browser. Notice that I am also running a Node web app on a Linux box
in the Amazon Web Server cloud.

[![Please, may my application come through the firewall. I've
already set up the
endpoint!](/assets/images/Azure13Small.png)](/assets/images/Azure13.png)

**Figure P05: Please, may my application come through the firewall.
I've already set up the endpoint!**

Just setting up the endpoints (Figure P04) wasn't enough. I also had
to configure the server to let the ports passed the firewall.

### Using Virtual Machines {#usingVirtualMachines}

To deploy this code to an Azure virtual machine, do the following:

- [https://www.windowsazure.com/en-us/manage/windows/](https://www.windowsazure.com/en-us/manage/windows/)
- (_If you are in the old console view, look for the link at the
    bottom that references the preview. Click it._)
- Select New | Virtual machine (You may have to sign up for the
    beta. You will have an option to choose Server 2012. Why not go
    for it?)
- Attach a disk and assign it to drive A (2 GB would be way more
    than enough)
- Open up an endpoint either at port 80 or port 9000
- Using the standards Windows tools to set up your machine to run
    Python
- Run your python code as described above, or edit the
    runserver.py to use Port 80

I understand, you want more detail, but this should get you started.

### Using Steve Marx's Solution {#usingSteveMarxsSolution}

To get through the next part, you need to think about the structure
of Steve Marx's code. It looks like this:

    -PythonRole
    -- WorkerRole
    --- app

As you can see, we have three folders nested inside one another. In
the WorkerRole folder there is a copy of run.cmd. There is also a
copy in PythonRole. You should edit the one in WorkerRole so that it
calls runserver.py rather than app.py.

Here is the file you need to edit:

| ![Finding the right copy of run.cmd](/assets/images/AzurePython11.png)_ |

|:--:|
| _Figure P02: Finding the right copy of run.cmd_ |

And here is the change you make to the last line of the file:

    cd /d "%~dp0"

    set PATH=%PATH%;%PYTHON_PATH%

    REM Use this virtual environment.
    call scripts\activate

    cd app

    python runserver.py

Be careful not to confuse this copy of run.cmd with the copy found
in the root of the Python Azure tools directory.

Before you can run the Azure emulator, you will have to start a SQL
Azure prompt. Choose **Start | All Programs | Windows Azure SDK for
.NET | Windows Azure Command Prompt**

Navigate to the root of the Azure tools for Python and run the
script called run.cmd. You may be prompted four or five times to
sign over to Steve Balmer your:

- First Born
- Your house
- Second Born
- Parents

Be sure to click OK at each prompt. Now navigate to:

**<http://localhost:81>**

All should be exactly the same as running it at port 5000, only this
time you are emulating how it will work on Azure. If it worked
before, but does not work when you run in the emulator, consider
whether or not you installed Rocket into your main Python
installation. (Oddly enough, it appears to be the
[C:\\Python27](../../../../Python27) version of Python that the
emulator uses. But when you install to Azure itself, it will use the
virtual environment. Stever Marx's Python Azure tools will, however,
ensure that Rocket is intalled in Azure proper.

Finally, run the Pack command from the root of the Python tools for
Azure, then navigate to the Azure console on the web, and follow the
prompts to install the files created by your call to Pack. Please
note that on Azure you will be able to read from your database, but
inserts will fail, presumably because Azure is a readonly
environment. We will address that issue later.

## Express and Jade {#expressAndJade}

jade --out tmp/ --path views --pretty --obj '{title: "Elvenware" }'
{views/index,views/layout}.jade

## Storage and SQL Azure {#storageAndSQLAzure}

- Storage:
    [d](https://www.windowsazure.com/en-us/home/features/storage/)
- SQL Azure:
    [https://www.windowsazure.com/en-us/home/features/sql-azure/](https://www.windowsazure.com/en-us/home/features/sql-azure/)
- SQL Azure from Linux:
    [http://www.easysoft.com/products/data\_access/odbc-sql-azure-driver/linux-unix.html](http://www.easysoft.com/products/data_access/odbc-sql-azure-driver/linux-unix.html)

## Additional Notes on Node

Learn about NodeJS:

    https://www.windowsazure.com/en-us/develop/nodejs/

    npm install azure node-uuid
    DSInit /sqlInstance:.

SimpleDb:

[https://github.com/rjrodger/simpledb](https://github.com/rjrodger/simpledb)

Templating engines:

[https://github.com/joyent/node/wiki/modules\#wiki-templating](https://github.com/joyent/node/wiki/modules#wiki-templating)

This usually means that you don't have a default file set for your application. Try explicitly naming the file:

    http://localhost:81/server.js

## 403 - Forbidden: Access is denied

\<defaultDocument\>\
\<files\>\
\<add value="server.js" /\>\
\</files\>\
 \</defaultDocument\>

````html
    <?xml version="1.0" encoding="utf-8"?>
    <!--
      For more information on how to configure your ASP.NET application, please visit
      http://go.microsoft.com/fwlink/?LinkId=169433
      -->
    <configuration>
      <appSettings>
        <add key="EMULATED" value="true" />
      </appSettings>
      <system.webServer>
        <modules runAllManagedModulesForAllRequests="false" />
        <defaultDocument>
            <files>
                <add value="server.js" />
            </files>
        </defaultDocument>
        <!-- indicates that the server.js file is a node.js application
        to be handled by the iisnode module -->
        <handlers>
          <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
        </handlers>
        <rewrite>
          <rules>
            <clear />
            <rule name="app" enabled="true" patternSyntax="ECMAScript" stopProcessing="true">
                <match url="server\.js.+" negate="true" />
                <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
                <action type="Rewrite" url="server.js" />
            </rule>
          </rules>
        </rewrite>
      </system.webServer>
    </configuration>
```

## Links

    - [Tortoise GIT](http://code.google.com/p/tortoisegit/)
    - [http://windows.github.com/](http://windows.github.com/)
    - [Azure
        Discussion](http://programmers.stackexchange.com/questions/64727/windows-azure-vs-amazon-ec2-vs-google-app-engine)

Copyright © [Charlie Calvert](https://www.elvenware.com)) |
