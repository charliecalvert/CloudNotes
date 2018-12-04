## Overview

Pease see [this announcment][new-final] which covers some of the changes to the final discussed near the end of class on Wednesday.

You have a few major goals:

- To complete the [systemd Service Complete][sdsc] assignment
- To complete a modified version of the [EC2 Provision Repo][ec2pr] assignment
- Get two applications running on AWS and turn in links to them.
  - The custom aws-provision app described in this document.
  - A version of SystemCheck also described in this document.
- Create unit tests
  - Create at least 10 Enzyme based tests of your client side code
  - Create SuperTest tests for each of the routes on the server

As subset of the second goal, you should write your own script that will clown your repository to the remote instance.

The [Service Complete][sdsc] assignment is self-explanatory, but the EC2 Provision Repo needs some comment, which is provided below.

For extra credit, you can attempt to fully implement Aws-Provision in a branch called **extra-credit.** Do not deploy this version of the program to EC2. It should only be run locally as it could give other people too much power over your account. To be clear:

- **Final Branch**: The **final** contains the custom **Aws-Provision** program that doesn't really do anything.
  - Deploy this version to EC2.
- **Extra Credit Branch**: Use the **extra-credit** branch to create a version of **aws-provision** that actually does something.

The final branch ought to contain at least the **aws-provision**, **scripts** and **system-check** directories. The **master** branch should contain all the programs we have created.

## Up to date

I'm worried that some might have an older version of [node js](https://nodejs.org/en/) on your system. To fix do this:

```bash
jou
cd NodeInstall/
./NodeInstall.sh
```

When you are done, the following should be more or less what you see:

```bash
$ node --version
v11.3.0
```


## Getting Started

I don't see why we can't do our work in the existing **aws-provision** directory. I would however, like you to:

- Create a **final** branch and do your work in it.
- As you start: **elf-tagger "starting final" "aws-provision"**

My tag looks like this:

```
v1.1.24  starting final for aws-provision on branch final with tag v1.1.24.
```

**NOTE**: _It is finally time to get rid of the **queryServer** call to the endpoint **/foo**. We don't need it anymore since we will create many similar calls as part of this final._

## EndPoints

Here is a list of the endpoints I want you to implement in the custom Aws-Provision version created for this final. Here are the routes and the file in the **server/routes** directory in which they are found:

- index.js (all use AWS api)
  - /associate-elastic-ip?instanceId=xxx&allocationId=yyy&region=zzz
  - /create-educate
  - /create-standard
  - /get-instance-status?instanceId=xxx
  - /reboot-instance
- ssh-runner.js (all use ssh2)
  - /run-get-started
  - /run-ubuntu-setup
- script-pusher (all use spawn)
  - /copy-get-started
  - /remove-known-host?ec2Ip=xxx.xxx.xxx.xxx

On the client end, I have my code refactored into a similar, but not identical, pattern.

Above you can see the methods that take parameters. Both **/create-educate** and **/create-standard** return at least:

- instanceData.InstanceId
- instanceData.KeyName
- instanceData.Architecture
- allocationIds.standard
- regions.region

Like this:

```JavaScript
{
    result: 'success',
    route: '/create-standard'
    instanceData: {
        // YOU FILL IN THIS
    },
    allocationIds: {
        standard: "standard"
    },
    regions: {
        // YOU FILL IN THIS
    }
}
```

The front end, showing some of the data retrieved from the server.

![The front end, showing some of the data retrieved from the server][ifui]

- The server should serve up JSON
- At least some of the JSON data from the server should be put into state, and finally displayed as above.
- As described below, use SuperTest to confirm that the server is serving up the proper JSON.

## Host Address and Private Key File

The **routes/ssh-runner.js** file must get its **HostAddress** (the Elastic IP of the server) and Private Key identity file from **~/.ssh/config** via the technique explained in the [Get SSH and Private IP][gsapi] assignment. This is an important part of the assignment, as filling in the information by hand is among the time consuming parts of grading your assignment. Having to do it manually would definitely be a bumpy stretch in the process of grading any assignment.

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

The URLs shown above, are not necessarily complete. I'm just giving  you enough information so you can see which URL goes in which file. In our custom version, each route simply returns a simple JSON object with a few simple text fields.

## SuperTest

Create separate tests files for each of the modules in the **server/routes** directory. Something like this:

- test/ssh-runner-test.js
- test/script-pusher-test.js
- test/index-aws-test.js

To make sure they all run, adjust your **package.json** entry to something like this:

```javascript
"test": "mocha 'test/*-test.js'"
```

**NOTE**: _From looking at the above, you can probably see at least one fairly easy way to run one test file at a time manually if you have the need: mocha 'test/ssh-runner-test.js'._

In the call to describe at the top of each file, put a descriptive string such as:

```JavaScript
describe('script-pusher.js tests', () => { ... });
```

Below I show an example of what the output **script-pusher** tests might look like:

```
  script-pusher.js tests
GET /script-pusher/copy-get-started 200 0.332 ms - 47
    ✓ should test /script-pusher/copy-get-started returns valid JSON
GET /script-pusher/copy-get-started 200 0.181 ms - 47
    ✓ should test /script-pusher/copy-get-started returns specific values
GET /script-pusher/remove-known-host?ec2Ip=192.168.2.2 200 0.274 ms - 70
    ✓ should test /script-pusher/remove-known-host returns valid JSON
GET /script-pusher/remove-known-host?ec2Ip=192.168.2.2 200 0.206 ms - 70
    ✓ should test /script-pusher/remove-known-host returns specific values


  6 passing (31ms)
```

Here is the simplest possible implementation of an endpoint, and one that we can use in many cases:

```javascript
router.get('/qux', function(request, response) {
    response.send({
        "result": "success",
        "route": "qux",
    });
});
```

Assuming this fictitious endpoint is in **script-pusher**, then we test it like this:

```javascript
it('should test /script-pusher/qux returns valid JSON', function (done) {
    request(app)
        .get('/script-pusher/qux')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
});

it('should test /script-pusher/qux returns specific values', function (done) {
    request(app)
        .get('/script-pusher/qux')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({
            "result": "success",
            "route": "qux"
        })
        .expect(200, done);
});
```

The output would look like this:

```
script-pusher.js tests
GET /script-pusher/qux 200 4.190 ms - 34
  ✓ should test /script-pusher/qux returns valid JSON
GET /script-pusher/qux 200 0.418 ms - 34
  ✓ should test /script-pusher/qux returns specific values

  2 passing (11ms)
```

But it is not always this simple. The methods in **ssh-runner**, for instance, should return not only the default values, but also at least the HOST_ADDRESS and IDENTITY_FILE from our calls to **getSshIp**:

```javascript
response.send({
    "result": "success",
    "route": "run-get-started",
    "host": result.hostName,
    "identity-file": result.identityFile
});
```

We still make the call to getSshIp, and it still respond to our promise with **.then** and **.catch**, only in this custom version of **aws-provision**, we don't ever call a method that wraps SSH2, instead, we just call **response.send** as outline above.

- Call **getSshIp**
- Write the **.then** clause
  - inside it nest the **response.send** code shown above
- Write the **.catch** clause.
  - For now, at least, write the default response unless you see a need to do otherwise. (I haven't so far.).

Another case where we might need to write a special response, is if we send one or more parameters to the endpoint. In that case, you should mirror back the parameter. For instance, if we called **/qux?foo=bar** then our response might be:

```javascript
response.send({
    "result": "success",
    "route": "run-get-started",
    "foo": <YOU WRITE THE CODE TO GET THE VALUE OF THE PARAMETER>
});
```

**NOTE**: _If by some chance you don't know how to get the parameter passed to an endpoint, then head over to the discussion area and start asking questions. No one will give you the exact code, but they will tell you where to look for it._

At this writing, I can think of three routes that take parameters:

- /remove-known-host: ec2Ip
- /associate-elastic-ip: InstanceId, allocationId, region
- /get-instance-status: InstanceId

You don't need to know real values for this exercise, but your route should take these parameters and pass them back in its response.

Don't forget that **/create-standard** and **create-educate** each return the values described above. Your tests need to take these into account.

If the test complains that it is getting HTML rather than JSON then that probably means that you are using the wrong URL or throwing some kind of exception in your endpoint. Here is a trick:

```javascript

request(app)
    .get('/qux')
    .expect((response) => {
        if (response) {
            console.log('GOT RESPONSE:', response.res.statusMessage);
        }
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
});
```    

We check to response to see what info we got. If the test executed properly, then response.res.statusMessage will be **OK**. If you get **NOT FOUND** then perhaps the URL of route is wrong.

## Environment Variables

Rather late in the game I've decided that I should have asked you to include the block of Environment Variables that you [define and export][sdsctrl] in your **.bashrc**. This can't be an official part of the exam, as it is too late for me to add anything now (Sunday evening), but if you can include it, that would be very helpful. A way to get it to me would be to submit the assignment using the Text option in Canvas, and paste them in the Text page. Another good way would be to put in a file and attach that file to Canvas when you turn in the assignment.

Your list might look a bit like this, but I won't give real port numbers here because the [offical list][sdsctrl] is defined elsewhere.

```bash
export PORT=30XXX
export SERVER_PORT=30XXX
export ELF_SCREF_PORT=30XXX
export ELF_SYSTEM_CHECK_PORT=30XXX
export MIDTERM_PORT=30XXX
```

Don't even copy the names from here. Use the _offical list_ so we have one canonical place to to list services and make changes. I'm showing you the above only so there can be little doubt as to what I hope you can give me.

Though we all should agree on these values, when submitting assignments, it would be best if you included your version of this list of export statements from your **~/.bashrc**. Thank you.


## Turn it in

- elf-tagger "finished final" "aws-provision"
  - If you need to do this more than once, just use the same strings each time. The git tag number will sort out their order.
- Merge your work into the **master** branch when you are done.

Let me know which programs you want me to check to see if they are running correctly according the description in **systemd Service Complete**. If you have any doubt as to whether you are using the right port or the port name, then let me know what you used. For instance:

- Program: System Check
- Port: 30034
- Environment Variable: ELF_SYSTEM_CHECK_PORT

Recall that the official list of ports and names is in [SystemdServiceControl][sdsctrl]. If possible, please include the code you have have in **~/.bashrc** for exporting your custom environment variables, especially if they vary from mine.

## Extra Credit

Here are the extra credit sections. Each section that begins with the words **Extra Credit** are part of the extra credit portion of the final.

## Extra Credit: Provision Repository

The EC2 Provision Repo assignment asked you to create a series of buttons and make sure that each one had an endpoint on the server. The goal for the final is to make the sure the endpoints actually perform the expected operations. This will involve using calls that we have covered multiple times in this class. In particular, you will need to:

- Copy script files from the local machine to the EC2 instance
- Run the scripts on the remote machine
- Use the AWS api to perform a few tasks such as:
  - Create the instance
  - Link the Elastic IP to the instance

Be sure that the code in **App.js** is refactored into an appropriate set of React components.

Create or maintain at least ten unit tests at least three of which should use **supertest**.

## Extra Credit: Bumps in the Road

At the time of this writing, the process of running even a correctly implemented **aws-provision** application will not go smoothly even under even the best of circumstances. For instance, the application should copy the JsObjects SLB script **GetStarted** to the server and then run it. Among other things, this script runs the following commands in a non-interactive manner:

```
sudo apt update
sudo apt upgrade
sudo apt dist-upgrade
sudo apt autoremove
```

All this takes considerable time, and there is no good way at this stage to get feedback to the user. Once the **GetStarted** script is complete, it then reboots the system, which again takes time. By watching the command prompt, you can see the progress, so you, as a technical person, are not in the dark about what is happening. But clearly this is a less than optimal situation. Nevertheless, it does work, and improving the situation will have to wait till a later date, as we out of time this quarter.

For me, the whole process takes something like five minutes to complete. It is pretty nice to be able to completely provision an EC2 instance in five minutes without having to do anything more than select a few buttons. So the experience has its upside. I definitely want to improve the app, but at least this is a start.

## Extra Credit: Route Implementation

| Method | Button Content (Text)     | Route to Endpoint |
| :------------- | :------------- |  :------------- |
| /create-educate | Use the **AwsPromise** code I gave you.
| /create-standard | Use the **AwsPromise** code I gave you
| /associate-elastic-ip | Use the AwsPromise code I gave you
| /script-pusher/copy-get-started | Use the Node JS spawn API and scp |
| /ssh-runner/run-get-started | Use the SSH2 Package |
| this.removeKnownHost| Remove from KnownHost | /script-pusher/remove-known-host |

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
[ifui]: https://s3.amazonaws.com/bucket01.elvenware.com/images/isit320-final-basic-ui.png
[new-final]:https://bc.instructure.com/courses/1626572/discussion_topics/8486355
[sdsc]: https://www.elvenware.com/teach/assignments/Npm/SystemdServiceComplete.html
[sdsctrl]: https://www.elvenware.com/teach/assignments/Npm/SystemdServiceControl.html#official-ports
