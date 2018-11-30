## Overview

Pease see [this announcment][new-final] which covers some of the changes to the final discussed near the end of class on Wednesday.

You have three major goals:

- To complete the [systemd Service Complete][sdsc] assignment
- To complete the [EC2 Provision Repo][ec2pr] assignment
- Get some application running on AWS and send me a link to it.
  - I'll give more thought as to which app to install and get back to you.

As subset of the second goal, you should write your own script that will clown your repository to the remote instance.

The Service Complete assignment is self-explanatory, but the EC2 Provision Repo needs some comment, which is provided below.

## Getting Started

I don't see why we can't do our work in the existing aws-provision directory. I would however, like you to:

- Create a final branch and do your work in it.
- As you start: **elf-tagger "starting final" "aws-provision"**

My tag looks like this:

```
v1.1.24  starting final for aws-provision on branch final with tag v1.1.24.
```

## Provision Repository

The EC2 Provision Repo assignment asked you to create a series of buttons and make sure that each one had an endpoint on the server. The goal for the final is to make the sure the endpoints actually perform the expected operations. This will involve using calls that we have covered multiple times in this class. In particular, you will need to:

- Copy script files from the local machine to the EC2 instance
- Run the scripts on the remote machine
- Use the AWS api to perform a few tasks such as:
  - Create the instance
  - Link the Elastic IP to the instance

Be sure that the code in **App.js** is refactored into an appropriate set of React components.

Create or maintain at least ten unit tests at least three of which should use **supertest**.

## Bumps in the Road

At the time of this writing, the process of running even a correctly implemented **aws-provision** application will not go smoothly even under even the best of circumstances. For instance, the application should copy the JsObjects SLB script **GetStarted** to the server and then run it. Among other things, this script runs the following commands in a non-interactive manner:

```
sudo apt update
sudo apt upgrade
sudo apt dist-upgrade
sudo apt autoremove
```

All this takes considerable time, and there is no good way at this stage to get feedback to the user. Once the **GetStarted** script is complete, it then reboots the system, which again takes time. By watching the command prompt, you can see the progress, so you, as a technical person, are not in the dark about what is happening. But clearly this is a less than optimal situation. Nevertheless, it does work, and improving the situation will have to wait till a later date, as we out of time this quarter.

For me, the whole process takes something like five minutes to complete. It is pretty nice to be able to completely provision an EC2 instance in five minutes without having to do anything more than select a few buttons. So the experience has its upside. I definitely want to improve the app, but at least this is a start.

## EndPoints

Here is a list of all the endpoints I'm using at this time and the file in the **server/routes** directory in which they are found:

- index.js (all use AWS api)
  - /associate-elastic-ip
  - /create-educate
  - /create-standard
  - /get-instance-status
  - /reboot-instance
- ssh-runner.js (all use ssh2)
  - /run-get-started
  - /run-ubuntu-setup
- script-pusher (all use spawn)
  - /copy-get-started
  - /remove-known-host

On the client end, I have my code refactored into a similar, but not identical, pattern.

## Details

The **routes/ssh-runner.js** file must get its HostAddress (the Elastic IP of the server) and Private Key identity file from **~/.ssh/config** via the technique explained in the [Get SSH and Private IP][gsapi] assignment. This is an important part of the assignment, as filling in the information by hand is among the time consuming parts of grading your assignment. Having to do it manually would definitely be a bumpy stretch in the process of grading any assignment.

Get rid of the **queryServer** call to the endpoint **/foo**. We don't want that anymore.

| Method | Button Content (Text)     | Route to Endpoint |
| :------------- | :------------- |  :------------- |
| /create-educate | Use the **AwsPromise** code I gave you.
| /create-standard | Use the **AwsPromise** code I gave you
| /associate-elastic-ip | Use the AwsPromise code I gave you
| /script-pusher/copy-get-started | Use the Node JS spawn API and scp |
| /ssh-runner/run-get-started | Use the SSH2 Package |
| this.removeKnownHost| Remove from KnownHost | /script-pusher/remove-known-host |

## Refactor

The following React classes should exist in **client/src**. Beneath each module name I add a few comments and/or the endpoints the module calls:

- App.js
  - Links together the modules listed below in its render method
  - It does nothing else
- CreateAssociate.js
  - /create-standard
  - /create-educate
  - /associate-elastic-ip
  - Maintains quite a bit of state.
- ElfHeader.js
  - Show the Title and your name
- RunLocal.js
  - /copy-get-started
- RunRemote.js
  - /run-get-started
  - /run-ubuntu-setup
- Tools.js
  - /get-instance-status
  - /reboot-instance
  - /remove-known-hosts

The URLs shown above, are not necessarily complete. I'm just giving  you enough information so you can see which URL goes in which file.

## Associate

One of the trickiest parts of this process is getting the instanceId of a newly created instance and using it to bind an elastic IP to an instance.

You need two pieces of information to link an Elastic IP and instance:

- The allocationId of the Elastic IP
- The instanceId of the instance you want to connect to

Your milage may differ, but I maintain the **allocationIds** for both my standard and my educate account on the client side:

```javascript
const allocationIds = {
    standard: 'eipalloc-0f6a026c08de655a2',
    educate: 'eipalloc-0e6db228b0e914bf1'
};

const regions = { standard: 'us-west-2', educate: 'us-east-1' };
```

Note that I also track the region I use on both accounts. (Most of you will only use your educate account, but I show you how I track both pieces of data, since I want my code to work in both places. That is definitely not a requirement for the final, if you can get either educate or standard to work, then that is more than enough to do well on the final.)

In **routes/aws/AwsPromise.js**, around line 35, you find this code:

```JavaScript
resolve({
    result: 'success',
    instanceData: data.Instances[0],
    instanceTagged: tagData
});
```

The **instanceData** property contains the information about the created instance that is sent to us by AWS. Among the data sent is the **instanceId** of the new instance. On the client side, in the fetch call that starts off the process of creating a new instance, I write this code:

```javascript
that.setState({
    result: json.result,
    instanceData: json.instanceData,
    allocationId: allocationIds.educate,
    region: regions.educate
});
```

Then in my constructor, I track the data send from the server:

```javascript
constructor() {
    super();
    this.state = {
        result: 'unknown',
        allocationId: allocationIds.standard,
        region: regions.standard,
        instanceData: {
            Architecture: '',
            ClientToken: '',
            ImageId: '',
            InstanceId: 'i-0b37f98105dd1a72c',
            InstanceType: '',
            KeyName: '',
            LaunchTime: '',
            PrivateDnsName: '',
            PrivateIpAddress: '',
            PublicDnsName: '',
            Hypervisor: '',
            RootDeviceName: '',
            RootDeviceType: ''
        }
    };
}
```

Note that I provide default values for several fields, but this is just to keep the program from faulting before I have chance to fill them in with real data. In other words, this default values are all replaced after I get the instance data for an instance from the server.

![Some random version of my app just after instance is created][apii]

**Caption**: _Some random version of my app just after an EC2 instance is created. Note that the **instanceId** is displayed._

Now that we have the instanceId of the newly created instance, we can use it to associate our Elastic IP with the instance:

```JavaScript
associateElasticIp = () => {
    //const that = this;
    fetch(
        '/associate-elastic-ip?instanceId=' +
            this.state.instanceData.InstanceId +
            '&allocationId=' +
            this.state.allocationId +
            '&region=' +
            this.state.region
    )
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log('parsed json', json);  
        })
        .catch(function(ex) {
            console.log(
                'parsing failed, URL bad, network down, or similar',
                ex
            );
        });
};
```

Ultimately, it would probably make sense to automatically call associateElasticIp when we get the **instanceId** from the server, but I do yet do that. At this time, I want to complete each step separately so I can be sure it is working. Getting things to run more smoothly is work left for a later date. (Perhaps we'll do it this spring in Isit322?)

## Turn it in

- elf-tagger "finished final" "aws-provision"
  - If you need to do this more than once, just use the same strings each time. The git tag number will sort out their order.
- Merge your work into the **master** branch when you are done.

Let me know which programs you want me to check to see if they are running correctly according the description in **systemd Service Complete**. If you have any doubt as to whether you are using the right port or the port name, then let me know what you used. For instance:

- Program: System Check
- Port: 30034
- Environment Variable: ELF_SYSTEM_CHECK_PORT

Recall that the official list of ports and names is in [SystemdServiceControl][sdsctrl].


## Charlie Notes

Here are some key points I need to integrate into this document. 

- We spent a lot of time learning lots of good stuff, but also trying to get everyone up to speed to do aws-provision, but we didn't quite make it, and I was reluctant to admit it. I see it now.
- So the unofficial plan at this writing is to have all the implementation of the server side code for aws-provision be extra credit.
- Instead, I want you to polish the earlier aws-provision assignment in the ways laid out in the SystemdServiceComplete (Links to an external site.)Links to an external site. assignment. The only addition is that I want all the server side methods, that just return placeholder JSON, to be checked with SuperTest code. I'll be more specific later, but essentially each server-side method should return something like {"result": "success", "endpoint-called": "<YOUR ROUTE NAME LIKE /foo>"} and your SuperTest code should confirm that it can do that.
- This empty, non-working version of aws-provision should be running on as a systemd service on EC2. When I click on the buttons, they should display the default JSON text guessed at above, and specified in more detail by end of day Friday.
- You should also have a SystemCheck program which only checks methods on the client side running as an EC2 service on EC2. In other words, it never uses server/routes/ssh-runner, only script-pusher.js. It never uses SSH to check services running on other systems, it just checks the services running on the same instance of EC2 that it runs on. So uptime returns how long your EC2 instance has been up and running. (Please make sure you implement the whitelist!)
- For extra credit, you can have a separate program in your repository in a branch called extra-credit, that actually tries to implement the server side methods in aws-provision. It doesn't have to be complete to get you at least some extra credit. Don't deploy this version to EC2. It is only in the aws-provision directory but in the extra-credit branch. The final branch should contain the version of the program that you deploy to EC2, the version that doesn't do anything. it is that version that should be merged into master. The extra-credit version is never merged into master, it stays in extra-credit. Make it very obvious that you did the extra credit so I notice that you did it and grade it. Assume I'm a basket case and won't read a hint buried somewhere. If you did it, make it very clear that you did the extra credit.
- Also, I'm going to want to see some refactoring. I'll specify just what in the final document, but it is probably going to be close to what is already in the final.
- In summary, the Systemd Service Complete assignment is your final, except that I want you to add your aws-provision program to it, as described above.

Again, this is not the final version of the final, as it were, but hopefully, it is close enough to let you continue working until I get the updated text to you.


[apii]: https://s3.amazonaws.com/bucket01.elvenware.com/images/aws-provision-instanceid.png
[ec2pr]: https://www.elvenware.com/teach/assignments/Aws/Ec2ProvisionRepo.html
[gsapi]: https://www.elvenware.com/teach/assignments/Linux/GetSshIpAndPrivateKey.html
[sdsc]: https://www.elvenware.com/teach/assignments/Npm/SystemdServiceComplete.html
[sdsctrl]: https://www.elvenware.com/teach/assignments/Npm/SystemdServiceControl.html#official-ports

[new-final]:https://bc.instructure.com/courses/1626572/discussion_topics/8486355
