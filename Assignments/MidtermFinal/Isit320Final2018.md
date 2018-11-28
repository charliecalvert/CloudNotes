## Overview

You have two major goals:

- To complete the [systemd Service Complete][sdsc] assignment
- To complete the [EC2 Provision Repo][ec2pr] assignment

As subset of the second goal, you should write your own script that will clown your repository to the remote instance.

The Service Complete assignment is self-explanatory, but the EC2 Provision Repo needs some comment, which is provided below.

## Provision Repository

The EC2 Provision Repo assignment asked you to create a series of buttons and make sure that each one had an endpoint on the server. The goal for the final is to make the sure the endpoints actually perform the expected operations. This will involve using calls that we have covered multiple times in this class. In particular, you will need to:

- Copy script files from the local machine to the EC2 instance
- Run the scripts on the remote machine

At the time of this writing, this process will not go smoothly under even the best of circumstances. For instance, I will ask you to copy the JsObjects SLB script GetStarted to the server and then run it. Among other things, this script runs the following commands in a non-interactive manner:

```
sudo apt update
sudo apt upgrade
sudo apt dist-upgrade
sudo apt autoremove
```

All this takes considerable time, and there is no good way at this stage to get feedback to the user. Once the GetStarted script is complete, it then reboots the system, which again takes time. By watching the command prompt, you can see the progress, so you, as a technical person, are not in the dark about what is happening. But clearly this is a less than optimal situation. Nevertheless, it does work.

For me, the whole process takes something like five minutes to complete. It is pretty nice to be able to complete provision an EC2 instance in five minutes without having to do anything more than select a few buttons. I want to improve the app, but at least this is a start.

[ec2pr]: https://www.elvenware.com/teach/assignments/Aws/Ec2ProvisionRepo.html
[sdsc]: https://www.elvenware.com/teach/assignments/Npm/SystemdServiceComplete.html
