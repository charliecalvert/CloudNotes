## Renewabls Refactor

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
