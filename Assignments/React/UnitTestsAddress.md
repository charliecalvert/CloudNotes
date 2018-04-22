# Unit Test Address

The goal of this assignment is to display and test a complete address with FirstName, LastName, Street, City, State, Zip or more. There should be tests for each field.

This assignment builds on the [Unit Tests with Jest](http://bit.ly/jest-cra) assignment. Complete that assignment first. You should turn in only one project, which will contain both the **Unit Tests with Jest** and the **Unit Tests with Address** assignments. You can turn in the **Unit Tests with Jest** assignment first, if you want. In other words, your project need not include both completed assignments before you turn in the first assignment.

## Review

The interface for our **Unit Tests with Jest** by end of class Wednesday:

![View Unit Jest][view-jest]

In the **Unit Tests with Jest** assignment we had four key pieces of code.

**The Constructor with State Declaration:**

```javascript
constructor() {
    super();
    this.state = {
        file: 'unknown'
    }
}
```

**The JSX for HTML paragraph and button elements:**

```javascript
<p className="App-intro">
    Nine: {this.state.file}
</p>

<button className="elf" onClick={this.bar}>Get Nine</button>
```

**The getFile method:**

```javascript
getFile = () => {
    this.setState({
        file: 'url-file.js'
    })
};
```

**The Tests**

```javascript
describe('React Jest Suite', function () {

    it('renders without our App component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    it('renders and reads H1 text', () => {
        const wrapper = shallow(<App />);
        const welcome = <h2>Welcome to Prog272</h2>;
        expect(wrapper.contains(welcome)).toEqual(true);
    });

    it('renders and displays the word Nine', () => {
        const wrapper = shallow(<App />);
        console.log(wrapper);
        const welcome = <p className="App-intro">file: unknown</p>;
        expect(wrapper.contains(welcome)).toEqual(true);
    });

    it('renders state of File paragraph after button click', () => {
       const wrapper = shallow(<App />);
       const file = <p className="App-intro">file: url-file.js</p>;
       wrapper.find('#getFile').simulate('click');
       expect(wrapper.contains(file)).toBe(true);
    });
});
```

![Running the tests][run-tests]

## Change Name of getFile

Right now we have a method on our App class called **getFile**. Let's give it a more sensible name: **getFileName**:

```javascript
getFileName = () => {
   console.log('getFile called.');
   this.setState({fileName: 'url-file.js'})
};
```

Make any other necessary changes to ensure that your application still runs. and all tests pass.

## Add firstName test

Before we create a first name, let's write a test to see if it exists. The test will fail at first. Our goal in the next section is to get the test to pass.

```javascript
it('renders and displays the default first name', () => {
    const wrapper = shallow(<App />);
    const welcome = <p className="App-intro">firstName: unknown</p>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

You can, and should, add some [Enzyme debug][deed] information to help us see what the last paragraph element on your form is actually rendering:

```javascript
const lastParagraph = wrapper.find('p').last().debug();
console.log(lastParagraph);
```

**TIP**: _The call to last gets the last paragraph on your form. Beside **last()**, there is also a **first()**, and below I'll describe another method called **childAt**. See the [enzyme docs][caed] for more info._

Like this:

```javascript
it('renders and displays the default first name', () => {
    const wrapper = shallow(<App />);
    const welcome = <p className="App-intro">firstName: unknown</p>;
    const firstName = wrapper.find('p').last().debug();  <= WE ADDED LINE HERE
    console.log(firstName);                              <= WE ADDED LINE HERE
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

Please add similar methods to all your methods. For instance, in the simulate click tests, add the test after your call to **.simulate('click')**:

```javascript
it('renders state of File paragraph after button click', () => {
    const wrapper = shallow(<App />);
    const fileSign = <p className="App-intro">file: url-file.js</p>;
    wrapper.find('#getFile').simulate('click');
    const paragraphData = wrapper.find('div').childAt(1).debug();
    console.log(paragraphData);
    expect(wrapper.contains(fileSign)).toBe(true);
});
```

Note that I'm using a slightly different Enzyme debug technique. Here I'm finding a paragraph by specifying its index. Our HTML is wrapped in a DIV, and I'm specifying the index of a particular paragraph, counting down from the start of the DIV. For instance, if there three elements nested on the top level DIV on your page, and you want to get the second one, then write something like this:

```javascript
var paragraphData = wrapper.find('p').childAt(1).debug();
```

Don't include this with the assignment when you turn it in, but if you want to see all the HTML generated by your React component, write this:

```JavaScript
const wrapper = shallow(<App />);
console.log(wrapper.debug());
```

That can help you see how lots of useful things, such as an easy, if mechanical, way to figure out the index of an individual item.

For instance, the last part of the debug output for your tests might look a bit like this:

```HTML
console.log src/App.test.js:147
  <p className="App-intro">
    fax:
    unknown
  </p>

console.log src/App.test.js:156
  <p className="App-intro">
    fax:
    (202) 224-0238
  </p>

console.log src/App.test.js:164
  <p className="App-intro">
    tollfree:
    unknown
  </p>

console.log src/App.test.js:173
  <p className="App-intro">
    tollfree:
    (866) 481-9186
  </p>
```


## Add firstName

I'm not going to talk you through all the steps, but let's make sure you know how to add one of the address fields. You will then add the others on your own.

In the constructor, add first name to state:

```javascript
this.state = {
    file: 'unknown',
    firstName: 'unknown'
}
```

Display our property in the render method:

```javascript
<p className="App-intro">
    firstName: {this.state.firstName}
</p>
```

![testing first name][test-first]


## Add Address Button

Write a failing tests that shows you can click on a button with a class name of **setAddress** and display the words **firstName: Patty**. Your goal will be to get the test to pass.

Add a new method called **setAddress** and ensure that it can set the **firstName property**:

```javascript
setAddress = () => {
    this.setState({
        firstName: 'Patty'
    })
};
```

Call our method from a button click in our render method:

```html
<button className="setAddress" onClick={this.setAddress}>Set Address</button>
```

![Show patty][show-patty]

You should now have six passing tests.

## Turn it in

When you are done, you should be able to display the complete address for Senator Patty Murray and have two tests for each field: one for the default value and one for the value in the field after you click the button. You can pick any Congress Person who interests you. It doesn't have to be Patty Murray. You should have tests that prove everything is displayed as expected both before and after you click the **Set Address** button. So we should be able to see in the component view, and in the tests, the **FirstName**, **LastName**, **Steet**, **City** etc fields...

When you are done, you should have something like 16 to 20 tests. As I drew near the end of the assignment, my tests looked a bit like this:

![Final Tests][reactjta]

Push your work to your repository. When you turn in the assignment, tell me the name of the folder that contains your work. (If appropriate, add the branch as well.) It is fine if this assignment is built on top of, and in the same directory as, the **Unit Tests with Jest Assignment.**

## Hints

You don't need a button click handler for each new field you add. Set them all in **setAddress** handler:

```javascript
setAddress = () => {
    this.setState({
        firstName: 'Patty',
        lastName: 'Murray',
        etc....
    })
};
```

You should create a new test for each property you add to your **state**, and for each **state** property that is displayed when you click the **setAddress** button. In other words, don't try to write one long test that confirms that all the parts of your **state** are set. Instead, write one test for the **firstName**, one for **lastName**, one for **street**, one for **city**, etc. You should also have one button click test for each property as it appears after the button is clicked.

Feel free to be creative with the HTML you generate, but I suggest not being too fancy. Even if you know fancy HTML and CSS for displaying an address, consider limiting, for now, just how fancy you get because the tests might become to hard to write.

## Philosophy

We have to remember what our Enzyme unit tests do: They return the HTML produced by our components. These Enzyme methods, especially debug, help us sort through and trigger events in the HTML that is returned so that we can prove to ourselves that our components are producing the right code. If you have one simple form, this makes little sense since you can just run your app and look at your form to see if it is rendering correctly. If you need to push one button, then you push it and see if it works. But if you have a dozen components - or two dozen - then checking the output becomes harder and harder as your app gains in complexity. Then unit testing becomes essential and a huge time saver. These Enzyme methods, once mastered, help us quickly and efficiently write the correct tests to confirm that our components work even after we fix bugs, refactor, or add features.

This is a skill. One is not born from the womb, wet behind the ears, knowing how to do this. But if you work at it and get good at it, then you have a skill that employers might want.

Jest isn't the only Unit Test library, not by any means. But all unit testing tools have similar features. Learn one library and you can more easily learn the next.

[Get Sen Murray's address](https://www.google.com/search?q=address+for+patty+murray)

[view-jest]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-jest-view.png

[run-tests]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-jest-test.png

[show-patty]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-jest-patty.png

[test-first]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-jest-default-first-name.png

[reactjta]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-jest-test-address.png

[caed]: http://airbnb.io/enzyme/docs/api/ReactWrapper/childAt.html

[deed]: http://airbnb.io/enzyme/docs/api/ShallowWrapper/debug.html
