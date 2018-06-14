## Overview

Hints on testing GitUser and GitUser-UI after we have moved to Material-UI v1.1.1 or later.

## Testing GitUser

Here is the test to see if we can find a property of the JSX tag for a React component.

```javascript
import React from 'react';
import GitUser from '../components/GitUser';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ElfDebugEnzyme from '../ElfDebugEnzyme';

const elfDebugEnzyme = new ElfDebugEnzyme(false, 'App.test.js');
configure({ adapter: new Adapter() });

describe('Git User Simple Test', function() {
    const themeDark = createMuiTheme({
        palette: {
            type: 'dark'
        }
    });

    function createWrapper() {
        return shallow(
            <MuiThemeProvider theme={themeDark}>
                <GitUser />
            </MuiThemeProvider>
        );
    }

    it('GitUserUI is passed props of user with login  set to unknowns', () => {
        const wrapper = createWrapper();
        elfDebugEnzyme.getAllDive(wrapper, false);
        const user = wrapper
            .dive()
            .find('GitUserUI')
            .prop('user');
        expect(user.login).toBe('unknowns');
    });
});
```

You should also be able to write a test to find if a wrapper contains a matching element for this statement:

```javascript
const nineSign = <GitUserUI />;
```

You might need to make frequent reference to the [Enzyme documentation][edoc].

[edoc]: http://airbnb.io/enzyme/docs/api/shallow.html

## Testing GitUser UI

Stripped down click test for **GitUser-ui.js**:

```javascript
import React from 'react';
import GitUserUI from '../components/GitUser.ui';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Typography from '@material-ui/core/Typography';
import userData from '../user-data';

configure({ adapter: new Adapter() });

describe('Git User Ui Simple Tests', function() {
    let wrapper = null;

    const  queryGitApi = () => {
        wrapper.setProps({
            user: {
                login: 'sam',
                location: 'here',
                bio: 'exists'

            }
        });
    };

    it('checks that we can display the user login', () => {
        wrapper = shallow(<GitUserUI user={userData} queryGitApi={queryGitApi}/>);
        const nineSign = <Typography>login: sam</Typography>;
        wrapper.find('#queryGitUser').simulate('click');
        expect(wrapper.containsMatchingElement(nineSign)).toBe(true);
    });

});
```

Once you have the test working it should be relatively simple to create tests that check the state before the button click and to test the state of other fields beside **login**.

## Turn it in

At this time, this is not an assignment. It is just supplemental material to help you through the final and other assignments.
