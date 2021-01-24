
Elvenware Web Services
----------------------

This document covers a range of web services available through AWS.

Cloud Videos {#cloudVideo}
------------

Watching a video on data centers can sometimes help someone new to the cloud get oriented. The idea that data is stored "somewhere in the cloud" can sometimes cause more confusion than solution. Our data is stored somewhere, on some computer or set of computers in a specific location. The following video may help some people get oriented, and hence feel a bit more at home.

- [NyTimes Cloud Video](http://www.nytimes.com/interactive/2012/09/22/technology/data-center-tour.html)
- [Streetview Google Data Center](http://www.google.com/about/datacenters/inside/streetview/)
- [Google Container Data Center](http://youtu.be/zRwPSFpLX8I)

Amazon Web  Services Overview {#aws}
----------------------------

The Amazon Web Services (AWS) provide a wide range of cloud tools.  The one year of free service is called the AWS Free Usage Tier. If you have not used AWS before, you will probably want to sign up for AWS the first
time using the Free Tier. Even though the free tier may not end up costing you anything, Amazon will still want you to supply a credit card. This is necessary because you can run expenses when using the free
tier, as explained below.

**NOTE**: If you already buy things on [Amazon.com](http://www.amazon.com), then you have an account with
Amazon, and have (almost certainly) already given them a credit card number. This may make signing up for AWS a bit easier in some cases. If you don't have an Amazon account, then they will ask you to provide a credit
card number, and perhaps step you through some other hoops.

Below you will find links to both the free tier and to the AWS home page. Remember, if you are signing up for the first time, sign up from the free tier page or you won't be able to take advantage of the one year of free service!

-   First time AWS users start on free tier:
    [http://aws.amazon.com/free/](http://aws.amazon.com/free/?utm_source=awshomepage&utm_medium=banner&utm_campaign=BA_homepage_windowsfreetierbanner&utm_content=banner_V01&trk=BA_homepage_windowsfreetierbanner)
-   Amazon Web Services home page:
    [https://aws.amazon.com/](https://aws.amazon.com/)

If you sign up for the one year of free service, note that this is not an open ended agreement. Only certain services are available for free, and you can run up a tab on AWS even if you are signed up for the free services. The key to making it work for you is finding out which services are free, and how much of them you can use before you start running up a tab. The rates on AWS are not as high as I expected them to be; once the one year is up, you may still find that many of the Amazon services are quite inexpensive. Nevertheless, you can run up a tab if you are not careful.

The classic way to run up a tab on the free tier is to start more than one micro instance on EC2. Running one micro instance at a time is usually free, even if you leave it running all month. However, if you start two instances at the same time, and leave them running all month, then you will get one for free, and pay for the second instance. More specifically, you will get both of them for free for the first half of the month, at which point you will begin being charged for both instances. Two machines for 1/2 month is the same thing as one machine
for a whole month. If you start three or four instances, then you will begin being charged even sooner. The lesson, of course, is to never leave two machines running at once, or be sure to shut one or both of them down as soon as you are finished using them. 

The key is to not go over the limit of 750 hours a month for you total EC2 micro image usage. If you ran four instances at once for only one hour a day, you could still do that 7 days a week and not be charged. You would then be using 4 hours a day, approximately 30 days a month, which is 120 hours, well below your 750 hour limit. But be careful if you start playing that game, as it is very easy to accidentally leave the machines running.

If you are using S3 on the free tier, then you get 5 GB of storage free each month, plus 20,000 get requests and 2,000 put requests. If you are student, or a casual user, it is unlikely that you will exceed those limits. However,
if you start a web services gets millions of hits a day, then you will obviously exceed your 20,000 hits fairly early on in the process. Of course, if you are getting millions of hits a day, you should be able to figure out a way to monetize your site, and pay the AWS fee.

The point is that the free tier is a good deal if you use a little common sense, and understand the rules, as they are laid out on the free tier home page, linked above. If you want to see the pricing for EC2 or some other service when you are not on the free tier, you will find this information featured prominently on the AWS site. For instance, [here are the costs for EC2](http://aws.amazon.com/ec2/pricing/).


##Amazon S3 {#s3}

This is simple storage in the cloud. It allows you to rent a static page web server in the cloud on a "pay as you go" basis. This can, in at least some circumstances, be cheaper than renting your own web site under your
domain name. 

S3 is linked in with all the other Amazon services, including CloudFront, which allows you to cache the resource on edge servers. That means you can place the resource on a server near certain geographical locations such as Europe, the East Coast, the West Coast or Asia, and then have the resource cached on multiple servers in those locations. This means you can scale up to meet very high demand.

When using S3, we create buckets, and store objects in the buckets. Roughly, this is equivalent to creating folders and storing files in the folders -- but it is not quite that simple. We typically store text files, videos,
photos, mp3 files, etc., in S3. There is no option for running server side scripts on S3. For that, you need a service like EC2. You can, however, combine S3 with free databases services such as [MongoLab](https://mongolab.com/).

Below in Figure 1 you can see AWS console for S3. Note the buttons or menu items labeled:

-   **Create Bucket**
-   **Create Folder**
-   **Upload**
-   **Open**
-   **MakePublic**

When creating a bucket, you need to follow a particular set of naming
conventions, or your folder may not behave correctly even if it is
created successfully. In particular:

-   Use only lowercase letters, no uppercase letters
-   Your name can contain numbers, periods, underscores and dashes. For
    instance : **123.elvenware-top\_show**. You must begin the name with
    a number or a letter. In other words, the first character cannot be
    a period, underscore or dash, and the name you create cannot
    resemble an IP address: 192.168.0.1.
-   The name can be between 3 and 255 characters in length
-   The name you choose should be unique. If you own a domain name, this
    might be a good use for it. For instance, I've named one of my
    buckets **s3bucket01.elvenware.com**

[![Using S3 while Working in Amazon Web Services](http://www.elvenware.com/charlie/development/cloud/images/AmazonWebServices01Small.png)](images/AmazonWebServices01.png)

**Figure 01: Working in the S3 Cloud with Amazon Web Services. This name
cscTest is a bad choice, since it contains an uppercase letter.**

After you upload some files to your site, you can right click on them
and choose:

-   Open
-   Download
-   Make Public
-   Rename
-   Deelte
-   Cut
-   Copy
-   Properties

The **Open** button will allow you to open a private copy of your
object. In this case, I have uploaded an HTML file, and when I choose
**Open**, the file is open in a Browser window - or at least it will be
if you enable popups for this site. (There is no reason not to enable
popups for Amazon Web Services, as this is not the kind of site where
you are likely to be spammed.)

 The **Make Public** menu option allows you to make the resource public.
If you want to share this page with someone else (such as your teacher),
then you need to select this option for all the files you want to share.
You can multiselect the files, then choose**Make Public** once for all
of theml.

After you make an HTML file public, you can view the **Properties** for
the resource to discover the URL associated with this resource, as shown
in Figure 01a. You can then give the URL to a third party, and they will
be able to access the resouce. The URL shown below circled in red is
clickable, so you can just click it once to open your HTML. If
everything looks right, you can then copy the URL from the address bar
of your browser.

[![Finding the URL for an HTML
file.](images/AwsS3-01Small.png)](images/AwsS3-01.png)

**Figure 01a: After right clicking and choosing properties, you can copy
the URL for your HTML file from the window on the bottom right of the
console. Click image to enlarge.)**

To create a functioning website, you need to be sure that your bucket
follows the naming rules outlined above. If you have done that, then you
can right click on your bucket, choose properties, and then turn the
WebSite page which is now revealed in the properties window. Enable the
web site, specify a default index file, and save your work, as shown
below in Figure 01b. You will then have created a functional web site.

[![Setting up an S3 Web
Site](images/Aws-S3-01-Small.png)](images/Aws-S3-01.png)

**Figure 01b: Setting up an S3 Web Site. Note that the bucket name,
s3bucket01.elvenware.com is in all lowercase letters, enabled is
selected, and a default index file is specified. The link to the site is
shown on the bottom right of the properties page.**

One way to test that everything is working is to open a second browser
and test your link in it. For instance, if you are using Chrome, then
open FireFox. Makes sure you are not signed into AWS on FireFox and then
try to visit your link. If it works, then it will probably work for
others to whom you give the link. The key is not test your link in
browser where you already have an active connection to AWS that might
automatically supply your credentials. (I actually use this trick quite
often. In particular, I generally reserver Safari as my test browser,
and don't sign in to any services using it. That way I have a
*relatively*clean slate for testing links. Another technique would be to
test on the browser for a virtual machine.)

Here is some useful information on using S3 to host a web site:

-   [http://docs.amazonwebservices.com/AmazonS3/latest/dev/WebsiteHosting.html](http://docs.amazonwebservices.com/AmazonS3/latest/dev/WebsiteHosting.html)

Amazon EC2 {#ec2}
----------

EC2 allows you to run Linux or Windows virtual machines in the cloud. In
effect, you are renting a machine in the cloud for an hour, a day, a
month, or a year. The length of time is up to you. You can stop, start
or delete the machine at any time. The most expensive option is to run
the machine all the time. If you stop the machine, [the
cost](http://aws.amazon.com/ec2/pricing/) lowers dramatically. If you
delete the machine, you are not charged at all. For first time users,
there is an option to run a virtual machine in the cloud nearly free for
a year.

The OS you rent will run in a virtual machine. This means you can rent
an OS such as Linux or Windows running on servers maintained by Amazon.
You access the machine over the Internet, as explained below.

You will have full control over the instance of the OS that you choose
to run. You can install applications, stop and start services, create
folders and add files. You will be able to open ports, so that you can
run a web server on your virtual machine.

When using AWS, I prefer to run Linux, since it provides excellent
network services and has lots of free software that you can install. You
will have various choices about the distribution of Linux you prefer,
but I almost always run Ubuntu because it is relatively easy to use and
is well documented.

Typically, you will use SSH to get to the command line of your remote
server, as explained [below](#ipPuttySsh). From there you can use
**apt-get** to install a web server and the [rest of the LAMP
stack](http://www.elvenware.com/charlie/development/database/mysql/MySql.html#installOnLinux).
LAMP stands for Linux - Apache - MySQL and PHP/Python/Perl. This is
common platform for Web applications. Indeed, much of what we call the
Internet is run on machines that use LAMP. [A November, 2012
report](http://w3techs.com/technologies/overview/web_server/all), for
instance, states that 64.6% of web sites run on Apache, while 17.3% run
on Microsoft IIS.

Ubuntu is free, but AWS is not. Even if you have the AWS [free
tier](http://aws.amazon.com/free/), it can get pricey to keep your OS
running all the time if you do not take precautions. But you can save
money by using a single micro instance of Ubuntu, and by shutting the
instance down when you are not using it. You are charged much less for a
stopped instance than you are for a running instance. If you delete or
"terminate" your instance, you will not be charged at all, but of course
you will have to completely rebuild your OS the next time around. None
of this should matter if you have the [free
tier](http://aws.amazon.com/free/) and a [micro instance of
Ubuntu](http://aws.amazon.com/ec2/#pricing). In that case, you can run
one micro instance all month long without running up any significant
charges.

If you want to switch between multiple instances so that you can
experiment with different configurations, just be sure to stop one
instance before you start another. The key number to consider is 750.
That is the number of hours you can run a micro instance per month
without charge on the free tier. Essentially that means you can run the
instance for the entire month. However, if you create two instances, and
leave them both running all month, then you will use 1500 hours, and
start being charged. The bill will be surprisingly small, but it is
probably more than you want to pay. To avoid that situation, simply stop
one instance before starting the second instance.

Students will find that it is usually not necessary to have an instance
running all the time. You can often just run the instance for the two or
three hours that you are working on it over the course of a day. You
will, of course, probably need to leave the instance running for a
number of days when you are waiting for your teacher to grade work that
is running on the server.

AWS EC2 Install {#ec2Install}
---------------

It is not difficult to create an instance of Ubuntu running on AWS.
There are two techniques you can use:

-   Classic Wizard
-   Quick Launch Wizard

Here is a video that you might find useful:

- [Install on EC2 Video](http://www.youtube.com/watch?v=TjVWpNZfTPE)

Let's run through the Quick Launch Wizard first as it is extremely easy
to use. On the main page of the wizard:

-   Name your instance
-   Create a new Public/Private key pair and download it, or select an
    existing pair if you have one already. Remember where you place the
    download, as **you will need it when you want to use Putty to
    connect** to your virtual machine. (See [further down](#ipPuttySsh)
    on this page for a link to the section on using Putty.) If you are
    going to want to connect from multiple machines (work, school, home)
    then put the key somewhere you can access it easily. For instance,
    save it to a secure location in the cloud, or put it on your laptop
    or a thumb drive.
-   Choose the most recent 32 bit release of Ubuntu Linux Server, which
    is version 12.04 at the time of this writing. Stick with the 32 bit
    release, as it is part of the Free Tier.

Here is what the screen might look like:

[![EC2 Quick Launch Wizard](images/Ec2QuickWizard01Small.png)](images/Ec2QuickWizard01.png)

**Figure: The EC2 Quick Launch Wizard. Fill in a name at the top, create
a new  (or select an existing) SSH key pair, download it, and choose the
type of OS you want to use. (Click to expand this image.)**

After you have completed Page 1 of the Quick Launch Wizard, press the
continue button. On the next page, review your work and press the Launch
button.

Great. You are done. If only installing an OS on a local machine were so
easy! The next steps will be to set up security so you can use ports 22
and 80, and then sign in with Putty and update your system with
**apt-get**.

Here is walk through of the classic wizard. Go to the EC2 Management
Console. Choose Launch Instance. You will be asked to step through a
wizard. You have to move through several steps:

-   The first step involves choosing the OS you want to run in your
    virtual machine. My advice is to choose Linux Ubuntu 12.04 32 Bit,
    or whatever version of Ubuntu is most recent. It is best to choose
    the 32 bit version, as it is part of the Amazon Free Tier.
-   Create 1 micro instance in any zone. Again, you want to be sure it
    is a micro instance, so that it will be part of the free tier.
-   Choose the defaults for the Advanced Instance Options
-   Create a tag pair for your instance. Key: MyName01 Value:
    WebServer01. The value part of the pair can be any word you want. I
    recommend, however, that you create some meaningful name so that you
    can easily select particular instance at a later date. Problems can
    occur if you don't name your instance. AWS will create a default
    name for your instance, but it is likely to just be a long string of
    letters and numbers that is hard to remember. This can be a problem
    if you create several instances. How can you tell one instance from
    another? The best way is to assign a meaningful name to your
    instance, then you will be able to select it easily. Even if you
    call the first instance WebServer01, and the second one WebServer02,
    you will probably be able to tell them apart, while you might find
    the default names assigned by AWS to be meaningless.
-   Create an SSH key pair and save the PEM file. Remember where you
    saved it. This file is essential, as you will use it to SSH into
    your server after it is created. Below you will find links to
    descriptions of how to use a tool called Putty to SSH from your home
    machine to your cloud based instance of Ubuntu. With SSH, you can be
    placed at the command prompt of your Ubuntu instance, and from there
    you will have the power to completely control your virtual machine.
    The fact that you are at your desk at home, and your virtual machine
    is running in some remote city becomes irrelevant. From your point
    of view, the remote instance of Ubuntu might as well be installed on
    your local computer. You will have complete control of it.
-   Everything else can be the default.

Security Groups on EC2 {#ec2SecurityGroups}
----------------------

You must have Port 22 open so that you can access your instance with
SSH. The port should be open by default. You will, however, probably
want to have both Port 80 (HTTP) and Port 22 (SSH) open on your EC2
instance. Opening these ports ensures that:

-   You can visit the Linux command (shell) of your instance using SSH:
    Port 22.
-   That your Linux box can serve up web pages to a browser using HTTP:
    Port 80.

When we send a request to a machine over the Internet, we need to
include two pieces of information:

-   The IP address of the machine that contains the information we seek.
    The IP address uniquely identifies a particular machine. It is like
    the address of a house: out of all the houses in the world, I want
    to get to this particular house in this city, on this street, at
    this location. (Example IP address: 192.168.1.3. So, we can say 132
    Camp St. Oak Park, IL 93022 is analogous to IP address like
    192.168.1.3.)
-   The Port tells which service on that machine you want to use. If you
    append Port 80 to an IP address, then you are saying that you want
    to use the machines Web Server. We can therefore think of specifying
    Port 80 as a means of asking for the web server software running on
    the system. If you append Port 22 to the IP address, then you are
    saying you want to use its SSH server. (Example: 192.168.0.1:80) I
    should add that you hardly ever have to explicitly add Port 80 to an
    IP address since Web Servers and HTTP tools know that is the default
    HTTP Port. You will, however, often have to explicitly state that
    you want to use Port 22 when filling out dialogs in various utility
    applications such as Putty or Filezilla that use SSH. This is
    necessary because these tools can and frequently do make connections
    over other ports.)

It is fairly simple to tell an EC2 instance to open up a particular port
on a machine. As shown in the Figure below, if you select a particular
instance that you have installed in the EC2 dashboard, then you can see
a list of its properties. On the bottom right of the list of properties
is the **Security Group** associated with your instance.

![ECS Security Group in the AWS Console][ecsec01]

**Figure: EC2 Security Groups in the AWS Console. [Full Size Image.][ecsec02]**

Select your instance using a checkbox, view the properties on the bottom right, or configure by selecting Security Groups from the lower half of the menu on the far left.

There is a hyperlink labeled "view rules" in the Security Group section at the bottom right of the properties window. Click that link to view the Ports currently open on your system. If you don't see ports 80 and 22 listed, then you need to edit your currently selected Security Group.

To edit a Security group, select the **Security Groups** link in the
**Network and Security** menu on the lower left of the console, as shown
in the screenshot below. You may have one or more Security Groups.
Select the one you are currently using. For instance, if you look at the
screen shot above you can see that I am currently using the Security
Group called **quick-start**. Below you can see that I selected that
Security Group, and that I am able to edit it in the **Inbound** page
shown at the bottom right of the screen. I am able to create rules for a
particular port, add the rules to the Security Group, and save (apply)
my work. You can also delete a rule if you make a mistake. Once you get
started, you should find the process simple and intuitive.

[![Configuring a Security
Group](images/Ec2SecurityGroups02Small.png)](images/Ec2SecurityGroups02.png)

**Figure: Configuring a Security Group. Select the Security Group menu
on the left, select one of your security groups, turn to the Inbound
Page, Add Rules for Ports 22 (SSH) and 80 (HTTP), save your changes by
clicking Apply Rule Changes. (Click image to expand.)**

When looking at the Inbound section of the AWS console page shown above,
notice that the **Create a new rule** drop down box says HTTP. All you
need to do is select this item, the one that says HTTP, then click the
Add Rule button, and finally click the Apply Rule Changes. When you are
done, the section labeled TCP, should look as it does in the screen
shot. In particular you should see two ports labeled 22(SSH) and 80
(HTTP):

![EC2 Security Group with Ports 80 and 22
open](images/Ec2SecurityGroups03.png)

**Figure: EC2 Security Group with Ports 80 and 22 open**

[ecsec01]: http://www.elvenware.com/charlie/development/cloud/images/Ec2SecurityGroups01Small.png
[ecsec02]: http://www.elvenware.com/charlie/development/cloud/images/Ec2SecurityGroups01.png

IPs, Putty, SSH, HTTP and Ports 22 and 80 {#ipPuttySsh}
-----------------------------------------

Before you can do much with EC2 instance, you will probably want to open
up Ports 22 (SSH) and 80 (HTTP). You will not be able to use SSH to
visit the command line of your Linux instance until you confirm that
Port 22 is open, and you will not be able to serve up web pages with
Apache until you open up Port 80.

NOTE: If you are on a MAC, type the following to connect, where
MySSH.pem is the name of the PEM file you downloaded from EC2 and
192.168.1.3 is your elastic IP:

``` {.code}
ssh -v -i MySSH.pem ubuntu@192.168.1.3
```

In particular, your first steps will be to make sure Port 22 is open, to
install an SSH client on your Windows machine, and to import your SSH
private key so that you can SSH into your new instance. If you are
running on a Windows machine, then you want to download and install
Putty. You can read about Putty and Port 22 here:

-   [Elastic IPs](#elastic)
-   [Security Groups and Opening Ports](#ec2SecurityGroups)
-   [Learn how to install Putty](SshFtpsPutty.html#putty)
-   [Learn how to import a PEM file.](SshFtpsPutty.html#pem)

Some readers will perhaps be wondering about running Windows instead of
Linux. When I create an instance of an OS in the cloud, my primary goal
is usually to create a web site, or to provide other network based
services. These are tasks that I find simplest to perform on a Linux
server. However, if you prefer Windows, there is no reason why you could
not install Windows instead of Linux. There is, however, at least some
argument in favor of using Microsoft Azure rather than AWS if your goal
is to run Windows in the cloud.

That is all I want to say about EC2 at this point. As you can see, the
actual install of an EC2 instance is not difficult. If something does go
wrong, simple delete (terminate) the instance you created and start
again. It can take an hour or more to install an instance of an OS on a
machine at home, but creating an instance in the cloud takes only a few
minutes. You can therefore feel free to experiment until you get an
installation that meets your needs. It is only later, once you have put
some time into configuring an instance, that you will pay a price if you
have to delete it and start over.

To learn more about EC2, read the following:

-   [Getting started with an EC2 Linux
    Instance](http://docs.amazonwebservices.com/AWSEC2/latest/GettingStartedGuide/Welcome.html?r=1874)
    
## AWS Connection Checklist {#aws-checklist}

- Is ssh-agent loaded?
- Have you called ssh-add    

Elastic IPs {#elastic}
-----------

Because EC2 creates instances on the fly, the address of your instance
might change at any time. To remedy this, use an Elastic IP, which will
not change. It will be up to AWS to link your unchanging Elastic IP
address with the changing address of your instance. (When I say that the
address of your instance changes, I'm referring to a process that occurs
over a period of days, or when you restart an instance. It is not that
the address morphs every few minutes.)

Go to the **EC2 dashboard**. On the left, under **Network and
Security**, you will see a link labeled Elastic IP. Choose this link.

![ElasticIPs][elastic1]

You will be taken to a page with a button on the top labeled **Allocate
New Address**. After allocating the address, choose the **Associate
Address** button at the top of the page. Select the instance with which
you want to associate your IP address. 

![Attaching an elastic IP][elastic2]

This is one of those moments when you will be glad if you created a tag pair for your instance, as the
name you choose should be easy to find. (Of course, if you only have one instance running at a time, it is not hard to pick from a list of running instances!)

When you are done, your instance will be associated with your elastic IP address. Your elastic IP address will not change. You can give it to a friend, to a teacher, to the public, with the assurance that it will still be available when they try to access your site. 

![Attached elastic IP][elastic3]

**Caveats**: Of course, if you stop your instance, then no one will be able to access your site, even if you do have your elastic IP associated with your stopped instance. Also, Amazon doesn't want you to squat on top of an elastic IP. As a result, they will charge you extra if you do not associate an elastic IP with a running instance. The sum is not large, but still, you would probably prefer not to leave an elastic IP unattached to an instance for long periods of time without good reason. In other words, if you are going to shut down your EC2 instance, and don't plan to start it for months, then you should consider deleting your elastic IP so you won't be charged for learning it unattached. The problem is not with an attached elastic IP, it is unattached elastic IP's that Amazon does not like.

[elastic1]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/ElasticIp01.png
[elastic2]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/ElasticIp02.png
[elastic3]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/ElasticIp03.png

## Access Credentials

To access some features of AWS, you will need and be able to find your
access credentials. Though there are many things you can do on AWS
without using these credentials, I nonetheless provide a link to them
here at the top of the article in case you do need them:

[https://aws-portal.amazon.com/gp/aws/securityCredentials](https://aws-portal.amazon.com/gp/aws/securityCredentials)


Python and Boto {#boto}
---------------

As you start digging into the features of AWS, you will probably want to
gain programmatic control over the available tools. It is nice to be able
to go to the AWS console and **stop**, **start** and **configure**
services, but sometimes you will want to perform actions automatically,
without logging onto the console, and at the click of a single button.
One way to accomplish this goal is to start writing scripts that control
AWS services. I like to use Python for this task, and Python works best
with AWS after you have installed a Python library called **boto**.

Perhaps the simplest way to get started is to download the Python tools
and start working.

-   [AWS Python Development Center](https://aws.amazon.com/python/)
-   [Getting Started with AWS and
    Python](http://aws.amazon.com/articles/3998?_encoding=UTF8&jiveRedirect=1)
-   Boto:
    [http://boto.readthedocs.org/en/latest/](http://boto.readthedocs.org/en/latest/)
-   The Zip file:
    [https://github.com/boto/boto](https://github.com/boto/boto)
-   Cloudhackers:
    [http://boto.cloudhackers.com/en/latest/index.html](http://boto.cloudhackers.com/en/latest/index.html)
-   [SimpleDb](http://boto.readthedocs.org/en/latest/simpledb_tut.html)

If you run python from the command prompt, you will find that boto is
already installed:

``` {.code}
ubuntu@ip-10-195-217-227:~$ pythonPython 2.7.2+ (default, Oct 4 
        2011, 20:03:08)[GCC 4.6.1] on linux2Type "help", "copyright", 
        "credits" or "license" for more information.>>> import boto>>>
```

To install boto, go to the link shown above and download boto. boto is
stored an a tarred and gzipped format. You can use 7-Zip to decompress
it. [Navigate](/charlie/os/windows/faq.html) to the folder where you
decompressed boto and then type:

``` {.code}
python setup.py build
python setup.py install
```

Issuing the commands shown above will install boto into the home folder
for your copy of Python. These means that boto will be available
whenever you run boto on your system, regardless of the folder you might
be in at the time.

Besides the option shown above, also consider: **pip install -U boto**

Running Python Scripts for SimpleDb {#simpleDb}
-----------------------------------

SimpleDB is another important service offered by Amazon. Just like S3
and EC2, SimpleDB provides developers with a major tool that is part of
many applications. In this case, the tool is used to right queries
against a database. The interesting thing about SimpleDB, however, is
that it does not support relational data. Instead, it is highly
optimized to support large quantities of data arranged in simple tables.

-   [SimpleDb on AWS](http://aws.amazon.com/simpledb/)
-   [SimpleDb and
    Python](http://boto.readthedocs.org/en/latest/simpledb_tut.html)
-   [SimpleDb and Python
    Wiki](http://code.google.com/p/boto/wiki/SimpleDbIntro)

You can run Python as an interactive tool. This allows you to try out
lines one at a time, and see if they work. If they do work, you might
copy them into a text file and preserve them as part of a script. The
following text shows an interactive Python session that uses the AWS
SimpleDB service. Note that the session begins by starting Python by
simply typing the word **python.** This will start a Python session if
Python is on your PATH. If Python is not on your PATH, then you will
probably have to type something like **C:\\Python27\\Python.exe** to
start your session. The interactive parts of the session are the parts
where you, as the user, must type something at the python prompt. The
Python prompt consists of three angle brackets. For instance, here is an
example of invoking the python print command:

``` {.code}
>>> print "hello world"
```

Once you have mastered the basics, you can begin your SimpleDB session:

``` {.code}
C:\source>python
Python 2.7.2 (default, Jun 12 2011, 14:24:46) [MSC v.1500 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import boto
>>> conn = boto.connect_sdb(aws_access_key_id='XXX',aws_secret_access_key='YYY')
>>> conn
SDBConnection:sdb.amazonaws.com
>>>
>>> domains = conn.get_all_domains()
>>> domains
[Domain:History, Domain:MyStore]
>>> dom = conn.get_domain('History')
>>> dom
Domain:History
>>> query = 'select * from History'
>>> rs = dom.select(query)
>>> for j in rs:
... print j
...
{u'Category': u'Presidents', u'LastName': u'Washington' etc...
```

If you get an error that looks something like this, then that means you
don't have BOTO installed:

``` {.code}
Traceback (most recent call last):
File "BasicSimpleDb.py", line 1, in <module>
import boto
ImportError: No module named boto
```

To fix the "No module named boto" error, follow the steps outlined above
in the section called [Python and boto](#boto).

A complete Python SimpleDB Amazon Script:

``` {.code}
import boto

conn = boto.connect_sdb(aws_access_key_id='XXX',aws_secret_access_key='YYY')
print conn
domains = conn.get_all_domains()
print domains
dom = conn.get_domain('History')
print dom
query = 'select * from History'
rs = dom.select(query)
for j in rs:
print j
```

The output from a run of the above program:

``` {.code}
J:\Src\P282\test>python Test01.py
SDBConnection:sdb.amazonaws.com
[Domain:History, Domain:MyStore]
Domain:History
{u'Category': u'Presidents', u'LastName': u'Washington', u'Politicians': u'Presidents', u'FirstName': u'George'}
{u'Category': u'Presidents', u'LastName': u'Adams', u'FirstName': u'John'}
{u'Category': u'Presidents', u'LastName': u'Jefferson', u'FirstName': u'Thomas'}
{u'Category': u'Presidents', u'LastName': u'Madison', u'FirstName': u'James'}
J:\Src\P282\test>
```

It is, of course, inconvenient to have to always specify your
credentials when you create a script. An alternative strategy is to
create a configuration file for boto that holds your credentials. You
can then run your scripts without including your credentials. For
instance, the above script would look like this:

``` {.code}
import boto

conn = boto.connect_sdb()
print conn
domains = conn.get_all_domains()
print domains
dom = conn.get_domain('History')
print dom
query = 'select * from History'
rs = dom.select(query)
for j in rs:
print j
```

Notice that the call to **connect\_sdb()**now omitts the credentials.

To make a script that does not include credentials work, you need to
create a file that looks like this:

``` {.code}
[Credentials]
aws_access_key_id = XXX
aws_secret_access_key = YYY
```

You should, of course, replace XXX and YYY with your credentials and
secret key. On Windows, I saved the above file as :

``` {.code}
c:\users\charlie\.boto
```

Or in Linux

``` {.code}
/etc/boto
/home/.boto.cfg
```

On windows, but not in Linux you then create an environment variable
called BOTO\_CONFIG that points at the path to your .boto file.

Select:

-   Control Panel\\System and Security\\System
-   Advanced System Settings.

Click the Environment Varaibles button and create a new user variable
called BOTO\_CONFIG and set it equal to the path to your config file, as
shown in Figure 02.

![Setting the BOTO\_CONFIG environment
variable](images/AmazonWebServices03.png)

**Figure 02: Setting the BOTO\_CONFIG environment variable**

##Reading a Boto Config File Manually {#configParser}

When running a CGI script with SimpleDb calls under IIS, you may have
trouble reading your .boto file.  Since we don't want to be sharing our
keys with another when passing around source code, we need some way to
read the keys from a file other than the default method of reading
location of the config file from the environment. Here is code you can
use to read the values from a copy of the .boto file which you have
copied into your cgi-bin folder:

``` {.code}
import cgi
import boto
import ConfigParser
from files.core import SimpleFile

class SimpleDbChords():
    
    def __init__(self):
        config = ConfigParser.RawConfigParser()
        config.read('.boto')
        key = config.get('Credentials', 'aws_access_key_id')
        secretKey = config.get('Credentials', 'aws_secret_access_key')
        self.conn = boto.connect_sdb(key, secretKey)
```

This code uses the ConfigParser class to parse the .boto config file.
The ConfigParser class is designed to read files structured like the
.boto file, so it makes short work of the matter. First we import the
utility class:

import ConfigParser

Then we create an instance of the class, read the .boto file, and
retrieve our key and our secretkey:

``` {.code}
 config = ConfigParser.RawConfigParser()
config.read('.boto')
key = config.get('Credentials', 'aws_access_key_id')
secretKey = config.get('Credentials', 'aws_secret_access_key')
```

Once we have the data we need, we just pass it to the boto connect
method:

``` {.code}
 self.conn = boto.connect_sdb(key, secretKey)
```

At this stage you should be connected to boto and ready to begin your
session in earnest.\

##Giving the boto SimpleDB API a Workout {#workout}

The following class gives you an example of many of the things you can
do with boto and SimpleDB. It is also a useful class which you might use
in your own programs.

``` {.code}
	#!/usr/bin/python

	import boto

	# For use with AWS SimpleDB
	class SimpleDomainWorker():
		
		def __init__(self, domain):
			self.conn = boto.connect_sdb()
			self.domain = domain
			
		def showQuery(self, query):        
			print self.conn
			domains = self.conn.get_all_domains()
			print domains
			dom = self.conn.get_domain(self.domain)
			print dom        
			rs = dom.select(query)        
			for j in rs:    
				print j
		
		def createDomain(self):        
			self.conn.create_domain(self.domain)
			
		def showAllDomains(self):        
			domains = self.conn.get_all_domains()
			for domain in domains:
				print domain        
		  
		# addData('State01')    
		def addData(self, itemName, itemAttrs):        
			dom = self.conn.get_domain(self.domain)
			item_name = itemName        
			dom.put_attributes(item_name, itemAttrs)    
			
		def showDomainData(self):        
			dom = self.conn.get_domain(self.domain)
			domain_meta = self.conn.domain_metadata(dom)
			print domain_meta.item_count
			print domain_meta.domain
			
		# deleteItem('States')
		def deleteItem(self, domain, item):        
			dom = self.conn.get_domain(self.domain)  
			itemToDelete = dom.get_item(item)  
			dom.delete_item(itemToDelete)            
						
		# getItem('Third')                    
		def getItem(self, itemName):        
			dom = self.conn.get_domain(self.domain)       
			print dom.get_item(itemName)
			
		def showItems(self):        
			dom = self.conn.get_domain(self.domain)
			for item in dom:
				print item.name

	sq = SimpleDomainWorker("History")
	#sq.addData('Fifth', {'Category': 'Presidents', 'LastName': 'Monroe', 'FirstName': 'James'})
	sq.showItems()
	sq.showQuery("select * from History")
```

Converting Dictionaries into XML {#dictToXml}
--------------------------------

Though it isn't very pretty, you can always use main force to convert a
dictionary to XML:

``` {.code}
    def startXml(self):            
        xml = "Content-Type: text/xml\n\n"
        xml += "<?xml version='1.0'?>\n"
        xml += '<presidents>\n'
        return xml

    def showQueryXml(self, query):
        dom = self.conn.get_domain(self.domain)
        result = dom.select(query)
        xml = self.startXml()        
        for item in result:
            xml += "\t<president>\n"    
            keys = item.keys()
            keys.sort()           
            for x in keys:                
                xml += '\t\t<' + x + '>' + item[x] + '</' + x + '>\n'
            xml += "\t</president>\n"         
        xml += '</presidents>'
        return xml


sq = SimpleDomainWorker("History")
print sq.showQueryXml("select * from History")
```

The output might look something like this:

``` {.code}
Content-Type: text/xml

<?xml version='1.0'?>
<presidents>
  <president>
    <Category>Presidents</Category>
    <FirstName>George</FirstName>
    <LastName>Washington</LastName>
    <Politicians>Presidents</Politicians>
  </president>
  <president>
    <Category>Presidents</Category>
    <FirstName>John</FirstName>
    <LastName>Adams</LastName>
  </president>
  <president>
    <Category>Presidents</Category>
    <FirstName>Thomas</FirstName>
    <LastName>Jefferson</LastName>
  </president>
</presidents>
```

Create a Unique Id for Use in SimpleDb {#uniqueIds}
--------------------------------------

When inserting rows in simpleDb, you might want a simple mechanism for
creating new item IDs. Try this:

``` {.code}
import uuid

def getUniqueItemId(self):
    uniqueId = uuid.uuid4()
    return uniqueId
```

S3 Scripts {#s3Scripts}
----------

A simple S3 script:

```
	#!/usr/bin/python

	import boto

	class S3Buckets():

		def __init__(self):
			self.bucketName = 's3bucket01.elvenware.com'
			self.bucketFileName = 'test/test01.csv'
			
		def CreateBucketAndFile(self):
			s3 = boto.connect_s3()
			bucket = s3.create_bucket(self.bucketName)
			key = bucket.new_key(self.bucketFileName)
			key.set_contents_from_filename('c:/users/charlie/documents/temp/Presidents.csv')
			key.set_acl('public-read')

		def GetFile(self):
			s3 = boto.connect_s3()
			key = s3.get_bucket(self.bucketName).get_key(self.bucketFileName)
			key.get_contents_to_filename('myfile.csv')
		
	s3Buckets = S3Buckets()
	s3Buckets.CreateBucketAndFile()
	s3Buckets.GetFile()
```

.NET Issues {#net}
-----------

If you are writing code for the .NET platform, there are several
important services for you hosted by Amazon:

-   [AWS Windows and .NET](https://aws.amazon.com/net/)
-   The [AWS Toolkit for Visual
    Studio](http://aws.amazon.com/visualstudio/). You want this download
    as it includes both the SDK and the Vistual Studio tools.
-   [AWS PHP](https://aws.amazon.com/php/)

FreeBase
--------

FreeBase is an open online data repository accessible through an API. It
contains about 20 million topics. It is free up to 100,000 queries per
day.

FreeBase is similar to the Wikipedia but it's data is stored in a
different format. In particular, it has structured data designed to be
accessed through queries. It is designed to be machine readable, while
Wikipedia is designed to be human readable. The DBPedia is also similar
to Freebase, but it focuses solely on Wikipedia data.

Freebase is part of a larger initiative known as the Semantic Web. It
supports querying in all the languages we use, including Python, .NET,
PHP and JavaScript.

FreeBase was created by MetaWeb and since 2012 has been owned by Google
and uses data from many sources including WikiPedia and MusicBrainz.

Developers Page:
[http://wiki.freebase.com/wiki/Developers](http://wiki.freebase.com/wiki/Developers)

Here are the libraries for various programming languages:
[http://wiki.freebase.com/wiki/Libraries](http://wiki.freebase.com/wiki/Libraries)

The DotNet code:
[http://code.google.com/p/freebase-dotnet/](http://code.google.com/p/freebase-dotnet/)

SVN Access: svn checkout
http://freebase-dotnet.googlecode.com/svn/trunk/
freebase-dotnet-read-only

Learn [about SVN](Mercurial.html).

Resource Description Framework (RDF) and the Linked Open Cloud is all
part of the Semantic Web.

Read about RDF:
[http://wiki.freebase.com/wiki/RDF](http://wiki.freebase.com/wiki/RDF)

Example:
[http://rdf.freebase.com/ns/en.blade\_runner](http://rdf.freebase.com/ns/en.blade_runner)

You need an API key:
[https://code.google.com/apis/](https://code.google.com/apis/)

[https://developers.google.com/console/help/\#WhatIsKey](https://developers.google.com/console/help/#WhatIsKey)

Twitter
-------

Along with Web Intents, there are three main Twitter APIs

-   [Web Intents](https://dev.twitter.com/docs/intents)
-   [Rest APIs](https://dev.twitter.com/docs/api)
-   [Search APIs](https://dev.twitter.com/docs/using-search)
-   [Streaming APIs](https://dev.twitter.com/docs/streaming-api)

Get status for charliecalvert:

[http://api.twitter.com/1/statuses/followers.json?screen\_name=charliecalvert](http://api.twitter.com/1/statuses/followers.json?screen_name=charliecalvert)

[http://api.twitter.com/1/statuses/followers.json?screen\_name=calvertbc](http://api.twitter.com/1/statuses/followers.json?screen_name=charliecalvert)

Get it in xml:

[http://api.twitter.com/1/statuses/followers.xml?screen\_name=calvertbc](http://api.twitter.com/1/statuses/followers.xml?screen_name=calvertbc)

## Rate Limits

-   Unathenticated requests: 150 requests per hour for each requesting IP
-   Oauth requests: 350 per hour per each authorized token

<form method="post">
<input name="buttonFail" onclick="twitterFollowersFail()" type="button" value="Twitter Fail">
<input name="buttonTwitterLoad" onclick="twitterFollowersLoad()" type="button" value="Twitter Followers Show XML">
<input name="buttonTwitterAjax" onclick="twitterFollowersAjax()" type="button" value="Twitter Followers Ajax">
</form>

<ul id="items">	</ul>
<p id="tweetXmlFollowers">Waiting....</p>
<p id="error">Errors here....</p>
<p id="bar">bar</p>

bar

## SSH Keys

The RSA key fingerprint is standard. The first time you connect to a particular machine, a key identifying that machine is created. This key is used to ensure that no one is spoofing you, and creating a fake instance of your machine like a fake web site, like a phishing site.  You should get the prompt about the RSA key only once per client machine: the first time you connect from a client machine to a remote machine. Each time you move to a new client machine, and connect to that same remote machine, you will be prompted again, but only once per client machine. So all is good there.

The permission denied, however, does not look right to me. If the private key you loaded in memory with ssh-add matches the public key in the authorized_keys file for the remote machine, then you have proved that you are the owner of the private key that matches the public key, and you will be let in. When you downloaded the key pair from AWS the first time you created your VM, they automatically put the public key in the .ssh/authorized_keys file and handed you the private key. That private key proves that you are the owner of that remote AWS  virtual machine. Don't give it to anyone else unless you trust them. If you get permission denied, that usually means that for one reason the keys are not matching up. That might mean that you have the wrong key, that the key has not be properly loaded with ssh-add, or that the authorized keys file is corrupt or not properly initialized.

## Permission Denied Public Key

When you get a "denied (public key)" message, this usually means that you:

    Do not have the private key for your remote instance loaded with ssh-add
    You have a key loaded but it is not the right key
    The authorized_keys file on the remote machine does not have the keys in it that you expect or is corrupted

By far the most common problem is just that you forgot to ssh-add <YOUR-KEY>. Remember:

    Unless you put the call in your .bashrc or some similar file, you will have to call ssh-add each time you start a new bash (terminal) session.
    If you have associated the key-par Prog282-2014 with your remote instance, then load the associated Prog282-2014.pem file with ssh-add:

ssh-add Prog282-2014

You really only need on key pair for all your AWS instances. If you want, you can use that key pair to load your instance the first time, then id_rsa.pub to the remote machines ~/.ssh/authorized_keys file. From then on, you can just load id_rsa and forget about Prog282-2014.pem. In other words, you just need this one combination:

    A private key on client machine
    The associated public key in the authorized_keys file of the remote machine. This is true even for GitHub and BitBucket. Once you have the private key loaded with ssh-add on your client machine, then you just need to assure that GitHub, BitBucket, and your AWS instances have your public key. For remote linux boxes, put the public key in authorized_keys. For services like GitHub and BitBucket, find the place in their menu system where they ask you to enter your public key.

Really, its simple:

    You have a private key. Don't share it.
    The servers you want to reach have the matching public key.

