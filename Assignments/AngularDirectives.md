---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AngularDirectives.md
relativePath: Assignments/AngularDirectives.md
title: AngularDirectives
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: AngularDirectives.md
fileNameHTML: AngularDirectives.html
---


<!-- toc -->
<!-- tocstop -->

# Angular Directives

This is a very sketchy outline of an in-class assignment. Details to follow. Don't forget to refresh this page when looking for updates.

## Step 01

Create with **CreateAllExpress** which automates much of our setup. This includes creating **conrol.js**, **Gruntfile.js** and **karma.conf.js**. It also adds in most of the **'use strict'** statements and sets up your tests.

The **CreateAllExpress** file should be in your **bin** directory. If it is not there, then run this:

<pre>
cd $ELF_UTILS/SetupLinuxBox
./CreateSymbolicLinks
</pre>

Go to your repository.

	CreateAllExpress Week04-AngularDirectiveTesting
	cd Week04-AngularDirectiveTesting
	npm install

Add support for angular:

	 bower install bootstrap angular angular-mocks --save

Then:

    grunt check
    grunt test

Also do this:

	npm install -g phantomjs-prebuilt

## Step 02

Let's add into **index.jade** some HTML5 directives. First, very simple:

<pre>
hr
bar
</pre>

This creates the following HTML:

```html
<hr>
<bar></bar>
```

## Step 02a

Add support for angular:

	 bower install angular angular-mocks --save

In **layout.jade**, load angular and declare an Angular **ng-app** directive:

	script(src="components/angular/angular.js")
	body(data-ng-app="elfApp")

In **control.js** create a controller code:

```javascript
var elfApp = angular.module('elfApp', []);

elfApp.controller('MainController', function($scope) {
    'use strict';
});
```

And a simple directive:

```javascript
elfApp.directive('bar', function() {
	'use strict';
	return {
		link: function() {
			console.log('bar');
		},
		template: '<p>bar</p>'
	};
});
```

Run the app and see the results, which should be the word **bar** in an HTML paragraph element.

## Step 02b

Now something a bit more interesting. Start with the jade in **index.jade**:

<pre>
hr
div(elf-marie='')
hr
div
	elf-marie
hr
elf-marie
</pre>

This Jade template produces the following HTML:

```html
<hr>
<div elf-marie></div>
<hr>
<div>
   <elf-marie></elf-marie>
</div>
<hr>
<elf-marie></elf-marie>
```

All three are legitimate ways to use an angular directive.

The third example above is our preferred technique, or perhaps the first, where we use the directive as an attribute of an HTML element. However, as the second example shows, there are many variations. There are additional ways to use the directive not covered in this example, but mentioned earlier in this slide deck.

## The Marie Code

In the controller itself, we can put our model:

```javascript
$scope.marie = {
    firstName: 'Marie',
    lastName: 'Curie',
    city: 'Paris',
    country: 'France'
};
```    

Also in the **control.js** file, near the bottom, after the controller, add in another directive:

```javascript
elfApp.directive('elfMarie', function() {
	  'use strict';
    return {
			  controller: 'MainController',
        template: 'First: {{marie.firstName}} ' +
            '<br>Last: {{marie.lastName}}' +
            '<br>City: {{marie.city}}'
    };
});
```

## Template vs TemplateUrl

The **elfMarie** directive above is relatively easy to read. It is not, however, typical of the kind of HTML we need to write. Consider this somewhat more realistic code:

```javascript
elfApp.directive('elfMarie', function() {
	'use strict';
  return {
    controller: 'MainController',
    template: '<p><span class="caption">First</span>: {{marie.firstName}}</p>' +
    '<p><span class="caption">Last</span>: {{marie.lastName}}</p>' +
    '<p><span class="caption">City</span>: {{marie.city}}</p>'
  };
});
```

We have added only a bit more complexity, and suddenly we are looking at chaos. For me, at least, inserting HTML into the midst of a JavaScript file creates cognitive dissonance. It makes my brain fog over.

The solution, of course, is to switch to a **templateUrl**, and load the template from our **views** folder. Here is **marie.jade**:

<pre>
div#marie
    p
        span.caption First
        | : {{marie.firstName}}
    p
        span.caption Last
        | : {{marie.lastName}}
    p
        span.caption City
        | : {{marie.city}}
</pre>

This Jade is none so lovely either, but it keeps our JavaScript clean:

```javascript
elfApp.directive('elfMarie', function() {
	  'use strict';
    return {
        controller: 'MainController',
        templateUrl: 'marie'
    };
});
```

Be sure to modify your **elfMarie** directive to match the code shown above.

Finally, insert code into **routes/index.js** that will allow us to response to requests for **marie** by converting **marie.jade** to **marie.html** and sending back the HTML via HTTP.

```javascript
router.get('/:id', function(req, res, nest) {
    'use strict';
    res.render(req.params.id, {
        title: ' Angular Directive Calvert'
    });
});
```

## Testing

In the **files** section of **karma.conf.js**, above **public/javascripts** and below **jasmine-jquery**:

```javascript
'public/components/angular/angular.js',
'public/components/angular-mocks/angular-mocks.js',
```

And install phantomjs globally:

```
npm install -g phantomjs-prebuilt
```

Make sure these are in **karma.conf.js**:

```
		preprocessors: {
				'**/*.html': []
		},
```

Now add code to **spec/test-basic.js** that will set things up so we can:

- Load the **elfApp** module from **control.js**
- Load the **MainController** from **control.js**
- Initialize **$compile** and **$templateCache** so we can convert angular templates into valid HTML

Here is the code for **test-basic**:

```javascript
describe('Elvenware Simple Plain Suite', function() {

    'use strict';

    var scope;
    var mainController;
    var $templateCache;
    var $compile;

    // Load the elfApp module from control.js with reference in layout.jade
    beforeEach(module('elfApp'));

    /*
     * instantiate the controller stand-alone, without the directive
     * We also get the Angular compiler and templateCache so we can process angular templates
     */
    beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_, _$controller_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        $templateCache = _$templateCache_;
        mainController = _$controller_('MainController', {
            $scope: scope
        });
    }));

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });
});
```

Now lets see if we can get our template to compile:

```javascript
it('tests scope variable access in template loaded through raw text', function() {
		$templateCache.put('marie',
				'<div id="marie">' +
				'   <p><span class="caption">First</span>: {{marie.firstName}}</p>' +
				'   <p><span class="caption">Last</span>: {{marie.lastName}}</p>' +
				'   <p><span class="caption">City</span>: {{marie.city}}</p>' +
				'</div>');

		var element = $compile('<elf-marie></elf-marie>')(scope);
		scope.$digest();

		// Check that the compiled element contains the templated content
		expect(element.text()).toContain('Paris');
});
```

The goal here is to get the expressions that reference marie.firstName, etc, to resolve the strings from our model in **control.js**. In other words, when we call **scope.$digest**, is **{{marie.firstName}}** replaced with **marie** and **{{marie.city}}** replaced with **Paris**. Our test checks for the latter case.

## Fixtures

Create the HTML for our test by running jade manually:

	jade views/marie.jade --out spec/fixtures/

**NOTE**: _If this call fails, try **npm install -g jade**. As you will see later, we can automate this process through grunt._

Then rendered HTML looks like this:

```html
<div id="marie">
    <p><span class="caption">First</span>: {{marie.firstName}}</p>
    <p><span class="caption">Last</span>: {{marie.lastName}}</p>
    <p><span class="caption">City</span>: {{marie.city}}</p>
</div>
```

Add the library that enables us to load HTML into our tests. This is called loading a fixture.

	npm uninstall grunt-exec --save-dev
	npm install jasmine-jquery --save-dev

Here is how to load the **marie.html** fixture in our test and check that it works:

```javascript
// Load marie.html so we can test against it
beforeEach(function() {
		jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
		loadFixtures('marie.html');
});

it('should be possible to access the marie fixture', function() {
		var spanElement = document.getElementById('marie');
		expect(spanElement).toBeDefined();
		expect(spanElement.innerHTML).toContain('First');
});
```

And then, finally, let's put it all together, loading our fixture and compiling the template:

```javascript
it('tests scope variable access in template loaded through fixture', function() {
		// Get element from fixture
		var el = document.getElementById('marie');
		$templateCache.put('marie', el);
		var element = $compile('<elf-marie></elf-marie>')(scope);
		scope.$digest();
		// Check that the compiled element contains the templated content
		expect(element.text()).toContain('Paris');
});
```

Note how these directive can be attached to our HTML as shown in the previous section.

## Turn it in

Push your work to your repository and submit the assignment. Leave a comment, particular if there is anything you think I should know.
