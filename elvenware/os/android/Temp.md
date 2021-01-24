Toggle Menu

Charlie Calvert on Elvenware
============================

Writing Code and Prose on Computers
-----------------------------------

Menu
----

Core Code
---------

-   [Strongly Typed](../../development/index.html)
-   [Web & Scripts](../../development/web/index.html)
-   [Cloud](../../development/cloud/index.shtml)

OS and Tools
------------

-   [OS](../index.html)
-   [Database](../../development/database/index.html)
-   [My Writing](../../books/index.html)

Art
---

-   [Poems & Photos](../../Art/index.html)
-   [Book Reviews](../../books/reading/index.html)
-   [Spiritual](../../spirit/index.html)

Links
-----

-   [My Links](../../links.html)
-   [Falafel](http://www.falafel.com/)
-   [Sourceforge](http://sourceforge.net/projects/elvenware/)

![Elvenware](../../images/elvenwarelogo.png)

Mobile Devices
==============

### Index

[Introduction](#intro)

[What Mobile Devices do Well](#whatToDo)

[Types of Mobile Users](#users)

[Beginner's Mind](#mind)

[Emersion](#emersion)

[Side by Side Strategy](#strategy)

[Tablet vs. Phone](#tabletphone)

[Android Basics](#androidBasics)

[Using an Android](#useAndroid)

-   [Notifications](#notifications)
-   [Keyboard](#keyboard)
-   [Voice Commands](#voice)

[AirDroid](#airDroid)

[The Google Account](#googleAccount)

[Cellular vs Wi-Fi](#cellular)

[Maps and GPS](#maps)

[Navigation](#navigation)

[Android Connect](#connect)

[Google Docs](#googleDocs)

[Google+](#google+)

[Microsoft Live](#msLive)

[Handling Mail](#mail)

Some Apps

-   [Markets](#markets)
-   [eBook](#ebook)
-   [Google Voice and SMS](#voice)
-   [Netflix](#netflix)
-   [SpringPad and Evernote](#notes)
-   [My Tracker](#tracker)
-   [Wi-Fi Finder](#wifiFinder)
-   [Pandora](#pandora)
-   [Learning Man](#learningMan)

[The IPhone and IPod](#apple)

Introduction to Devices {#intro}
-----------------------

We cannot think about mobile devices without also thinking about the
cloud. Mobile devices are inextricably tied to the cloud. Without the
cloud mobile devices would not be such a vital component of modern life,
and without mobile devices the cloud would not have such a broad reach
across all strata of our society.

Mobile devices are lighter, more portable, and smaller than PCs or
laptops. The size and weight of mobile devices is important, but their
real significance lies in their relationship to the cloud. A PC or
laptop was designed to work with data that resided on it's hard drive.
Mobile devices are designed to work with data that resides in the cloud.

Mobile devices are finally forcing us to divorce our data from our hard
drives. They are setting us free by finally compelling us to move our
data from our hard drives and out into the cloud.

I often hear people looking for a lot of USB, SD, VGA or other ports
when they buy a digital device. I believe this is evidence of a
fundamental misunderstanding of what we do with mobile devices. You
don't need a device with lots of ports. Your data lives in the cloud,
not on your device. You access it primarily over HTTP, and if you need
more, you don't want a USB port, you want good SSH or SFTP tools.

A mobile device such as a phone, mp3 player or tablet is a small
computer. It is as powerful, and in some ways many times more powerful,
than the PCs we bought 10, or even 5 years ago. But for many of us, the
most important thing about a mobile device is not its size, but it
connection to the cloud. We have the same type of connectivity to the
cloud from a PC, but the nature of the dependency is different. Mobile
devices force us into the cloud. At first, this feels like a burden.
Then we come to understand that it is gateway into a much better form of
computing.

### Cloud Basics

There are three primary ways to store data in the cloud:

-   SaaS: Software as a Service. This means applications that run in the
    cloud. Think Google Docs.
-   PaaS: Platform as a Service: APIs, databases, compilers, running the
    cloud
-   IaaS: Infrastructure as a Service: A virtual machine running an OS

No matter what kind of data you have, you can store it on one or all of
these tools. Whatever is on your hardrive, you can migrate it to the
cloud and store it there.

If you can place all your data in an application, then you are done. You
strategy for moving to the cloud is simple: just take your documents,
spreadsheets, presentations, MP3s, pictures and videos and store in the
applications such as Google Docs or the Amazon Cloud. If you have
somewhat more complex data, then you need to explore Amazon Web Services
or similar tools.

In either case, but especially if you want to explore PaaS or IaaS, then
it helps to understand the tools that tie the network together. This
means coming to terms with the following protocols or services:

-   TCP/IP
-   HTTP
-   SSH

These tools are important because they are platform neutral. We no
longer run on just Windows, or just a Mac, or just on Linux. Our data is
in the cloud, and we want to access it from Windows PCs, from Macs, from
Android (Linux) devices, and from Apple laptops. These protocols work on
all these devices. We also need a single, open source set of tools that
work on all these platforms. There are several choices to pick from, but
my favorites are:

-   HTML5, CSS and JavaScript on the client
-   Apache or IIS, Python and MySQL or MongoDB on the server.

To sum up: If you want to be good at using mobile devices you really
have two choices:

-   Master a set of cloud applications that will allow you to store and
    edit your data in the cloud, and access it from a wide range of
    devices running various operating systems on various different types
    of hardware.
-   Store more complex data in the cloud by mastering a set of related
    tools and protocols that include HTTP, HTML, and Python. Finally,
    you must learn everything you can about creating and managing
    virtual machines.

What to Do With a Mobile Device {#whatToDo}
-------------------------------

Almost anything you can do on a PC you can also do on a Mobile Device
and vice versa. However, there are some areas where PCs excel, and where
mobile devices excel.

In general, it is still useful to assert that:

-   PCs are good at content generation
-   While mobile devices are primarily about content consumption

Let's take a moment to consider what we mean when we say that these
statements are generalizations. You certainly can add GPS to your office
desktop. It's usefulness, however, would be limited to all but the most
paranoid. "Better check my location again! Phew! Here I am, still right
where I was when I came into work this morning!" An Android phone, on
the other hand, can use GPS to give you constantly updated directions to
a store or to a friend's house. You can attach a camera to your office
PC and use it to take still pictures. There can be a time when such a
feature is useful, however most people would not trade it for the camera
built into the back of their phone. A web CAM on a PC would likely be,
in many cases, just as useful as a CAM on a phone. And finally, most
people are still reluctant to trade the Word Processors found on their
phones and tablet for the Word Processor on their PC. This doesn't mean
that they can't use a tablet to compose a document, but most people
probably still find it easier to perform that task on a PC, though there
is some room for debate on this issue. Most people would probably find a
calendar useful on both a PC and a mobile device, but they would
probably be unwilling to give up the calendar on their phone, while they
could, in a pinch, give up the calendar on their PC, though it would
mostly only happen with some reluctance on the owner's part. Finally, we
can tweet equally well from a PC or a phone, but there is no denying
that Tweeting is an activity designed for and made popular by users of
mobile devices.

Now that I've taken some time to qualify my generalization about PC's
being best at content generation, and mobile devices best at content
consumption, why don't we move on to list some of the things that mobile
devices do particularly well. Mobile devices are good at:

1.  Navigation, Maps and GPS
2.  Calendars
3.  Taking photographs and videos
4.  Playing music and watching videos
5.  Recording audio
6.  Reading email and writing short emails
7.  Texting, social media such as Facebook, as well as video and voice
    chat
8.  Reading eBooks, magazines and news
9.  Gaming
10. Taking notes, making lists
11. View documents and slide shows. Tablets are good for viewing spread
    sheets

### Types of Users {#users}

The purpose of this documents is to help people who are already adept at
using computer to learn what small devices do best, and how these
devices can best be used. It is surprisingly difficult for adults who
are good at using computers to understand how to use the full potential
of a small device like a phone, tablet, or MP3 player. The journey from
neophyte to expert is long, but not necessarily complex, particularly if
you are able to begin by taking a few simple steps.

There are as many different approaches to using small devices as their
are users. However, there are three types of users that I focus on:

-   Those who grew up with phones and MP3 players.
-   Developers and techies who loved all things digital, or who wanted
    to develop applications for small devices.
-   Older computer users who are adopting small devices after becoming
    proficient on PCs and laptops.

Think for a moment about the huge difference between these two different
types of users. When we are 10, 12, 15 or even 21, we are at the height
of our intellectual powers. We may not be as wise as we will be later,
but we learn quickly, and we are often blessed with curiosity and
passion. Young people often had full access to a computer for the first
time when they were given a phone or music player. Everything came
together for them at one time:

1.  Their PC use was supervised by parents. No one supervised them when
    they used a phone.
2.  They often had to share a PC with other family members, or they had
    to use the PC in the house, where they felt constrained.
3.  The phone or music players was completely theirs, no one supervised
    them when they used it, and they could use it anywhere they could
    find a wireless connection.

As a result, young people pour a good deal of their not inconsiderable
passion and intelligence into learning how to use their device, and
finding ways to stretch its capacity. We sometimes think the developers
of Twitter or Facebook were geniuses for seeing the potential of those
media. Yet in many ways, the real geniuses were the young users who kept
pushing the limits of the software, and who kept demanding new features
that fulfilled their needs, their dreams and their imagination.

While the young adopted devices quickly and passionately, older computer
users found themselves in a very different position:

-   They had full access to powerful computers that already met most of
    their needs. Why should they learn to write email, browse the web,
    or read documents on a phone? They could already do those things on
    a computer.
-   They were familiar with computers, and found small devices clunky
    and awkward in comparison. In some ways, this was because the small
    screens, lack of ports, and input devices were indeed clunky
    compared to PCs, but this problem was significantly exacerbated by
    the fact that older users had no incentive to learn how to use small
    devices.
-   Finally, it was just plain awkward to be outclassed by young people
    who often used these small devices for purposes that seemed trivial
    or time wasting to an adult.

### Beginners Mind {#mind}

I'll make the case for small devices in just a moment. But for now,
let's posit that small devices are worth using, and that their are
certain impediments which experienced PC users must overcome before they
can become comfortable with a small devices.

The first step may sound obvious, yet it is both the most important and
the most difficult for many people. We have to come to understand that
it will requite serious effort, and real study, to master a small device
like an iPhone, Android tablet or Windows Phone. Perhaps it might help
if we begin to by just dropping the word phone altogether. Most people
don't use cell phones for making phone calls. They use them for
communication, but not for making phone calls. In fact, phone calls are
not even second, or in many cases even third in line for the most common
activity for most users of Androids and cell phones. Therefore, it is
best if we stop calling them phones, and start thinking of them as
mobile devices, or better yet, mobile computers.

Anyone over 30 years of age probably once owned a computer that is not
nearly as powerful as a modern cell phone. A modern mobile device such
as Android Phone is not just technically a computer, it is actually a
very powerful computer with a sophisticated screen, plenty of memory,
and extraordinary capacity to access the internet in general, and the
cloud in particular.

The truth is that a mobile device is something new in the world. A
mobile device is a new an evolutionary development that is fundamentally
different from computer in much the same sense that an airplane was
fundamentally different from a car or train. Airplanes did not replace
cars, and mobile devices will not replace PCs. Nevertheless, thinking
that one who is good at using a PC is therefore automatically good at
using a mobile is fundamental error, just as it is a fundamental error
to assume that because one can drive a car one can pilot an airplane or
a be a conductor on a train.

The best attitude for an experienced PC user to take to the mobile world
is what the Zen teachers call a beginner's mind. Assume you know
nothing. Assume most of what you know is more like an impediment than an
asset. Yes, you are an expert at using Microsoft Outlook to handle a
Microsoft Exchange Account. That does not mean, however, that you know
how to handle email on a phone. Sure you an expert at using Chrome to
browse the web, that does not mean, however, that you know how to browse
the web with a mobile device. Sure, you an expert with Microsoft Word.
Those skills, however, may be as much of a hindrance as an advantage
when it comes to using mobile devices to create documents.

When we first used computers, many of us spent hours simply playing with
them. Over the years, we have changed that attitude, and we now try to
remain focused when we open our computers. There is always email to e
read, articles to be written, code to be debugged, assignments to be
read or graded. My suggestion is that for a time we drop that directed
approach, and simply set time aside to play with our mobile devices. Can
we master the phone

Dig into the tools you find. You don't know what Google or Amazon have
to offer until you go look.

Immersion {#emersion}
---------

After adopting the correct mindset, the next step is to attempt complete
emersion. Try some of the following:

-   Commit to handling all your email for a day, a week, or even a month
    on a phone. If necessary, sit next to your PC so that you can turn
    to it when you are stuck, but as much as possible, use the phone for
    all your email.
-   Attempt to write a significant document on a mobile device such as a
    tablet.
-   Adopt a technology such as Twitter that is designed to be used on a
    mobile device, and use that technology for thirty minutes a day for
    some set period of time, such as one week.
-   Move your calendar or contacts onto your phone, and then access them
    only from your mobile device.
-   Read a book on your phone. Not on a tablet, and not on kindle, but
    on a phone.
-   Find some activity like tracking exercise that mobile devices do
    particularly well and get good at using the tool for that purpose.

The point is to immerse yourself in mobile technologies. Do you like to
take photographs? Well then, set a weekend aside and learn how you can
use your mobile device as a camera, and how to use the cloud to publish
your results.

The Side by Side Strategy {#strategy}
-------------------------

I believe that it is not cheating to use your phone and your PC at the
same time. At first, you may find that you did something on your phone
but your not sure that it really worked. If you performed the activity
in the cloud, and you should be doing everything in the cloud, then you
can simply open the cloud application you used on your device on your PC
and check to make sure it worked. I often find that once I confirm that
it is working, then I'm able to go back to my phone, and confirm the
same thing on my phone.

Tablet vs. Phone {#tabletphone}
----------------

Which is better: a tablet or a phone? This is question that can obsess
someone new to mobile devices. There are many arguments in favor of each
platform:

-   It is easier to input data on tablet than on a phone.
-   Some kinds of documents, like technical books that contain code,
    look better on a tablet because lines are not wrapped in such
    awkward places.
-   A movie looks better on a tablet.
-   A standard book is easier to read on a tablet - for the first
    fifteen minutes. But if you want to read in bed for an hour or two,
    you might be surprised to find that you prefer a phone.
-   You can take a phone with you wherever you go. A tablet is big, and
    bulky. Unless you have a backpack, you won't want to carry it with
    you on a hike. And even if you do have a backpack, it is awkward to
    pull a tablet out just to take a photograph.
-   And of course most tablets aren't designed to be used as phones,
    though they can work very nicely as Skype clients.

Ultimately, the sad truth is that there are good reasons to own both a
tablet and a phone. They each have their uses.

But come one Charlie, you must have an opinion. Which do you really
prefer? If you had to choose, which would you take with you and which
leave behind? The answer, perhaps not surprisingly, is not easy to frame
properly:

-   There are times when a phone is much easier to carry and use than a
    tablet. There just things you can do on a phone that you really need
    to do that are hard to do with a tablet. In particular, you can
    carry the phone almost anywhere, while there are some places where a
    tablet is really awkward to use.
-   On the other hand, I really love my Android tablet in a way that I
    don't love my phone. My phone is convenient, but there are times
    when I have a real romance with my tablet. Sometimes I can get real
    work done on a tablet, or really enjoy myself browsing or playing
    games on a tablet, It can, at times, feel like exactly the right
    device. while a phone is almost always a compromise between
    convenience and necessity.

Android Basics {#androidBasics}
--------------

[Android](http://www.android.com/about/) is an open source operating
developed by Google ands used primarily on phones and tablets.

Android code names are alphabetical, and they are named after desserts,
beginning with c for cupcake. G is for Gingerbread, H is for honeycomb,
i is for ice cream. Get it. So you don't really need to know the names,
just the alphabet.\
Honeycomb was the first Android release designed for tablets. There were
tablets released with pre-Honeycomb versions of Android, but it was not
pretty. It was strictly for mature audiences, it was not something that
you would want to give to a child or anyone with sensitive nature.

Using an Android {#useAndroid}
----------------

System bar, action bar, app tray, home screen,

**System Bar** - At the bottom

-   Always present.
-   Navigation on the left. Includes home, recent apps, and back button
-   Notifications on the right

oBack, home, recent apps, screenshot, sometimes a menu.

**Action Bar** - At the top

-   Optional
-   Menu, search

### My Machines {#notifications}

[Samsung Galaxy Tab
10.1](http://www.samsung.com/us/microsite/galaxytab/) -
[Specs](http://www.samsung.com/us/mobile/galaxy-tab/GT-P7510MAYXAB)

-   WI-FI Only
-   Dual Core Tegra 2 Processor
-   Android 3.1, Honeycomb
-   1280 X 800, 10.1 inches
-   1 lb., 3.9 Ounces
-   Cameras: **Rear**: 3 MP; **Front**: 2 MP

[Samsung
Infuse](http://www.samsung.com/us/mobile/cell-phones/SGH-I997ZKAATT?)

-   -   1.2 GHz processor, Samsung C110
-   Android 2.2, Froyo
-   Super AMOLED Plus capacitive touchscreen
-   480 x 800 pixels, 4.5 inches
-   13.6 ounces
-   Cameras: **Rear**: 8 MP **Front**: 1.3 MP

### Notifications

Tap the clock in the notification panel to see the Control Panel and
Access Settings

-   Updates
-   Alerts
-   Battery
-   Email
-   Time
-   Signal Strength

### Settings

Whether you are using an Apple, Android or Windows device, you are going
to have to use the Settings Panel quite often. It is more than worth
your while to spend time with it.

### Holographic View

If you select the plus in the upper right hand corner of the home
screen, you will get to a view that allows you to configure the contents
found on the five pages of the home screen. Along the top you can see a
"3D" view of the five screens of the home page. The bottom contains a
view of the items you can use to populate the screens:

-   Widgets
-   Apps
-   Wallpapers
-   More (Like Apps, but it might give you a bookmark into an
    application, or a particular view of your Gmail folder.)

[![Holographic
View](../../development/cloud/images/Holographic01Small.png)](../../development/cloud/images/Holographic01.jpg)

Widgets provides views into an application. There are many great widgets
you can install that can make your Android easier to use. Two facts to
remember:

-   They tend to train power
-   This feature is not available on iPhone
-   Widgets frequently don't give you anything you can't find on an
    application, they just make it easier to track an activity.

AirDroid {#airDroid}
--------

Helps you manage your Android from your desktop.

[![Airdroid seen in my desktop
browser](../../development/cloud/images/AirDroid01Small.png)](../../development/cloud/images/AirDroid01.png)

### Keyboard

Even simple things like the key board can be trickier than you think.
Try typing in a web address in a browser. Notice the www key. Notice the
com key. This can become net, gov or org key if you long press. Notice
the emoticon key and the setup key. The point is that virtual keyboard
is flexible. Are they perhaps even better than real keyboards, at least
in some cases?\
Explore setup for the keyboard as there may be more options than you
think, including voice and predictive ting. Try long pressing the e key
or the u key or the emotion key. Or\
Swipe.

Add words to the user dictionary when predictive typing is on.

Copy and paste is long press. voice commands.

The technological elite. There are those who know and those who don't.

The rate of change: more technology more quickly.

Fling and networks.

The play store: books, movies, music and apps.

The big thing is to practice. Use it all the time, use it for
everything.

Android is used in various devices: phones, book readers, tablets, TVs,
music players. But Android is not for use on Netbooks or standard
computers. It is easy to put on such devices, but it doesn't run well
there. Instead try Chrome OS, or just stick with Ubuntu or Windows.

hvga half vga - 320 \* 240\
800 \* 600 svga, super vga.

resistive displays are more resistant and do not require that conduct.
capacitive is more responsive, though this can be bad in a device such
as a reader where you don't want to turn a page by accident.

### Voice Commands {#voice}

-   send text to (person)
-   listen to (music)
-   set alarm
-   navigate to (place)
-   call (person or business)
-   send email to (person)
-   map of (city or town)
-   go to (website)
-   note to self (message): This sends an email to me with some message
    that I dictated. You can also send messages to friends or other
    contacts.

### Navigation

You can navigate using Google Navigate.

### The Google Account {#googleAccount}

Now we get down to brass tacks! This is, in my opinion, an essential and
valuable part of your Android device. It is also how Google gets their
hooks into you. If you are paranoid it will make you very unhappy. The
rest of us just see it as a small but necessary price to pay for a great
benefit.

Handling Mail {#mail}
-------------

If you have been using a computer for years, and if you are used to a
particular mail program, you have a number of hurtles to overcome before
you can begin using your phone as a mail client. Here are some thoughts
and ideas:

-   You can probably get Exchange, Gmail, Hotmail or any other mail
    service on your phone. If you think you can't, you are probably just
    missing something or using the wrong tools.
-   As a rule, you use the Email app for Exchange or POP accounts, and
    you use the Gmail app for Gmail. There are custom applications for
    other common mail carriers, such as Hotmail.

You can handle all your email communications over the phone. At first I
wondered how people did this. Do some people have smaller fingers than
me? Have they got some kind of mind meld with their phones? It turns out
that it is just a question of desire. You just need to be willing to get
good at using mail applications on a phone. You probably once put a lot
of time into learning how to use a PC. You need to do the same thing
with your phone. You may, in fact, have to be prepared to go through a
significant learning process even to perform "simple" functions such as
using a phone. It's all a matter of attitude.

One exercise that I have found helpful is to sit down in front of a
computer with my phone in my hand. Open up my mail client on both the PC
and the Phone. Try to handle all my mail on the phone. When I get stuck
or confused, I go to the PC client and try to sort out what is
happening. Perhaps I will find some kind of mail that I just can't
process on my phone - at least not yet. In that case, can I mark it for
later processing on the PC? If I have 100 messages, can I get through 93
of them on the phone, and handle the remaining seven later on the PC?

Cellular vs. Wi-Fi. {#cellular}
-------------------

You have undoubtedly heard a good deal of talk about 3G and 4G networks.
These are cellular networks that allow you to send data to and from a
mobile device. You can turn off your cellular network and still have
phone coverage. You need your cellular network only if:

-   You need to transfer data such as email or files
-   You are not on a Wi-Fi network.

People get very concerned about the amount of data that their contract
will allow them to transfer each month. Personally, I take the smallest
amount my company will allow. I use cellular networks to transfer data
only in rare circumstances, and when I do, I'm very careful about what I
send back and forth. In particular, I using it almost entirely for maps
and navigation.

Does this mean that I don't use data on my mobile devices? No, not at
all. I'm sure I transfer a respectpable, even unusually large, amount of
data over my phone. It is just that I do it only when I am connected to
a wireless network. In particular, I transfer most of my data either
over my home network, or over the Bellevue College Network. I have a
cellular contract for my phone, but my tablet works only over Wi-Fi. I'm
content with this arrangement. I need to connect my phone to the network
to transfer data from time to time, usually because I want navigation
tools or to get email. My tablet, on the other hand, is not a tool I
often use when on the go. I am content to wait until I am near a hotspot
before I connect it to the network.

CDMA and GSM are two competing technologies for delivering cellular
content. There is no particular technical advantage to using one or the
other, but GSM is more commonly used around the world. As a result, if
your phone uses GSM, then you will be more easily able to use it in
foreighn countries. There are always trade offs, but America is one of
the few countries that has this problem, because it is one of the few
places where the government has not been actively involved in setting
standards. It is also one of the few places in the industrialized world
where connectivity is spotty, and where prices are often prohibitively
high.

4G standards are starting to be rolled out. This fourth generation of
cellular communications is defined not by a particular technology, but
by the speed at which the technology operates. There are currently two
technologies, LTE and WiMAX, both of which are significantly faster than
3G technologies, but which do not yet reach 4G speeds of 1 GB per second
(Gbit/s). WiMAX 2 and LTE-Advanced should operate at this speed and
should be available by 2013.

Frankly, I don't spend a lot of time thinking about these things. Fast
Wi-Fi networks meet most of my needs, and even relatively slow 3G
networks usually allow me to get the data I need when I am on the road
and really need to pull down a map, a web page, or some email.
Nevertheless, I'm sure I will adjust quickly enough when faster transfer
rates become available -- so long as our cellular cariiers adjust rates
appropriately to handle the speeds they offer. I have seen, for
instance, cellular networks charge \$20 a MB for transfers in "foreign"
countries such as Canada or Mexico. Since some phones automatically
upload pictures as you take them, a \$10 trip over the border could
quickly lead to the loss of your house if you start shooting some
pictures or video while strolling for a few minutes on the wrong side of
the imaginary line drawn between Washington State and British Columbia!

-   LTE: Peak download of 100 Mbit/s.
-   WiMAX: Peak download of 128 Mbit/s

The upload speads for these technologies are generally one half of the
download speed.

Maps and GPS {#maps}
------------

GPS is not the same thing as 3G, 4G or WiFi. For instance, my phone will
give me accurate GPS readings even when I have data transfer (WiFi and
3G) turned off. However, you are probably used to having maps download
when you look at GPS data. Nevertheless, if you know what to do with raw
GPS (Lat/Long) data, or if you just want to record a GPS track, you
shouldn't need to turn on either WiFi or Cellular data. If you turn on
Airplane mode, however, then you will probably stop getting GPS data.

Power and Screen
----------------

You can adjust the font or wallpaper:

-   **Settings | Screen | Font/Wallpaper**

You can adjust how long the computer stays open before the screen goes
black.

-   **Settings | Screen | Timeout**

Android Connect {#connect}
---------------

After plugging in your Android phone, Open up the Windows Devices and
Prints Page. You should see your phone.

In the Windows Explorer, you should also see a two drives. But at first
you can't use them. On the phone, pull down the notifications window,
that shade you pull from the top. In their you can turn on the devices,
and things like transferring files and syncing with Windows Media Player
will start to work.

Google Docs {#googleDocs}
-----------

Provides good services for reading documents, but rudimentary services
for editing documents. The feature set is always changing, but write now
tables aren't supported in text documents, and creating documents is not
supported. You can edit text once the document is created.

Google+ {#google+}
-------

Multiple accounts only supported in version 2.0. It is not always easy
to tell that an application has been updated, yet you usually do want to
update. Get the most recent features.

DropBox
-------

Microsoft Live {#msLive}
--------------

I can see only one of the folders shared with me. This is a real feature
loss.

Apps
----

Applications are the heart and soul of Android and all mobile platforms.
You can tap the App Launcher icon in the top right corner of the home
screen to bring up the **Apps Tray**. You can then swipe left or right
to page through a list of all the applications on your Android. Use the
Play Store or a similar tool to add new applications, and go to the
Application section of the Settings tool to uninstall applications. You
can use the Storage section of the Settings tool to see if you are
running out of space in which to install applications.

[![The Apps
Tray](../../development/cloud/images/AppsTray01Small.png)](../../development/cloud/images/AppsTray01.jpg)

**Figure 0X: The Apps Tray provides you with multiple screens from which
you can select the applications you want to use on your application.**

### Markets: Play Store and Amazon {#market}

Just as the Apple Store is a hub of life on an iPhone, the Play Store is
a central feature of life on the Android.

[![The Google Play Store is a major hub on the Amazon
platform](/charlie/development/cloud/images/PlayStore01Small.png)]()

**Figure 0x:The Google Play Store is a major hub on the Amazon
platform**

There is, however, serious competition from the Amazon App Store. If you
consume music or applications at all, you should probably use both
applications.

### Netflix

### andFTP

SFTP and syncing of folders.

[http://www.lysesoft.com/products/andftp/](http://www.lysesoft.com/products/andftp/)

### eBook

Reading the Linux Journal in eBook

### Google Voice and SMS {#voice0}

You can send SMS messages to someone's phone with Google Voice.

### SpringPad and Evernote {#notes}

Both of these products are designed to help you share and store notes,
lists and various forms of documents. Unlike Windows Live or Google
Docs, it is not meant to be an office suite. Why then, would we use this
obviously less powerful product, rather than a full blown office suite?
The answer, of course, is that we don't want to compose spreadsheets or
word processing documents on a phone. Instead, we want to create smaller
documents, and we want to work with a light weight tool designed for a
device.

I can't see the names of the documents shared with me. Only part of the
name is missing, and often the missing part is the crucial part. They
are just not giving me enough view of the data.

Can't edit other's documents.

### My Tracker {#tracker}

[https://maps.google.com/maps/ms?msa=0&msid=206691422652895451660.0004bdabe58a090565068](https://maps.google.com/maps/ms?msa=0&msid=206691422652895451660.0004bdabe58a090565068)

Music with Pandora, Amazon Cloud Player and

### Wi-Fi Finder {#wifiFinder}

### Learning Man {#learningMan}

The IPod into an IPhone {#apple}
-----------------------

Use Skype

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../../development/index.html) |
[Delphi](../../development/delphi/index.html) |
[CSharp](../../development/csharp/index.html) | [My
Books](../../books/index.html)
