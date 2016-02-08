## Overview

The goals of the **No Laptop Monday** are two fold:

- To be sure all students are familiar with Git. If you are using your machine at school, then most students will have to push and pull from Git when working at home. We can more easily learn Git if we use it regularly to maintain multiple versions of our repositories.
- To make sure all students, especially those in my programming courses, have a solid platform on which they can work.

## Memory

I have been setting the base memory for our VM's too low. Instead of setting to 2048 MB, let's try setting it to 4096 MB (4 GB) or even 6144 (6 GB).

**NOTE**: *I'm talking about the settings for our school machine, which has 32 GB total memory. Using up 4 GB for our VM is not excessive on such a machine. On your laptop and home machine, however, 2 GB might be the right number, depending on how much memory is available on your machine.*

To see the memory:

- Close your VM
- In VirtualBox, select **Settings | System | Motherboard | Base Memory**. Set it to 4096.
- Restart your VM, open the bash shell, type **free -h**. You should see about 3.9 GB available.

Throughout the day, you may want to monitor your memory usage with any of the following commands:

- free -h
- watch -n 5 free -h
- htop (May need to install with: sudo apt-get install htop)

If the amount of free memory starts to drift much below 500 MB, consider increasing the amount of memory you allocate for your VM. The numbers shown here, for instance, are simply too low:

```bash
$ free -h
             total       used       free  
Mem:          3.9G       3.8G        47M  
-/+ buffers/cache:       2.3G       1.6G
Swap:         2.0G       816K       2.0G
```

Given the above, I upped my base memory for Pristine Lubuntu to 6GB and ended up with these numbers, which are more comfortable:

```bash
$ free -h
             total       used       free
Mem:          5.8G       3.9G       2.0G
-/+ buffers/cache:       2.3G       3.5G
Swap:         2.0G         0B       2.0G
```

## Maintain

You should be familiar with all of the resources listed below, and should use them as needed to help you maintain your system and to check that it is working properly.

**NOTE**: *A number of the documents listed are tailored to help students get up and running on EC2. This may not, at first, make them seem a good match for this assignment. However, both our EC2 instances and Pristine Lubuntu are based on recent Ubuntu releases, and from the bash shell, they look almost identical.*

- [EC2 Checklist][ec2cl]
- [EC2 Get Started][ec2gs]
- [EC2 Provision][ec2p]
- [Configure Linux][configure-linux]
- [Linux Files][linux-files]
- [Git New Repo][gnrepo]


[ec2cl]: http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2Checklist.html
[ec2gs]: http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2GetStarted.html
[ec2p]: http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2Provision.html
[gnrepo]: http://www.ccalvert.net/books/CloudNotes/Assignments/GitNewRepo.html
[linux-files]: http://www.elvenware.com/charlie/os/linux/LinuxFiles.html
[configure-linux]: http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html

## Turn it in

Run the following commands in Pristine Lubuntu, then take a screen shot. Attach (upload) the screenshot directly to the assignment:

```
cat /proc/cpuinfo | grep "model name"
npm --version
node --version
free -h
```
