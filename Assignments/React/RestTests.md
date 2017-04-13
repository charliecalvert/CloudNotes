## Overview

Some notes on testing react

## Render

```HTML
render() {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
                state.foo: {this.state.foo}
            </p>
            <p className="App-intro">
                state.file: {this.state.file}
            </p>
            <button className="getFoo" onClick={this.getFoo}>Bar</button>
            <button className="getNine" onClick={this.getNine}>Bar</button>
        </div>
    );
}
```

## Get Nine

```javascript
getNine = () => {
    setState({nine: '9'})
};
```

## Simple Tests

## Call Server

```javascript
getFoo = () => {
    console.log('GetFoo is called');

    const that = this;

    fetch('/api/foo')
        .then(function(response) {
            console.log('got response');
            return response.json();
        }).then(function(json) {
            console.log('parsed json', json);
            that.setState(foo => (json));
        }).catch(function(ex) {
            console.log('elf parsing failed', ex);
        });
};
```
