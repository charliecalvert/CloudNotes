#FactoryBasics

Open the Factory Simple project:

- [Factory Simple](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactorySimple01)

Study the [BoatFactorySpec][OsmaniSpec]. Notice the unit tests for the [Sloop][OsmaniSloop] class. In the same spec file, create similar unit tests for the [Yawl][OsmaniYawl] and Ketch classes. Make sure there is a test showing that a Yawl has a **mizzen** and a Sloop has a **keel**. A Ketch should have a **topsail**.

Make sure you can create and test for the existence of:

- Yawl
- Sloop
- Ketch

And write the tests above, and also give each object a unique color and test for that color. That is make sure a **yawl** is red, a **sloop** is green and a **ketch** is blue. (Choose whatever colors you want.)

The main point is to show that you can create a Yawl, Sloop, and Ketch and run tests to show that they each have certain unique traits. You need to know how to do this in order to complete the more complex **BridgePattern** assignment.

[OsmaniSpec]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/FactorySimple01/Tests/BoatFactorySpec.js
[OsmaniSloop]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/FactorySimple01/Factory/Sloop.js
[OsmaniYawl]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/FactorySimple01/Factories/Yawl.js


