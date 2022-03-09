---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/design/virtualization.md
relativePath: elvenware/development/design/virtualization.md
title: Virtualization
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

[Hardware Virtualization](http://en.wikipedia.org/wiki/X86_virtualization)

### My Notes on Creating Virtual Appliances with VirtualBox

OVA files conform to a standard put together by the Distributed Management Task Force (DMTF) and is a variation of the more commonly cited Open Virtualization Format (OVF). OVF consists of multiple files, while an OVA file wraps them all in a single package, in particular, they use the TAR format, which is a bit like a zip file.

The format is designed to specify a single format that can be used by multiple virtual machines. Apparently it does use the VMWare VMDK format, but that is in fact an open format with a public specification. In an ideal world, OVA files could be used by VirtualBox, VMware, XEN, the Microsoft HyperVisor, etc. If you look at section 1.13 of the help for VirtualBox, you will find that they back off making such claims, at least for now. That is, however, the goal.

Evidently either the VMDK format or the OVA format or both, end up compressing files, as the resulting OVA file is smaller than the VDI file we start with.

Note that VirtualBox supports VDKM, VDI, and VHD files. VHD files are part of the Microsoft system virtual machines and can be mounted as a stand alone drive in Windows.

## From a Red Hat Video (It Process Institute)

Kurt Milne and Erich Morisse (Red Hat) [emorisse@redhat.com](mailto:emorisse@redhat.com), [Kurt.milne@itpi.org](mailto:Kurt.milne@itpi.org) Twitter: @KurtMilne

*   [http://www.redhat.com/cloud/build](http://www.redhat.com/cloud/build)
*   [http://www.redhat.com/cloudtour](http://www.redhat.com/cloudtour)
*   [https://engage.redhat.com/forms/idc-cloud](https://engage.redhat.com/forms/idc-cloud)

We want to build cloud services, not just systems. Our goal is automate and improve IT solutions.

*   Bottom Up (IT View)
    *   Virtualize
    *   Resource Pools
    *   Automated Provision
    *   Self-Service
*   Top Down (Business View)
    *   Business objects
    *   Desired Benefits
    *   Constraints
    *   Cloud Goals

He recommends starting with business objectives and working down to the IT area, but the other guy likes the idea of working from both ends at once.

Physical virtual private cloud plublic cloud

*   Obvious Factors to Care About;
    *   Service Quality
    *   Scalability
    *   Cost
    *   Security and Compliances
*   Not so Obvjous
    *   Avoid lock in
    *   Life cycle phase
    *   Dependencies
    *   Ecosystem - what are the cloud services that are plugged into their solution without having to worry about integration

You do some planning first, but then you have to start doing some exploration.

Make sure you don't over do it. Plan to succeed. Don't take on too much, and don't lock yourself in.

#### Proof of Concept (POC)

Build a Lighthouse application, is the proof of concept to prove that things actually work. Is the cloud real?

Put together a test and dev environment. Build a lamp stack, or what have you.

Hardware is often not utilized. We use 20 Percent from a machine, but if you virtualize, then people are really using the full 100% of a server.

*   Business sees great agility, scalability and availability
*   IT sees greater efficiency, utilization, automation and standardization

Evaluate and then move to Proof of Concept

Build on existing solutions.
