# React Redux Git API

We now want to apply Redux to GitExplorer.

## Reducer

Let's start at the beginning. Create a file called **assets/gist-reducer.js**:

```javascript
const gistState = {

};

const gistReducer = (state = gistState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default gistReducer;
```

Now set up **index.js**:

```javascript
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import gistReducer from './assets/gist-reducer';

let store = createStore(gistReducer);

ReactDOM.render(
    <div>
        <Provider store={store}>
		    <Router>
		        <DataMaven/>
		    </Router>
		</Provider>
    </div>,
    document.getElementById('root')
);
```

## Small Numbers

In **SmallNumbers**, strip out the state from the constructor or stop passing in props from **DataMaven**:

Here is how to call **SmallNumbers**:

```html
<Route path='/get-numbers' component={SmallNumbers} />
```

Here is the constructor:

```javascript
constructor(props) {
    super(props);
    logger.log('SmallNumber props', this.props);
    this.getNine = this.getNine.bind(this);
    this.getEight = this.getEight.bind(this);
}
```

Now, lets move the state to the reducer:

```javascript
const gistState = {
  numbers: {
      nine: '0',
      eight: '0'
  }
};

const gistReducer = (state = gistState, action) => {
    switch (action.type) {
      case 'NUMBER_NINE':
        return Object.assign({}, state, {
            numbers: {
                nine: 9,
                eight: state.numbers.eight
            }
        });

      case 'NUMBER_EIGHT':
        return Object.assign({}, state, {
            numbers: {
                nine: state.numbers.nine,
                eight: 8
            }
        });

      default:
        return state;
    }
};

export default gistReducer;
```

We use **Object.assign** because we want our objects to be immutable. You may not change your state object, you must completely rebuild it. You must copy the old state into a new state and in the process add new values to the changed properties. That is what **Object.assign** does.

Alternatively:

```javascript
case 'NUMBER_EIGHT':
  return {
    numbers: {
      eight: '8',
      nine: state.numbers.nine
    }
  };
```

But that can get unwieldy if our **state** becomes complex.

## Small Numbers Implementation

Then do this to connect **SmallNumbers** to Redux:

```javascript
import {connect} from 'react-redux';

// SMALL NUMBERS ITSELF HERE.
// AND AT THE BOTTOM:

const mapStateToProps = (state) => {
    return {
        numbers: state.numbers
    };
};

SmallNumbers = connect(mapStateToProps)(SmallNumbers);
```

There is no real need for **mapDispatchToProps** because our dispatch calls are so simple:

```javascript
getNine() {
  this.props.dispatch({type: 'NUMBER_NINE'});
};
```

## GetFoo

Get Foo is bit more complex, but still a very similar process:


In the reducer:

```javascript
const gistState = {
    getFoo: {
        foo: 'foo',
        file: 'api.js'
    },
    numbers: {
        nine: '0',
        eight: '0'
    }
};

const gistReducer = (state = gistState, action) => {
  switch (action.type) {
      case 'GETFOO':
          return Object.assign({}, state, {getFoo: action.getFoo});
      etc
  }      
}
```    

And here is the connect object in **GetFooConnect**:

```javascript
/**
 * Created by charlie on 6/3/17.
 */

import 'whatwg-fetch';
import {connect} from 'react-redux';
import GetFoo from './GetFoo';
import ElfLogger from '../assets/ElfLogger';
const logger = new ElfLogger('get-foo-connect');

const mapStateToProps = (state) => {
    return {
        foo: state.getFoo.foo,
        file: state.getFoo.file
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBar: () => {
            dispatch({
                type: 'GETFOO',
                getFoo: {
                    foo: 'url-mock-bar',
                    file: 'url-mock-api.js'
                }
            });
        },
        getFoo: () => {
            fetch('/foo')
                .then(function(response) {
                      return response.json();
                }).then(function(json) {
                  dispatch({
                    type: 'GETFOO',
                    getFoo: json
                });
            }).catch(function(ex) {
                console.log('parsing failed', ex);
            });

        }
    };
};

const GetFooConnect = connect(mapStateToProps, mapDispatchToProps)(GetFoo);

export default GetFooConnect;
```

## Turn it in

add, commit, push, branch and/or tag. Tell me the branch, tag and folder. I'm expecting it to be done in the folder called **GitExplorer**.
