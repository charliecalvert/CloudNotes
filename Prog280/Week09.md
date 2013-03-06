Working with Scripts
--------------------

-   Get the scripts from JsObjects

-   \\JsObjects\\Utilities\\SetupLinuxBox

Git
---

-   <http://www.elvenware.com/charlie/development/cloud/Git.html>

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
