# Angular MongoDb Starter

Use Angular and MongoDb in a single express project.

## Step One

    express Week04-AngularMongoStart
    cd Week04-AngularMongoStart
    npm install
    bower init

Create a .bowerrc:

    {
      "directory": "public/components"
    }

Add the following bower packages:

    bower install angular --save
    bower install angular-mocks --save
    bower install angular-resource --save
    bower install bootstrap --save
    bower install jquery --save

Use **nodemon** and start on port 30025\. In **routes/index.js** set the title to **AngularMongoDbStarter**.

## Step Two

Link in angular and bootstrap. In **layout.jade**:

        // Latest compiled and minified CSS
        link(rel='stylesheet', href='components/bootstrap/dist/css/bootstrap.min.css')
        // Optional theme
        link(rel='stylesheet', href='components/bootstrap/dist/css/bootstrap-theme.min.css')
        // JavaScript
        script(src='components/jquery/dist/jquery.js')
        script(src='components/bootstrap/dist/js/bootstrap.min.js')
        script(src='components/angular/angular.js')
        script(src='components/angular-resource/angular-resource.js')

    body(ng-app='elvenApp')

## Step Three

Put the data in the database

*   Create an account on MongoLab
    *   Your account credentials are not going to be your database credentials
*   Create a database called prog219-lastname
    *   Amazon | Single Node | Sandbox | Free
*   Create a user by clicking on the database
    *   Create a username and password and give yourself read write
*   Create a collection called **scientists**
    *   Add a document
*   Go back to database page and get your URI
    *   mongodb://<dbuser>:<dbpassword>@ds031832.mongolab.com:31832/prog219-calvert</dbpassword></dbuser>

Your document:

    {
        "firstName": "Marie",
        "lastName": "Curie",
        "city": "Paris",
        "country": "France",
        "subject": "radiation"
    }

## Step Four

Add this to the bottom of index.jade:

      #monogoData(ng-controller='MyController')
        p This project retrieves data from a Mongo DB Server.
        button(ng-click='loadPresidents()') Load President Data
        br
        .inputDiv
          p Rows in DB: {{presidentsLength}}
          ul
            li(ng-repeat='president in presidents')
              p
                | {{president.getPresidentName()}}
                br
                |                                    TermStart: {{president.getTermStart()}}
                br
                |                                    TermEnd: {{president.getTermEnd()}}
          div(ng-bind-html-unsafe='hint')
        .inputDiv
          input(type='text', ng-model='firstName')
          input(type='text', ng-model='lastName', placeholder='termStart')
          input(type='text', ng-model='subject', placeholder='termEnd')
          button(ng-click='newPresident()') Add President
          hr
          input(type='number', ng-change='indexChange()', ng-model='indexOfItemToDelete', min='0', max='{{presidentsLength-1}}')
          button(ng-click='deleteRow()') Delete
          button(ng-click='updateRow()') Update
          p {{selectedIndex}}

## Step Four

Create the angular modules that will query and display the database.

    /**
     * Created by charlie on 4/29/2015.
     */

    angular.module('pres', ['ngResource'])
        .constant('CONFIG', {
            DB_NAME: 'prog219-lastname',
            COLLECTION: 'scientists',
            API_KEY: '<YOUR_KEY>'
        })
        .factory('scientists', function ($resource, CONFIG) {
            console.log('Scientists factory called');
            var scientists = $resource(
                'https://api.mongolab.com/api/1/databases/' + CONFIG.DB_NAME +
                '/collections/' + CONFIG.COLLECTION + '/:id', {
                    apiKey: CONFIG.API_KEY
                },
                {
                    update: {method: 'PUT'}
                });

            scientists.prototype.getFirstName = function () {
                return this.firstName;
            };

            scientists.prototype.getLastName = function () {
                return this.lastName;
            };

            scientists.prototype.getSubject = function () {
                return this.subject;
            };

            return scientists;
        });

and in mongodb:

    angular.module('elvenApp', ['pres'])
        .controller('MyController', function($scope, $http, scientists) {
            $scope.hint = "<p>Start with <strong>node server.js</strong> to retrieve JSON from Server</p>";

            $scope.loadPresidents = function() {
                $scope.scientists = scientists.query({}, function(scientists) {
                    $scope.presidentsLength = scientists.length;
                    $scope.firstName = scientists[0].firstName;
                    $scope.lastName = scientists[0].lastName;
                    console.log(scientists[0].firstName);
                    console.log(scientists[0].lastName);
                    console.log(scientists[0].getFirstName());
                });
            };
        });

And then add to **layout.jade**:

    script(src='javascripts/resources.js')
    script(src='javascripts/control.js')

Your api key is on your Account page.