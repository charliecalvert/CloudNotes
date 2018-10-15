## One

Be sure that everything is up to date, both Windows and Lubuntu.

Don't ever leave Lubuntu running when you close the laptop. This causes the machine to sleep, and sometimes VirtualBox or Windows or both do not do a perfect job of putting a VM to sleep. So shut down Lubuntu and then close the laptop lid to put the machine to sleep. Or, to be even saver, don't ever put the machine to sleep, but instead shut down both Lubuntu and Windows. But that sounds like overkill to me. Just shut down Lubuntu before putting the machine to sleep.

## Two

There is some chance that it is the GUI that is frozen, and not your instance itself. If the instance freezes, try **Right Ctrl + F1**. This make the GUI disappear and the command prompt take its place. Log in. Try the **killwebstorm**, **killchrome** and **killchromium** aliases from **~/.bash_aliases** in the General section. Go back to the Gui with **Right Ctrl + F7** and see if things are better. Practice the technique of getting to the command line while it is working so you can see how the system should work.

## Three

As Brett suggests, use the Virtual Box snap shot feature frequently to keep track of times when your VM is in good shape. Push a lot, so you don't lose work.

And finally, if all else fails, and this is a bad enough problem, do your work on Cloud 9 instead of in Pristine Lubuntu.

## Guest Additions

Make sure the [Guest Additions][ga] are up to date as well as your copy of VirtualBox.

[ga]: https://www.elvenware.com/charlie/os/linux/VirtualBox.html#guest
