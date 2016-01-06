## Overview

Configure bash.

## Set up prompt

Open **~/.bashrc** in geany or nano.

When you see the tilda character (~), that means the home directory. So, ~/.bashrc can be shorthand for **/home/bcuser/.bashrc**. Files that begin with a period are "hidden" files. When using a GUI tool to browse for a hidden files, you can toggle "hidden files view" on and off with **Crtl-H**. At the command prompt, you can view hidden files by typing **ls -a**.

Search through **.bashrc** to about line 46 where you should find this line:

```bash
#force_color_prompt=yes
```

Remove the "comment symbol" from the line:

```bash
force_color_prompt=yes
```

Search down a bit further for code that defines your prompt. Change it to look like this:

```bash
if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\n\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\n\$ '
fi
```

The key change was to add **\n** near the end of the two lines that begin **PS1=**.

Now that you have turned on the color prompt, you need to notify the system of the change. You can do this by starting or restarting the bash shell (terminal). Or, if you are already at the terminal, then run this command:

```bash
source ~/.bashrc
```

You will only have to run the command one time. 

When you are done, the prompt in your bash shell (terminal) should now be in color, and show the system and path on line, and the $ symbol on a second line. By starting the prompt near the left of the screen, you can avoid the situation where your commands start to wrap around to a new line when you are typing long lines of text.

## Turn it in

Take a screen shot of the color prompt and turn it in.


