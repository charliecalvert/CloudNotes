## Overview

We often want to have events triggered just as our components load. With React Hooks, we can use a method called **useEffect** that will allow us to do this, and a number of other powerful things.

- [General Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)

## Mounting and Updating

In an attempt to modify the pace of our learning, I have been perhaps criminally remiss in not introducing the React class methods called:

*   [componentDidMount](https://reactjs.org/docs/react-component.html#componentdidmount): Called after a component's **render** method has been run for the first time
*   [componentDidUpdate](https://reactjs.org/docs/react-component.html#componentdidupdate): Called every time -- except the first -- that the component is rendered.
*   [componentWillUnmount](https://reactjs.org/docs/react-component.html#componentwillunmount): Called just before a component is destroyed.

These "life-cycle" methods are called automatically by React. I don't think I need to spell out in more depth when they are called as they are well named after the event that triggers them. The links do, however, lead to more in-depth explanations.

**NOTE**: _Above I talk about rendering a component. In the world of React Class Components, a component is rendered by calling our implementation of the **render** method. There is no render method in a React Function component, so instead of talking about calls to **render**, we just talk about rendering the component. These are two ways of talking about the same thing._

## Handling Effects

In React function components, events like **componentDidMount** do not exist. Instead, we have **useEffect**, just as we have **useState** as an alternative to **setState**. 

Finding the right name for this new method was difficult, and I do not find **useEffect** to be as descriptive a name as **componentDidMount**. What exactly is meant be the word _effect_? The developers of React think of effects as "Data fetching, setting up a subscription, and manually changing the DOM". I believe they mean that if you want to call **fetch**, set up an **event**, or ask to **rerender** your component, then **useEffect** is the proper way to handle or setup these effects.

Suppose we want to have **YouRang** called automatically when our component is loaded, rather than having to press a button. In a React Class Component use **componentDidMount.** In our function components, use **useEffect**, and pass in the name of the method that contains our call to fetch. But this is not quite enough, as it sets up an infinite loop. We call **fetch** and change the components state, and this causes **render** to be called, which causes **useEffect** to be called, which starts the whole cycle from the beginning, and so on, forever and ever. To stop this endlessly looping, pass an empty array as a second parameter to **useEffect:**

*   The first parameter is a callback. Inside the call back we call **fetch** 
*   The second parameter is an empty array

```javascript
import React, {useState, useEffect} from 'react';

function YouRang() {

    // Code omitted here.

    useEffect(function() {
        queryYouRang();
    }, []);

    // Code omitted here.

}

export default YouRang;
```

To help you see both parameters clearly, here is another way to view the call to **useEffect**:

```javascript
const callback = function() {
    queryYouRang();
};

useEffect(callback, []);
```

And here is what it looks like with ES6 arrow syntax:

```JavaScript
useEffect(() => {
        queryYouRang();
}, []);
```

To help you see the two parameters, I'll format it slightly differently:

```javascript
useEffect(() => { queryYouRang(); }, []);
```

## The input Parameter

The second parameter we pass to **useEffect** allows us to fire effects only under certain conditions. By default, **useEffect** is fired every time our component is rendered, which is what led us into the infinite loop described above. But we can tell React to fire the event only if certain props or state are changed. As we have seen, if we pass in an empty array, then **useEffect** is called only after the first time the component is rendered.

**NOTE**: _Recall that we use to think of rendering a component as the time when our implementation of **render** was called._

If we want **useState** to be called at other times, then pass in array of props or state that should trigger a new call to **useEffect**. Hopefully we will have a chance to explore how this works in more depth before the final. If not, we will likely look at next quarter.

## Turn it in

Where possible, transform your existing components to render automatically rather than on button clicks. In some cases, it might still make sense to keep the button. If not, remove it. Please include branch, folder and a tag.
