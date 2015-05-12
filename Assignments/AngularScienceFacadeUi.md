AngularScienceFacadeUi


```
    app.directive('elfMarie', function(ScienceFacade) {
        myController.marie = ScienceFacade.getTopic('Marie')[0];
        return {
            controller: 'MyController',
            controllerAs: 'myController',
            template:
            'First: {{myController.marie.firstName}} ' +
            '<br>Last: {{myController.marie.lastName}}' +
            '<br>City: {{myController.marie.subject}}'

        };
    });
```