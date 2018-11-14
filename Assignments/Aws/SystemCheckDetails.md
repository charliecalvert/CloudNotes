## Overview

We want to refactor App.js into:

- App.js
- ElfHeader
- RadioWeb
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

## RadioWeb aka RadioLocal

This is a terrible name and needs to be refactored. It should be, as minimum step toward fixing it, **RadioLocal**.

It should contain all the code from App.js that has to do with making calls to **source/routes/script-pusher.js**. These are the calls the query the local system.


## Hint

Don't forget when running code as SYSTEMD, that we have to explicitly set SETUP_LINUXBOX in our service file:

User=charlie
Group=charlie
Environment=NODE_ENV=production
Environment=ELF_SYSTEM_CHECK_PORT=30034
Environment=SETUP_LINUXBOX=/home/charlie/Git/JsObjects/Utilities/SetupLinuxBox
