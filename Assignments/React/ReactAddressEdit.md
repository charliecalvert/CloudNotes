---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactAddressEdit.md
relativePath: Assignments/React/ReactAddressEdit.md
title: ReactAddressEdit
queryPath: Assignments/React/
subject: React
fileNameMarkdown: ReactAddressEdit.md
fileNameHTML: ReactAddressEdit.html
---


<!-- toc -->
<!-- tocstop -->

# React Address Edit

We have several steps that will allow us to start editing the data we view:

- Create an AddressEdit Component
  - The component should allow the user to edit the data: **AddressEdit**
- Both the **AddressShow** and **AddressEdit** components are children of Address
  - Modify the **Address** **render** method to reflect this
  - Update Tests, creating a new test suite: **AddressEdit.test.js**

## Create Tests

Please read this one section from Elvenware:

- [Emzyme Mount vs Shallow][emvz]

[emvz]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReact.html#enzyme-mount-vs-shallow

## Create AddressEdit

Make a copy of **AddressShow**. Rename the class from **AddressShow** to **AddressEdit**. Must be done in at least two places. Strip out everything except the render method.

- Replace the **P** elements with INPUT controls.
- Add an ID to each INPUT
- Add an ONCHANGE attribute to each INPUT

Here is an example:

```javascript
<input id="elfFN" className="App-intro" value={this.props.address.firstName} onChange={this.props.onNameChange}/>
```  

## Hint

**shallow** can see all the HTML tags in a render method, but it can't see into the sub-components. Consider this code:

```javascript
render() {
    if (!this.quiet) { console.log("ADDRESS RENDER"); }
    return (
        <div className="App">
            <MyAddress />
        </div>
    );
}
```

**shallow** can see that this render method contains a second React component called **MyAddress**, but it can't see the render method of **MyAddress**. **mount** can see into **MyAddress**. This means it can find the list items or paragraphs that may be listed as part of the **MyAddress** react **Component**. In cases like that shown above, it can see the **render** method of **MyAddress**, but shallow cannot.

Just to be clear, it would not matter how many divs, list items, paragraphs or other tags were included in the **render** method shown above. **shallow** could see them all. But it could not see into the contents of the render method of **MyAddress**.


## Teach Address to Load AddressEdit {#load-address-edit}

All you need to do is add a new method for handling changes to the input control:

```javascript
onNameChange = (event) => {
    this.log("ON NAME CHANGE");
    const address = addresses[this.addressIndex];
    switch (event.target.id) {
        case 'elfFN':
            address.firstName = event.target.value;
            break;
        case 'elfLN':
            address.lastName = event.target.value;
            break;
        // ETC
        default:
            throw new Error('OH NO BAD CASE in Address onNameChange');
    }
    this.setState({
        address: address
    })
};
```

As you can see, key information about the user's action are passed in the **target** object that lives like a craven parasite on the **event** object. Note that:

- **event.target.id** contains the id of the INPUT control the user is editing.
- **event.target.value** contains the current value of the string the user is editing

To display the **AddressEdit** component, modify the **Address** render method to teach it to load **AddressEdit**:

```javascript
<AddressEdit
    address={this.state.address}
    onAddressChange={this.onAddressChange}
    onNameChange={this.onNameChange}
/>
<AddressShow
    address={this.state.address}
    onAddressChange={this.onAddressChange}
 />
```

When you are done, edits to the INPUT should automatically propogate to the paragraph controls.


## ElfTestDebug

Save as ElfEnzymeDebug.js in the root of your project.

The Source is here:

- [ElfEnzymeDebug][eed]

And use it like this:

```javascript
import ElfTestDebug from '../ElfTestDebug';
const elfTestDebug = new ElfTestDebug(true);

elfTestDebug.getFirst(...);
```

[eed]: https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab

## Contains Matching

Don't call wrapper.contains. Instead call wrapper.containsMatchingElement. You can still block copy the thing you want to match from your debug output, but don't include the onChange event.

```javascript
fit('renders and displays the default value for firstName', () => {
    const wrapper = mount(<AddressChanger />);
    elfTestDebug.getFirst(wrapper, 'input');
    const welcome = <input id="elfFirstName" className="App-intro" value="unknown" />;
    expect(wrapper.containsMatchingElement(welcome)).toEqual(true);
});
```

## Turn it in

Add, commit, push. Tag. Push your tag.

## Hint Tagging

- [Git Tag][git-tag]
- [Understanding Tags][under-tag]

[git-tag]: http://www.elvenware.com/charlie/development/cloud/Git.html#git-tag
[under-tag]: http://www.elvenware.com/charlie/development/cloud/Git.html#understanding-tags
