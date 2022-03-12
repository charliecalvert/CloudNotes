---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/Network-Config-Tips-5.md
relativePath: elvenware/os/linux/Network-Config-Tips-5.md
title: Network-Config-Tips-5
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

[Next](Network-Config-Tips-6.html)
[Previous](Network-Config-Tips-4.html)
[Contents](Network-Config-Tips.html#toc5)

* * * * *

5. Devices
----------

`/etc/sysconfig/network-scripts/ifcfg-*`

For each interface, there is a corresponding file in
`/etc/sysconfig/network-scripts`. The file is named `ifcfg-DEV`, where
*DEV* is the name of the network device, such as `eth0`, `ppp0`, or
`eth0:1`. You can bring an interface up or down by running the following
commands as root from `/etc/sysconfig/network-scripts`:

> `ifup ifcfg-DEVifdown ifcfg-DEV `

Alternately this can also be done with the following commands as root
from anywhere on the system:

> `ifup DEV `

For the first ethernet device on the system the command would look like:

> `     `
>
>             ifup eth0

**DEVICE**
:   The network device name you would give to `ifconfig`, e.g., `eth0`,
    `ppp0`, etc. Also works for aliases, e.g., `eth0:0`.

**IPADDR**
:   IP address to be assigned to this interface.

**NETMASK**
:   Netmask for this interface.

**NETWORK**
:   Address for the network attached to this interface.

**BROADCAST**
:   Broadcast address for this interface.

**ONBOOT (y/n)**
:   Whether or not the interface should be enabled at boot time.

**ISPCMCIA (y/n)**
:   Whether or not this interface is a PCMCIA device.

**BOOTPROTO**
:   One of the following values:

    **`bootp`**
    :   Use BOOTP to configure this interface.

    **`dhcp`**
    :   Use DHCP to configure this interface.

    **`none`**
    :   Don't use a boot protocol to configure this interface.

* * * * *

[Next](Network-Config-Tips-6.html)
[Previous](Network-Config-Tips-4.html)
[Contents](Network-Config-Tips.html#toc5)
