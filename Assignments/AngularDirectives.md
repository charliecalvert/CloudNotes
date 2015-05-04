# Angular Directives

This is a very sketchy outline of an in-class assignment. Details to follow. Don't forget to refresh this page when looking for updates.

## Step 01

Create with **angular yo**:

Go to your repository.

	mkdir Week04-AngularDirectives
	cd Week04-AngularDirectives
	yo angular

Then:

    grunt serve
    grunt test

Then add in **bar** directive. Then **marie**.

## Step 02

Let's add into **about.html** some HTML5 directives:

```
<div elf-marie></div>

<div>
   <elf-marie></elf-marie>
</div>
```

The first example above is our preferred technique, using the directive as an attribute of an HTML element. However, as the second example shows, it is also legal to use it as a tag. There are additional ways to use the directive not covered in this example, but mentioned earlier in this slide deck.

## Some Code

In **about.js**, in the controller itself, we can put our model:

```
   $scope.marie = {
        firstName: 'Marie',
        lastName: 'Curie',
        city: 'Paris',
        country: 'France'
    };
```    


Also in the **about.js** file, but near the bottom, after the controller, add in our directives:


```
app.directive('elfMarie', function() {
    return {
        template: 'First: {{marie.firstName}} ' +
            '<br>Last: {{marie.lastName}}' +
            '<br>City: {{marie.city}}'

    };
});

app.directive('bar', function() {
    return {
        link: function() {
            console.log('bar')
        }
    };
});
```

Note how these directive can be attached to our HTML as shown in the previous section. Finding a way to make the **bar** directive display output in the **console** window of your browser is left as an exercise, though we did demonstrate how to use it in class on Monday.

