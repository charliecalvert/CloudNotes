---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/DomainNamesEc2.md
relativePath: elvenware/development/cloud/DomainNamesEc2.md
title: DomainNamesEc2
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:20:59 AM
fileNameMarkdown: DomainNamesEc2.md
fileNameHTML: DomainNamesEc2.html
---

<!-- toc -->
<!-- tocstop -->

## Domain Names on EC2 {#domain-ec2}

Go to Godaddy and manage your domain. On the **DNS Zone File Page**
set the A record to your elastic IP.

- <http://stackoverflow.com/a/17569106/253576>
## Domain Names on GitHub IO {#domain-github}


Create a CNAME document in the root of your repository. Mine looks like this:

    www.ccalvert.net
    
That's the entire contents of the file, with the text flush left
    
On GitHub, go to setings. Look for the section on your GitHub pages.    

That's the total contents of the file.

Go to your GoDaddy account. 

Go to the domain page.

Choose to manage your domain.

In the DNS zone file page, set the CNAME alias for www to:

    username@github.io

