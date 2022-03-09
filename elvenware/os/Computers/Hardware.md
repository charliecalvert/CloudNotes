---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/Computers/Hardware.md
relativePath: elvenware/os/Computers/Hardware.md
title: Hardware
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

## Hardware - Introduction

Mostly focused on CPU and ChipSets.

## SSD

Consider using a USB to Sata3 cable.

Look into migration software. For instance, Samsung has data migration software for their hard drives. It should allow you to copy an old hard drive on to your SSD drive so you can boot up immediately into the system you had before.

## Cards

When I first started using mobile devices, I did not understand SD cards and
SIM cards. Here is a primer:

## SD Cards {#sdCards}

* SD Card and MicroSD Card: These are storage devices, like a thumb drive.
* SIM Card: This activates you phone. It associates you identity with you phone.

SIM is an acronym for Subscriber Identity Manager. It manages your identity
so that your phone knows that it belongs to you. It knows what phone number
to use, who to charge things to, what kind of data plan you have, etc.

On phones you usually need to open up the back to access both the SIM card
and any SD card slots that might be available. On a tablet, these items are
usually found around the edges of your device. Not all phones or tablets
support SD cards. Since they allow you to expand the available memory on your
device, they can be very useful.

You have probably heard the expression "locked phone." Here is the deal. In
theory, you can take your SIM card and put it in any phone you want, and
start making calls that will be charged to your account. So, for instance,
if you battery runs out, you can just take your friends phone, pop in your
SIM card, and start making calls. Unfortunately, there are two problems:

* There is more than one size of SIM card. That means you need to use a phone
that fits your SIM card. This can be a problem, but since there are only three
different sized cards, and most new phones use the same size card, this is not
usually a big problem.
* The second problem is that companies "lock" their phones so you can't put in
SIM card that uses a different carrier. For instance, you can't use an AT&T
SIM card in a Verizon phone, and vice-versa.

In theory, if you buy a phone a full price and not through a vendor plan, then
it should not be locked. However, that is not always the case.

Don't confuse unlocking a phone with jailbreaking or rooting a phone. You
unlock a phone because you want to use SIM cards from another carrier. You
root or jailbreak your phone because you want to be administrator, because
you want to have root access, to your phone. As a rule, Apple folks call
this jailbreaking, while Android folks call it rooting.

It happens, however, that if you root or jailbreak your phone, then often
you can also unlock it. This is one reason why the terms are sometimes
confused.

###SD Card Facts

SD Cards first appeared in 1999, and the Mini and Micro size cards emerged
over the following ten years. There are adapters that you can buy to make
Mini and Micro cards fit into regular SD slots.

There are three types of SD cards

* SD - Secure Digital. Up to 2GB
* SDHC SD High Capacity go up 32 GB. This is the most common at the time of this writing.
* SDXC Extended go up higher. In theory as high as 2 TB, but 256 GB is biggest I've heard of.
* SDIO (Secure Digital Input Output) Not sure what this is, but it is not common.

There are various classes of SD cards

* Class 2, 4, 6, 10 and UHS.

The basic idea is that higher numbers represent higher speeds. However,
I have heard of cases where SD 10 card from one brand is slower than an
SD 6 card from another brand. SANDISK and Kingston are usually considered
to be good brands.


Intel
-----

Intel has several major lines of processors, including:

- Atom (Silverpoint, Bay Trail)
- Intel Core for consumer processers
- Xeon for servers and workstations

Intel Naming Conventions
------------------------

- <http://www.intel.com/content/www/us/en/processors/processor-numbers.html>

Consider this name:

	Intel Core i7-4600-M-Q

In this example:

- Intel Core is Brand
- i7 is the brand modifier
- 4 is the generation. 4th Gen = Haswell

These are the generations

- 2nd Gen: Sandybridge
- 3rd Gen: Ivybridge
- 4th Gen: Haswell

Tick and Tock
-------------

Intel alternates it's releases between ticks and tocks.

- Tock: A new architecture
- Tick: A smaller die

Transistors
-----------

The transistor was first patented in 1925, but was made more practical in 1947 by Bardeen,
Brattain and Shockley, who worked at Bell Labs. They won the Nobel
Prize for this in 1956. Chrysler and Philco put this to use in a
car radio, shortly afterward they began to appear in computers.

A transistor can use a small signal at one of its terminals to
control a much larger signal at another terminal. In particular, we
are interested in its ability to turn the larger signal on and off.
It can also modulate the signal, allowing more or less current to
get through, like adjusting the faucet at a sink.  But turning the
current entirely on and off gives us the 0 and 1s that we need to
for the boolean operations that lie at the heart of computing.

There are many different kinds of transitors, but we are not going to
discuss them here. The key point is that transistors can be used to
simulate boolean transactions.

Details on [wikipedia](http://en.wikipedia.org/wiki/Transistor).

Integrated Circuit
------------------

When you put multiple transistors in a single place, you have an
integrated circuit. For instance, a modern processor might have 3
billion or more transitors.

The words chip, die, processor and integrated circuit are all more
or less synonmous.

If you put a bunch of electronic circuits on a single piece of
silicon, then you have an integrated circuit. There are several
kinds of electronic circuits. However, we are interested in digital
circuits. We use digital electronic circuits to perform boolean
operations. Typically, one voltage is used to represent a 1, and
another voltage is used to represent 0. This forms the basis for
the binary transactions that make computers possible.

In a modern Intel Haswell processor, there are

Moore's Law
-----------

The number of transistors on a chip doubles once every two years.
This is an approximation, but it gives you a general sense of what
is happening.

Microprocessor
--------------

A CPU on a single integrated circuit. These binary, programmable
devices process instructions and produce output based on these
instructions. For instance, you might pass a microprocessor the data
2 and 3, and an instruction to add these numbers together. The processor
will perform the operation and return 5 as a result.

Microcontroller
---------------

A a typical microcontroller combines both a processor and memory. The
point is that it contains both a microprocessor, and some peripherals
such as RAM. One of the first microcontrollers, produced in 1974, contained
a microprocessor, RAM and a clock.

These days, 8 bit microcontrollers go for about a nickle, and 32 bit
microcontrollers for about a dollar. It is said that about 55% of all
CPUs sold are 8 bit microcontrollers. For instance, 4 billion 8 bit
CPUs were sold in 2006. A car is likely to have some 30 microcontrollers
in it.

SOC
---

System on a Chip refers to the idea of building an entire computer
on a single chip. A typical SOC will contain:

- A microprocessor or microcontroler
- Memory such as ROM or RAM
- USB, Firewall and Ethernet support
- Power management
- Etc

For a good example, look at the features in the [SnapDragon 800](https://developer.qualcomm.com/discover/chipsets-and-modems/snapdragon).

Northbridge vs Southbridge
---------------------------

Northbridge handles communications between the CPU, RAM and Video cards. These
generally require high speed transactions.

Southbridge handles slower things like PCI, USB, IDE, and BIOS.

These used to be two completely different chips, but recently the northbridge has
been integrated into the CPU itself and the Southbridge has been replaced by
something called a Platform Controller Hub.


The modern Intel Core Processors are as follows, from oldest to newest:


- Nehalem (Tock)
- Westmere (Tick)
- Sandy Bridge (Tock, 2nd Generation, 2005, 80623, 32 nanometer, LGA 1155, LGA 2011, Socket G2)
- Ivy Bridge (Tick, 3rd Generation, LGA 1155, Socket G2)
- 4th Gen - Haswell (Tock). This release is about power consumption (battery life) as
much as it is about improved speed. Haswell is meant to work well in Ultrabooks
and mobile devices where power consumption is a big concern.
- Broadwell (Tick, expected in 2014)
- Skylake (Tock, expected in ...)
- CannonLake (Tick, expected in ...)

And here are the Nehalen processors from least to most powerful:

- Core i3
- Core i5
- Core i7
- Core i7 Extreme

So a Core i5-4XXX or Core i7-4XXX processor is Haswell based

Some processors have letters in their names, for instance i7-4770K

- K = Enthusiast processor with overclocking
- S = Low power or Power Saving
- T = Thin chasis, such as an all in one.
- H or M = Mobile CPUs
- U or Y = Ultrabook

The Intel Core Processors have two generations:

- 2nd Generation LGA2011 Socket
- 4th Generation LGA1150 Socket uses Intel 8 Series Z Chipset Intel

Mobile CPUs
---

We are entering the age of ARM v8 64 bit computing. The iPhone 5S will probably
be the first to use it.

###Intel Atom Bay Trail SoC

SoC stands for System on a Chip

[IntelPage](http://ark.intel.com/products/codename/55844/Bay-Trail)

There are Bay Trail mobile processors clocked at 2.3 GHz.

###nvidia Tegra

There are several Tegra processors:

* NVidia Tegra 2
* NVidia Tegra 3
* NVidia Tegra 4

The Tegra 4 Family includes:

* A Quad Core Arm Processor at up to 1.9 GHZ. (2.3 GHZ for Tegra 4i)
* A GPU with up to 72 cusom cores.
* Processors the enhance photography and LTE modem.

###Qualcomm SnapDragon

The [Snapdragon 800](https://developer.qualcomm.com/discover/chipsets-and-modems/snapdragon)
is popular at the time of this writing.

Chipsets
--------



Motherboards
------------



My Machines
-----------

Desktop - AMD Phenom 2 X6 1090T 5720
Laptop - i7-2630QM 				5583
