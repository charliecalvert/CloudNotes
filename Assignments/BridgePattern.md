#BridgePattern

You will use three patterns in this assignment:

- Factory
- Bridge
- Decorator

Base your code on on two or more of the following programs:

- [JsObjects/JavaScript/Design/FactorySimple01][FactorySimple]
- [JsObjects/JavaScript/Design/FactoryInterface][FactoryInterface]
- [JsObjects/JavaScript/Design/BridgeSailor][BridgeSailor]

[BridgeSailor]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/BridgeSailor
[FactoryInterface]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactoryInterface
[FactorySimple]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactorySimple01

Create a **DataReader** object that can:

- Read Json Objects and Display them properly
- Read Markdown files and Display them properly in a markdown editor such as [pagedown][pagedown].
- Both should be able to tell the type of document it handles: JSON or Markdown.

[pagedown]: https://code.google.com/p/pagedown/

Create a **Reader** object using the module pattern. This object is designed to handle data. The **Reader** should be able to bridge to JsonReader and MarkdownReader. It should also:

Create a **FancyReader** that Decorates Reader and can:

- Tell the length of the text it handles.

Use the factory pattern to create a **JsonReader**. Pass the **JsonReader** object to your Bridge **Reader** pattern and show that it can read and display JSON files

Use the factory pattern to create a **MarkdownReader**. Pass the **MarkdownReader** object to your Bridge **Reader** or **FancyReader** pattern and show that it can read and display markdown files in a markdown editor.

## Links

- [DoFactory](http://www.dofactory.com/javascript-patterns.aspx)

> Written with [StackEdit](https://stackedit.io/).