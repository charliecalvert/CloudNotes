## Enzyme mount vs shallow

Suppose one component nests another. For instance, suppose that your custom component **MyComponent** renders a second component called **MyOtherComponent**. Here is **MyComponents** render method :

```javascript
render() {
    return (
        <div className="App">
            <MyOtherComponent />
        </div>
    );
}
```

In cases like this, if you Enzyme's shallow, you will only see the output from **MyComponent**. Indeed, that is often what you want. But sometimes, it is simpler to see the output from both **MyComponent** and **MyOtherComponent**. To do that, you use **mount** rather than **shallow**. We usually do this:

```javascript
import { shallow } from 'enzyme';
```

If you want to see output from both components, then do this:

```javascript
import { mount } from 'enzyme';
```

## Testing Element with OnChange Attributes {#on-change=attrs}

Suppose you have a code like this:

```javascript
import { mount } from 'enzyme';

it.only('renders button click message for state.userLogin', () => {
    const wrapper = mount(<GetUserInfo />);
    const inputElement = <input value="Robin Dudette" />;  
    wrapper.find('button.getUser').simulate('click');
    getLast(wrapper);
    expect(wrapper.containsMatchingElement(inputElement)).toEqual(true);
});
```

Your **getLast** debug method may report that your HTML control is generating something like this:

```html
<input value="Robin Dudette" onChange={[Function]} />
```

Yet testing for that exact string seems to fail no matter what I do, probably because [Function] is being expanded. The solution, I found is to use **containsMatchingElement** instead of **contains**. Don't do this, where I am omitting some code and my naming convention :

```javascript
const inputElement = <input value="Robin Dudette" onChange={[Function]} />
expect(wrapper.contains(inputElement)).toEqual(true);
```

Instead, do this:

```javascript
const inputElement = <input value="Robin Dudette" />;  
expect(wrapper.containsMatchingElement(inputElement)).toEqual(true);
```
