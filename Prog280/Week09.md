## Prog 280 Week 09

-  [Internet Deck](http://bit.ly/Xk4H5t)
-  [Filezilla](http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#filezilla)
-  [SSH](http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#networks-ssh-sftp-and-putty)
-  [Putty](http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#connecting-to-an-ssh-server-with-putty)
-  [Git](http://www.elvenware.com/charlie/development/cloud/Git.html)
-  [VNC Servers](http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#vnc)
-  Scripts

Meld is a directory compare utility. Install meld:

  - sudo apt-get install meld
  
# Scripts

Get the scripts from JsObjects

-  \\JsObjects\\Utilities\\SetupLinuxBox



SSH Remote Host ID has Changed 
-------------------------------

If you are on the MAC, you may hit an error that says WARNING REMOTE HOST
IDENTIFICATION HAS CHANGED!

To fix that, you need to remove the old ID for your instance from the
KNOWN_HOSTS file. Here is how to do that:

ssh-keygen -R \<YOUR ELASTIC IP\>

For instance;

ssh-keygen -R 23.23.170.11

\$ ssh-keygen -R {server.name.com}  
\$ ssh-keygen -R {ssh.server.ip.address}  
\$ ssh-keygen -R server.example.com
