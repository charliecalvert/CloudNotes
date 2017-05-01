
npm install --save react-router-dom


## Hint

If you needed to pass props to your router, and we don't, you would do it like this:

```javascript
<Route path="/about"
       render={(props) => (<AddressShow  {...props}
                 address={this.props.address}
                 onAddressChange={this.props.onAddressChange}
       />)}
/>

<Route path="/topics"
    render={(props) => (<AddressEdit  {...props}
         address={this.props.address}
         onAddressChange={this.props.onAddressChange}
         onNameChange={this.props.onNameChange}
    />)}
/>
```
