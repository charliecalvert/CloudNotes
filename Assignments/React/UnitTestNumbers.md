# Unit Test Numbers

The goal of this assignment is to display and test a complete set of numbers from 1 to 9, each of which has state and can be set with a button click.

This assignment builds on the [React Jest Unit Tests][rjut] assignment. Also some reference materials [here](http://bit.ly/jest-cra).

Complete that assignment first. You should turn in only one project, which will contain both the **React Jest Unit Tests** and the **Unit Tests Numbers** assignments. You can turn in the **React Jest Unit Tests** assignment first, if you want. In other words, your project need not include both completed assignments before you turn in the first assignment.

## Tag

Since we are often working on a single project that has multiple phases, I suggest creating a git tag marking your current status:

```bash
$ git tag -a v3.0.0 -m "Start Week03"
$ git push origin v3.0.0
$ git tag -n1
```

The first command creates a tag that has a message associated with it. The message works much like the message in a commit.

The second command pushes the tag from your local machine to the cloud.

The last command lists your tags and their message on one line. If you have only a single tag, it is not particularly useful, but once you have multiple tags you will see how helpful this can be. Increase the value of the number after -n? to see more information about your tag. You can read about tags here:

- [git tag docs](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

## Review

We left things, I believe in this state:

![view][rutv]

With the tests like this:

![output][ruto]

The constructor:

```javascript
constructor() {
    super();
    this.state = {
        file: 'Get Nine Result will be placed here.',
        foo: 'waiting for express server',
        nine: '0'
    };
}
```

Methods called getFoo and getNine:

```javascript
getNine = () => {
    this.setState({nine: '9'});
};
```

GetFoo is the one with the rest call. We are mocking that rest call for our tests. Here is the _mocked_ mock object that we were using by the end of class Thursday:

```javascript
var fetch = function(parentThis) {
    parentThis.setState({
        foo: 'bar',
        file: 'api.js'
    });

    return {
        then: function() {
            return {
                then: function() {
                    return {
                        catch: function() {

                        }
                    }
                }
            }
        }
    }
};

module.exports.fetch = fetch;
```

I'll develop that further, but this is a start.

## Add Test First

The correct way to implement tests is to follow TDD, or Test Driven Development. This includes the important **Test First** theory of development. That means we first create a failing test, then find a way to make it pass.

Start by creating a failing test for a property called **eight**. I'll show two tests here, the first a slightly modified click nine test, and the second our new test:

```javascript
it('renders button click message for nine', () => {
    const wrapper = shallow(<App />);
    const nineSign = <p className="App-intro">state.nine: 9</p>;
    wrapper.find('button.getNine').simulate('click');
    expect(wrapper.contains(nineSign)).toEqual(true);
});

it('renders initial value of paragraph with state.eight', () => {
    const wrapper = shallow(<App />);
    const eightSign = <p className="App-intro">state.eight: 0</p>;
    const eightp = wrapper.find('p').last().debug();
    console.log(eightp);
    expect(wrapper.contains(eightSign)).toEqual(true);
});
```

Note that I have removed the debug lines from the renders button click for nine test, and added it to the **renders initial button state.eight**. I also removed it for the **render initial value of paragraph with state.nine**. This is because that paragraph element will no longer be the **last()** paragraph on our form. The last paragraph on our form is now the one that displays **eight.state**. (We will need to make similar changes for other properties we create.)

![Jest Test with Eight][rjue]

Note the failing test. Your goal is to get it pass. Start by adding state for the value eight:

```javascript
this.state = {
    file: 'Get Nine Result will be placed here.',
    foo: 'waiting for express server',
    nine: '0',
    eight: '0'  <====== HERE
};
```

The next step would be to add a paragraph in which to display its value. The result should look something like this at run time:

![React Unit Test Eight View][rutev]

## Add Eight Button and Test

Now write a test to check that we can set a new value for **state.eight**. I'll leave that up to you, as it is really just a block copy of a previous test. Then replace certain obvious values.

To get the test to pass, add a button for updating and retrieving the value of **state.eight**. It should be fairly clear that you will also need a **getEight** method of your **App** component:

```javascript
getEight = () => {
    this.setState({eight: '8'});
};
```

![React view for button eight][rvbe]

## Turn it in

Go ahead and add state, tests and button for numbers 7-1. When you are done, save your work and push.

Frankly, I've totally lost track of which folder this should be in. Mine is in **week02-rest-basics**. Hopefully yours is in something similar. Probably the best course of action is to be sure to list the folder you want me to inspect when you turn the project in.

**NOTE**: _One thing I'm trying to do here is create one project for each set of related assignments, rather than the old technique of "copy week02-react-foo into week03-react-bar. This is partially selfish, in that it makes my life simpler, but it should also make your life simpler. If you wanted to go crazy, you could use git tags or branches to delineate one assignment in a series from the next assignment in the series. But I will, when I can, just assume that if you can complete the second or third in a series of projects, then you also completed the first in the series._

[rjut]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/RestTests.html
[rutv]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-unit-test-view.png
[ruto]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-unit-test-output.png
[rjue]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-unit-test-eight.png
[rutev]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-unit-test-eight-view.png
[rvbe]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-unit-test-button-view.png
