---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/TypesOfApplications.md
relativePath: elvenware/development/cloud/TypesOfApplications.md
title: TypesOfApplications
debug: aec has both but checking ELF code
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

Understanding the Cloud

There are three primary types of Cloud Services:

* **SaaS** - Software as a Service

* **SaaS** - Software as a Service

* **IaaS** - Infrastructure as a Service

Here are three brief explanations of each of these technologies:

* **Software as a Service** is a generic term for an application that runs in the cloud. The classic example of this type of service is Google Docs.

* **Platform as a Service** is a generic term for fully configured and maintained development services found in the cloud, such as a web server, a database, or an application framework of some kind.

* **Infrastructure as a Service** is an instance of a computer running in the cloud. Is an OS running in a Virtual Machine. It is just like running an OS in VMWare or VirtualBox, only this time you the VM is in the cloud. The EC2 Amazon Web Service is a classic example of Infrastructure as a Service.

Whenever you are running an application, such as EverNote, it is fairly obvious that you are dealing with an SaaS. It can, however, be more confusing to understand the difference between Platform as a Server and Infrastructure as a Server.

You can run a database or web server on PaaS. You can also run a database or web server on top of IaaS. They are both databases, but in the latter case you are responsible for configuring the database.

An IaaS is just an OS in the cloud. Since you need to configure a database on an OS running on a physical machine, then you also need to configure it on an OS running in the cloud.

With a PaaS such as Amazon S3, you get a preconfigured, and fully maintained web server, but you are not completely in control of it. It is, in a sense, easier to use than an Apache server that you set up yourself, but it is not as flexible.

Take a moment to consider the difference between a cloud application like Microsoft SkyDrive or Google Docs, and a platform like Apache on Linux:

*  Apache is a web server and can serve up HTML files and run scripts. As such, it is enormously powerful and flexible. On the other hand, it is not designed to allow you to edit a Word document.

* SkyDrive will let you edit a Word document, but it does not serve up HTML in the traditional sense.

* A service like S3 lies in the middle between these extremes. It is a preconfigured web server, but not as flexible as Apache on Linux. For instance, it is not designed to serve up dynamic content generated from a database.

The lines between these things get fuzzy at times, but the fundamental differences between a tool like EC2 (IaaS) , a tool like S3 (PaaS) and SkyDrive (SaaS) should be clear:

* IaaS: The vendor gives you an OS running on Virtual Machine, and leaves it up to you to configure it. You can install what you want, but you need to know how to set it up and maintain it.

* PaaS: The vendor gives you a pre-configured and fully maintained set of development tools running in the cloud. If a web server is involved, it is pre-installed and fully configured. You can't install new features in a PaaS, it is a set of preconfigured tools. With Apache, you can install new tools, or configure them to run a particular way. In the process, you might break something. On a PaaS, you can't install anything new, or change most of the options, but it is fully maintained and ready to use out of the box.

* SaaS: This is software running in the cloud. It is an end-user tool, not a development tool. A word processor or a blogging platform would be examples of SaaS.

As a general rule, IaaS is the most powerful, and costs the most. PaaS is easier to use, cost less, but is not usually as powerful or flexible. It is, however, still a development platform. SaaS is frequently free, or very low cost, but it lacks the flexibility of PaaS, since it is not a development platform. As I said above, the lines may become a bit blurred at times, but this is the basic overview.



If you grew up with Windows, or major products such as Microsoft Office, you are probably used to thinking in terms of versions. You expect a product to increment its version number once every one to two years, and you expect major changes to happen at that time. This is not the way it works in the cloud. Most, or at any rate many, cloud applications are under continuous development in an agile development cycle. This means that new features might appear at any time. This can be confusing.

We have grown accustomed to installing an application, examining its features, and finding them either adequate or inadequate for our needs. If you are using an cloud application such as Google Docs, however, you might examine it in June and find that it is good, but not quite good enough because it is missing one or two key features that you need. The odd thing about cloud applications is that the feature you want might show up next week, next month, six months from now, two years from now, or never. The same is true for bugs. You might hit a bug in a product. All your training tells you that the bug is a serious issue, in large part because you will have to wait a year or two for the next release before you will see it fixed. but in the cloud, a bug can be fixed much more readily. Sometimes bugs are even fixed incrementally. For instance, you might find that a document does not display correctly. You come back in two weeks and find that its display is improved, but still not perfect. Come back in six months, and the problem may be almost entirely gone. In a year's time, there is no longer so much as a trace.

But how do we know when a bug will be fixed or when a new feature will appear? Sometimes a vendor gives us detailed information about their development plans, but even when they do, we frequently don't have time to follow such matters. Overall, the ability of a team to iterate frequently and to continue publish new releases is a good thing, but it comes at a price.

## Types of Cloud Applications

* Web
* Technical Computing
* Devices
* Social Gaming
* Social Apps

Images: Blob Storage

* Data: Table Storage
* Data: SQL Azure

Scaling: App Fabric Cache

Authentication: ACS (Do this last so you don't have to fuss with it during development.

## Key Issues

### Identity

* Create your own
* Open ID

### Stateless

Begin with an inventory

## Entry point:

* Let's take this web application and put it into the cloud.
* Some kinds of SaaS, a simple app
* IT applications are siloed, but in the cloud applications can talk to one another
* IT was about taking care of the technology
    * Now we are concerned with managing technology
    * In the nineties, we had people thinking that PCs would replace IT
    * But in the end, companies still need experts, but a different kind of expert.
* We need to be organized not around the technology, but around the services we provide

## Strategy

Don't react to problems, first create a plan and then implement it. Virtualization and the cloud won't solve a lot of problems.

* Inventory your services.
* Find places where you can succeed
* Start small
* Examine how things we run on the cloud versus run on a virtual machine or private cloud.
* Ultimately the cloud is just a computer in a new place

Free

Free Invoicing for Freelancers:  [BillingBoss.com](http://www.billingboss.com/) is a free online invoicing tool designed for small business owners and freelancers to create, send and

http://www.foss-cloud.org/en/index.html
