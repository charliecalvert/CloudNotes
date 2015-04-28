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

Finally, let's add in HTML5 Canvas directives.

## Some Code

And in the controller itself:

```
   $scope.marie = {
        firstName: 'Marie',
        lastName: 'Curie',
        city: 'Paris',
        country: 'France'
    };
```    


And add in the same about.js file, but near the bottom, after the controller:


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




## Tips

Create a short cut that opens command line and runs DosAlias.bat:

	C:\Windows\system32\cmd.exe /k %USERPROFILE%\Bin\DosAlias.bat
