# Angular Starter

Two simple angular projects.

Be sure that Python is on your path. It should be in **C:\Python34**.

## Step One

Create folder called **Week03-AngularStarter-Add**. Inside it, save the following as **index.html**:

```
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">        
        <title>Angular Starter Add</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
    </head>
    <body ng-app>
        <h1>Angular Starter Add</h1>
        
        <p>5 * 7 = {{5 * 7}}</p>
        
    </body>
</html>
```

The file shown here looks like HTML at first, but there a odd bits of syntax.  Notice, for instance, these two bits of syntax:

- ng-app
- {{5 * 7}}

These two bits of syntax indicate that this is not raw HTML. Instead, it is an angular **template**.

Nomenclature:

-   The File shown above: an Angular **template**.
-   **ng-app**: It is both an HTML **attribute** and an Angular **directive**
-   {{5 * 7}}: Those double curly braces are called Angular **expressions**.

We often write **data-ng-app** in order to conform with the rules of HTML5. Both **ng-app** and **data-ng-app** work.


## Step Two

In the same directory, create a batch file called **StartPythonWebServer.bat** with the following contents:

    python -m http.server 30025

Run the batch file and browse to [localhost:30025](http://localhost:30025).

## Step Three

Make the application interactive by allowing user input.
 
Here is how to create an input control:

    <input type="number" ng-model="operandA"  min="1" max="100" placeholder="0">

Here is how to use the **ng-model** declared in the input control:

    <p>5 * 7 = {{operandA * 7}}</p>

The model declared in the input control now appears automatically in the  

Fiddle with it until entering 2 and 5 in the input controls yields this output:

    2 * 5 = 10

Reference:

- <https://docs.angularjs.org/api/ng/input/input%5Bnumber%5D>

## Step Four

Create a folder called **Week03-AngularStarter-Lists**

Inside the folder put your **StartPythonWebServer.bat** file. Also add the following as **index.html**:

```
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">        
        <title>Angular Starter Lists</title>
        <script src="bower_components/angular/angular.js"></script>
    </head>
    <body ng-app="main">
        <h1>Angular Start Lists</h1>
        
        <p>Enter a name and I will add it to our list.</p>
        <input type="text" ng-model="listItem"  placeholder="Enter list item name">
       
        <p>You entered: {{listItem}}</p>
        
    </body>
</html>
```

## Step Five

Type **bower init** to create a **bower.json** file. Fill in the fields according to your common sense. You can accept the defaults for all questions, or fill in a few with useful values. There is no need to create a **.bowerrc** file.

Add **angular** to your bower file:

    bower install angular --save




## Turn it in

Push both your folders to your git repository. When you submit the assignment, provide the URL of your repository. If you have not used the exact names for the folders that I specify here, also submit your folder names. 

Do not submit nested folders of this type:

    /Git/Week03-MyProject/MyProject

In the bad scenario, the **/Git/Week03-MyProject** folder is empty except for the sub-directory. Don't do that. Instead, copy of the contents of **MyProject** into **Week03-MyProject** and then delete the empty **MyProject** folder.

**NOTE**: *In the "bad scenario" outlined above, the exact name of your folders may differ. The point is not to submit your project inside a nested set of folders. It is, of course, legitimate to have folders with names like **views** or **routes**. They are just parts of the project.* 