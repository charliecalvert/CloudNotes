## Ubuntu Servers with MongoDb Install {#mongodb-ubuntu}

These are OVA files that you install into VirtualBox by choosing **File | Import Appliance**. This is the server version of Ubuntu, so there is only the command line. No Interface.

- MongoDb on Ubuntu No Password: [http://bit.ly/xfs-mongo-open](http://bit.ly/xfs-mongo-open)
- MongoDb on Ubuntu with XFS: [http://bit.ly/xfs-mongo-secure](http://bit.ly/xfs-mongo-secure)
- Android X86 6.0.3: [http://bit.ly/x86ova](http://bit.ly/x86ova)

After downloading, move them to some well known place on your hard drive and then double click to install. **Don't forget to select _Reinitialize MAC address of all network cards_ when installing**. If you forget to do this, then close the VM (sudo shutdown -h now) and then go to the VirtualBox Settings, on the **Network** page, choose **Advanced** and twiddle the blue doo-hickey to reset the Mac address.

If you get an error similar to **Could not start the machine because of eno1**, then just push the **Change Network Settings** button and then select the **Ok** button. You need not select anything as VirtualBox automatically detects what needs to be done. Or, more specifically, VirtualBox will automatically detect the proper **name** for the network adapter. The issue here is that I have one network adapter at home, and there is another one on the school machines. This causes a conflict. There is probably a setting I could pick so that you do not see this error, but I always forget to look for it.

## Two OVA Files

I have given you two different Ubuntu Server Virtual Machines.

- One uses a generic Linux file system and has MongoDb security turned off.
  - Use this machine for hacking and testing on your home system
- The users the XPS file system and has MongoDb security turned on.
  - Use this machine in public places and when you want to learn about security

## Updates

I have turned on automatic security updates for these machines. Nevertheless, you should attempt to [update the machine][ubdate] yourself. If you get an error about the machine being busy, then just go on to other steps and come back and try again after a few minutes.

[ubdate]: http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html#update-the-machine


## SSH

Get your IP address:

```
ip addr
```

For instance, if you pipe the result to **grep inet** it yields something like:

```
$ ip addr | grep inet
inet 127.0.0.1/8 scope host lo
inet6 ::1/128 scope host
inet 192.168.2.5/24 brd 192.168.2.255 scope global eno1
inet6 fe80::eb4a:4cf8:28e2:54c1/64 scope link
```

Or match the word **inet** exactly so **inet6** is excluded:

```
$ ip addr | grep -w inet
inet 127.0.0.1/8 scope host lo
inet 192.168.2.5/24 brd 192.168.2.255 scope global eno1
```

Go to Pristine Lubuntu and put your public key on the server and log in:

```
ssh-add id_rsa
ssh-copy-id -i id_rsa bcuser@192.168.2.5
ssh bcuser@192.168.2.5
```

## On Older Systems

**ifconfig** no longer ships with Ubuntu. But in the old days, we used **ifconfig** to find the IP address of the server. In the example shown below, the IP address is on the third line: **inet 192.168.2.16**.

```
$ ifconfig
eno1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet **192.168.2.16**  netmask 255.255.255.0  broadcast 192.168.2.255
        inet6 fe80::eb4a:4cf8:28e2:54c1  prefixlen 64  scopeid 0x20<link>
        ether f8:32:e4:9d:22:39  txqueuelen 1000  (Ethernet)
        RX packets 1734287  bytes 753270259 (753.2 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2474671  bytes 2934814397 (2.9 GB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        device interrupt 20  memory 0xdfd00000-dfd20000  

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 13332  bytes 16656358 (16.6 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 13332  bytes 16656358 (16.6 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

At home, the IP address of your server will probably not change very often, if at all. But at school, you cannot count on your server having the same IP address each time you boot it up. It might have the same address, but then again it might not. As a result, at school, it might be simplest to log into your server from Pristine Lubuntu like this, given the IP address above:

```
ssh bcuser@192.168.2.16
```

For instance:

```
$ ssh bcuser@192.168.2.16
bcuser@192.168.2.16's password:
Welcome to Ubuntu 16.04.2 LTS (GNU/Linux 4.4.0-78-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

0 packages can be updated.
0 updates are security updates.


*** System restart required ***
Last login: Wed Jun  7 08:08:31 2017
Agent pid 16416
```

**NOTE**: _In the above, I get the message that I need to restart the server because updates have been installed. This means I should type **sudo shutdown -r now**, or some other command you prefer that has the same effect. You will then be thrown after the system while it reboots. After a suitable pause, you will probably want to sign in again._

But at home, the IP address of your server is not likely to change. As a result, the best way to sign in is to use SSH. Details on how to set up the server so you can easily sign in with SSH are found here: How to use [ssh-copy-id to copy your public key][ssh-copy-id]. After you do this you should be able to sign in very quickly and without entering a password:

```
$ ssh bcuser@192.168.2.16
Welcome to Ubuntu 16.04.2 LTS (GNU/Linux 4.4.0-78-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

0 packages can be updated.
0 updates are security updates.
Last login: Wed Jun  7 08:46:37 2017 from 192.168.2.3
Agent pid 1142
```

[ssh-copy-id]: http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html#ssh-copy-id

## Who can Query

We may need to edit **/etc/mongod.conf** in order to let other machines query the database:

```
sudo nano /etc/mongod.conf
```

Inside **nano** use **ctrl-o** plus **enter** to save. And then **ctrl-x** to exit.

By default, only request from the local machine are allowed:

```
# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1
```

If you want to let everyone else in, then add the IP 0.0.0.0:

```
# network interfaces
net:
  port: 27017
  bindIp: [127.0.0.1, 0.0.0.0]
```

Or you can you let some subset of machines in:

```
# network interfaces
net:
  port: 27017
  bindIp: [127.0.0.1, 192.186.2.*]
```

After doing this, restart **mongod**:

```
sudo systemctl restart mongod
sudo systemctl status mongod
```

Press q to quit the status view.

To ensure that MongoDB starts each time the system reboots do this:

```
sudo systemctl enable mongod
```

## XPS Sign in Admin

If you are on the server that uses authentication, you can, and should, sign in as admin:

```
mongo -u admin -p foobar --authenticationDatabase "admin"
```

IN this example we:

- Sign in as **admin**
- Switch to the test database
- Show the users

```
mongo -u admin -p foobar --authenticationDatabase "admin"
MongoDB shell version v3.4.4
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.4
> use test;
switched to db test
> show users;
{
	"_id" : "test.charlie",
	"user" : "charlie",
	"db" : "test",
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "test"
		},
		{
			"role" : "dbAdmin",
			"db" : "test"
		}
	]
}
```

Clearly we need permissions to do this. Now try to show the tables in the **test** database:

```
show tables;
2017-06-07T09:42:07.874-0700 E QUERY    [thread1] Error: listCollections failed: {
 "ok" : 0,
 "errmsg" : "not authorized on test to execute command { listCollections: 1.0, filter: {} }",
 "code" : 13,
 "codeName" : "Unauthorized"
} :
_getErrorWithCode@src/mongo/shell/utils.js:25:13
DB.prototype._getCollectionInfosCommand@src/mongo/shell/db.js:805:1
DB.prototype.getCollectionInfos@src/mongo/shell/db.js:817:19
DB.prototype.getCollectionNames@src/mongo/shell/db.js:828:16
shellHelper.show@src/mongo/shell/utils.js:762:9
shellHelper@src/mongo/shell/utils.js:659:15
@(shellhelp2):1:1
```

We get no love. Why not? Let's look at our permissions:

- Switch to admin database
- Show users

```
> use admin
switched to db admin
> show users;
{
	"_id" : "admin.admin",
	"user" : "admin",
	"db" : "admin",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	]
}
```

We are the admin of the **admin** database, but not of **test**.

## XPS Sign in Charlie

Now let's try logging in as charlie:

```
$ mongo -u charlie -p foobar
MongoDB shell version v3.4.4
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.4
> use test
switched to db test
> show tables;
politicians
```

All is good. Now try to see the users

```
> show users;
2017-06-07T09:47:00.569-0700 E QUERY    [thread1] Error: not authorized on test to execute command { usersInfo: 1.0 } :
_getErrorWithCode@src/mongo/shell/utils.js:25:13
DB.prototype.getUsers@src/mongo/shell/db.js:1537:1
shellHelper.show@src/mongo/shell/utils.js:752:9
shellHelper@src/mongo/shell/utils.js:659:15
@(shellhelp2):1:1
```

It's all about what permissions you have.

## Connect From CongressServer

Connect to your XPS server do something like this, where I first log in and then show the available tables:

```
$ mongo 192.168.2.18:27017/test -u charlie -p foobar
MongoDB shell version: 3.2.11
connecting to: 192.168.2.18:27017/test
> show tables;
politicians
```

Let's cover connecting to mlab. The URL you use will probably look at little like this:

```
mongo ds012345.mlab.com:12345/mydatabase -u foo -p foobar
```

## Notes on installation

Update:

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
sudo shutdown -r now
```

It's already installed, but in case you want to know how. First get JsObjects and initialize it:

```
cd ~/
mkdir Git
cd Git
git clone https://github.com/charliecalvert/JsObjects.git
cd ~/Git/JsObjects/Utilities/SetupLinuxBox
./UbuntuAndCloud9Setup
```

Then choose **b: Run basic setup**

And finally:

```
source ~/.bashrc
```

Now install MongoDb:

```
jou
cd InstallScripts/
.\InstallMongoDb
sudo service mongod restart
sudo service mongod status
sudo geany /etc/mongod.conf
sudo service mongod restart
```

## Authentication

If you want, optionally set up Mongo for authentication:

```
mongo
```

Then do something like this:

```
use admin
db.createUser(
  {
    user: "charlie",
    pwd: "foobar",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
exit
```

Now test it:

```
mongo --port 27017 -u "charlie" -p "foobar" --authenticationDatabase "admin"
mongo -u "charlie" -p "foobar" --authenticationDatabase "admin"
mongo -u admin -p foobar --authenticationDatabase "admin"
mongo -u charlie -p foobar
```

Then update again. Not because we need to, but because all we ever do is update. Wake up in the morning. Sweat beads on your face. Your breathing is fast and shallow. "Oh my gosh! When did I last update? I better go do it right now!"

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
sudo shutdown -r now
```

## Turn it in

Submit a screenshot showing that you can log into the server. Type something like this:

```
$ ssh bcuser@168.156.47.35    
bcuser@168.156.47.35's password:
Welcome to Ubuntu 16.04.2 LTS (GNU/Linux 4.4.0-79-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

0 packages can be updated.
0 updates are security updates.


Last login: Mon Jun 12 12:58:08 2017 from 168.156.47.60
Agent pid 1770
bcuser@mongo-xfs:~$
```

But of course I want to see a screenshot, not just pasted text.

And if you can connect to the database server, submit a screenshot that looks like this:

```
The app is running at:
[1]
[1]   http://localhost:3000/
[1]
[1] Note that the development build is not optimized.
[1] To create a production build, use npm run build.
[1]
[0] AllData route invoked.
[0] Using Simple
[0] Connecting with simple.
[0] tried to connect
[0] mongodb://168.156.47.32:27017/test   <=== SHOW THIS ===<
[0] Calling getAllData
[0] About to find politicians.
[0] Opened connection to mongo
```

The line I highlight shows that you are connecting to a an IP address other than mlab. It shows that you are connecting to our server, or at least hints at that.

Here again is the line I want to see in a screenshot:

```
[0] mongodb://168.156.47.32:27017/test   <=== SHOW THIS ===<
```
