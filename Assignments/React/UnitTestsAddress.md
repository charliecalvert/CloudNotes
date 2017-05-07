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
        nine: '0'
    }
}
```

**The JSX for HTML paragraph and button elements:**

```javascript
<p className="App-intro">
    Nine: {this.state.nine}
</p>

<button className="elf" onClick={this.bar}>Get Nine</button>
```

**The bar method:**

```javascript
bar = () => {
    this.setState({
        nine: '9'
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
        const welcome = <p className="App-intro">Nine: 0</p>;
        expect(wrapper.contains(welcome)).toEqual(true);
    });

    it('renders button click message', () => {
        const wrapper = shallow(<App />);
        const nineSign = <p className="App-intro">Nine: 9</p>;
        wrapper.find('button.elf').simulate('click');
        expect(wrapper.contains(nineSign)).toEqual(true);
    });

});
```

![Running the tests][run-tests]

## Change Name of Bar

Right now we have a method on our App class called **bar**. Let's give it a more sensible name: **getNine**:

```javascript
getNine = () => {
    this.setState({
        nine: '9'
    })
};
```

Make any other necessary changes to ensure that your app still runs.

## Add firstName test

Before we create a first name, let's right to see if it exists. The test will fail at first. Our goal in the next section, is to get the test to pass.

```javascript
it('renders and displays the default first name', () => {
    const wrapper = shallow(<App />);
    const welcome = <p className="App-intro">firstName: unknown</p>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

If you are having trouble getting this test to pass, add some debug information to help you see what the last paragraph element on your form is actually rendering:

```javascript
const ninep = wrapper.find('p').last().debug();
console.log(ninep);
```

**TIP**: _The call to last gets the last paragraph on your form. Beside **last()**, there is also a **first()**. See the enzyme docs for more info._

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

## Add firstName

I'm not going to talk you through all the steps, but let's make sure you know how to add one of the address fields. You will then add the others on your own.

In the constructor, add first name to state:

```javascript
this.state = {
    nine: '0',
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

You probably should create a new test for each default field you add, and for each new field that is displayed when you click the **setAddress** button. In other words, don't try to write one long test that confirms that all the address fields are set. Instead, write one default test for the **firstName**, one for **lastName**, one for **street**, one for **city**, etc. You should also have one test for each field as it appears after the button is clicked.

Feel free to be creative with the HTML you generate. At this point, you will probably feel constrained by your ability to write reasonable tests for complex HTML. Hopefully our skills we improve so that we won't always feel that limitation. In other words, even if you know fancy HTML and CSS for displaying an address, consider limiting, for now, just how fancy you get because the tests might be become to hard.

[Get Sen Murray's address](https://www.google.com/search?q=address+for+patty+murray)

[view-jest]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-jest-view.png

[run-tests]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-jest-test.png

[show-patty]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-jest-patty.png

[test-first]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-jest-default-first-name.png

[reactjta]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-jest-test-address.png
