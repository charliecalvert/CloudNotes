## Renewables Refactor

Time to refactor

## Overview

We are now turning a major corner in the course. Rather than learning new technologies, we are going to spend most of our time refactoring code and adding new features.

A well designed architecture supports the [Open Closed Principle][ocp-wiki]:

- _**Modules, Classes and Functions should be open to extension by closed to modification.**_

Along with [loose coupling][lc-wiki] the [single-responsibility princeple][srp-wiki] and [TDD][tdd-wiki] the open closed principle is one of the foundations of good software design. My classes are not really about Linux, git, Angular, jQuery, or express. They are about how to build applications using our core ideas:

- [Test Driven Development (TDD)][tdd]
- [Loose Coupling](http://edn.embarcadero.com/article/30372)
- [The Single Responsibility Principle][srp]
- [The Open Closed Principle][ocp]

Another important design principle not emphasized in this class is the [Dependency Inversion Principle][dip].

Slide decks that might be useful:

- Agile Overview: [http://bit.ly/1qf6V4t](http://bit.ly/1qf6V4t)
- Refactoring: [http://bit.ly/elfrefactor](http://bit.ly/elfrefactor)

As a general rule, these are the rules, ideas and guiding principles that make possible agile development:

- <http://www.agilemanifesto.org/>
- <http://www.agilemanifesto.org/principles.html>

[tdd-wiki]:https://en.wikipedia.org/wiki/Test-driven_development
[lc-wiki]:https://en.wikipedia.org/wiki/Loose_coupling
[srp-wiki]:https://en.wikipedia.org/wiki/Single_responsibility_principle
[ocp-wiki]:https://en.wikipedia.org/wiki/Open/closed_principle
[ocp]:http://www.oodesign.com/open-close-principle.html
[dip]:http://www.oodesign.com/dependency-inversion-principle.html
[srp]:http://www.oodesign.com/single-responsibility-principle.html
[tdd]:http://agiledata.org/essays/tdd.html

## Energy Json

We now want to start working with the file called **data/RenewableTypes.json**. I for see a problem here that we ought to address right off. We are already working with a file called **Renewables**. It will be too confusing if we are always trying to distinguish between **RenewablesTypesByYear** and **RenewablesByYear**. To avoid this, let's use **git mv** to rename  **data/RenewableTypes.json** to **data/HighTechEnergy.json**.

## Energy View

It is now time to start viewing and working with **HighTechEnergy.json**.

Clearly partition the _energy_ files from the rest by creating a folders called **high-tech-energy** in **public/javascripts** and **views**.

Put the following files in **public/javascript/high-tech-energy**:

- energy-overview.js  
- energy-types.js  
- msn-types.js

In **views/high-tech-energy**, place these files

- energy-overview-page.jade
- energy-types-page.jade



![Part Way](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog272-midterm-2016-02.png)

**Figure 01**: _Just getting far enough to see you can load the data._

![Part Way](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog272-midterm-2016-01.png)

**Figure 02**: _Just getting far enough to see you can load the types._


## Hints

Be sure you renamed work.js to home.js. Rename all associated buttons, menus and files.
