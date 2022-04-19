---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Aws/SystemCheckDetails.md
relativePath: Assignments/Aws/SystemCheckDetails.md
title: SystemCheckDetails
queryPath: Assignments/Aws/
subject: Aws
fileNameMarkdown: SystemCheckDetails.md
fileNameHTML: SystemCheckDetails.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

We want to refactor App.js into:

- App.js
- ElfHeader
- RadioLocal
  - All calls for local system query
- RadioRemote
  - All calls for remote system query

## ElfHeader

This is the simplest. Just divide all the code that is related to the header into its own tiny component:

```javascript
import React, { Component } from 'react';
import './App.css';

class ElfHeader extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <h1>System Check</h1>
                </header>
            </div>
        );
    }
}

export default ElfHeader;
```

This is a nice example component, because it is stripped down to its bare bones. It is not the simplest component possible, but it is pretty darn simple.

## RadioLocal

This component was once named **RadioWeb** but is now called **RadioLocal**. It should contain all the code from **App.js** that has to do with making calls to **source/routes/script-pusher.js**. These are the calls the query the local system.

- **constructor** to set state
- **runScript** for **fetch** call
- **handleChange** for when user clicks on radio buttons
- **handleSubmit** for when user clicks the button to send the command to the server
- **render**

It's essentially the same code as in **App.js** but with everything taken out that does not have to do with calling local system queries.

We still have the radio buttons, of course, but other than that rather lengthy bit of code, here is what is left in render:

```javascript
return (
    <div className="App">

        <main>
            <section>{radioLocal}</section>
            <section>
                <pre>{this.state.allData}</pre>
            </section>

        </main>
    </div>
);
```

That tells you quite a bit about what needs to be in state.

## RadioRemote

Again, this is the code from App.js that has only to do with calling into ssh-runner.js. This is the code for querying a remote system.

- **constructor** with **state**
- **runScript** with **fetch**
- **handleChange** for when user clicks on radio buttons
- **handleSubmit** for when user clicks the button to send the command to the server
- **render**

## App.js

We have now taken most of the code out of App.js. To give you some sense of what I'm looking for, here is what is left in **render**:

```html
render() {                                                    
    return (                                                  
        <div className="App">                                 
            <ElfHeader />                                     
            <main>                                            
                <section>                                     
                    <RadioLocal />                              
                    <RadioRemote/>                            
                </section>                                    
                <button onClick={this.runFoo}>Run Foo</button>
                <p>Foo: {this.state.foo}</p>                  
            </main>                                           
        </div>                                                
    );                                                        
}                                                             
```

I like leaving foo in there because it can act as a sanity check. We will remove it eventually, of course.

## Turn it in

Give branch and directory. Probably best to include a tag:

    elf-tagger "Completed refactor", "SystemCheckRefactorDetails"

## Hint

Don't forget when running code as SYSTEMD, that we have to explicitly set SETUP_LINUXBOX in our service file:

```
User=charlie
Group=charlie
Environment=NODE_ENV=production
Environment=ELF_SYSTEM_CHECK_PORT=30034
Environment=SETUP_LINUXBOX=/home/charlie/Git/JsObjects/Utilities/SetupLinuxBox
```
