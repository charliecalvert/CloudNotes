## Overview

Look at [directive template names][dir-names] slide.

[dir-names]: https://docs.google.com/presentation/d/1QHZunZfwAQIplala60HkLaGYaRGzJ5eO4oKIg_S1iyk/edit#slide=id.g9ad18c47f_0_91

## Git Branch

Create a new branch and check it out:

<pre>
git branch week05
git checkout week05
</pre>

Modify the readme:

  geany README.md &

We should add text like this:

<pre>
  ## Week 05 Branch

  - [Angular Solar Starter Assignment][solar-start]

  [solar-start]: http://www.ccalvert.net/books/CloudNotes/Assignments/AngularSolarStarter.html
</pre>

Now check it in and bush it on the new branch and then push that branch to your BitBucket or GitHub repository:

<pre>
git status
git add README.md
git commit -m "Week05 Read me"
git push --set-upstream origin week05
</pre>

**NOTE**: _Your branch in the cloud is the **origin** in our case. When we talk about the origin, we are referring to our repository on BitBucket or GitHub. The origin doesn't have to be in the cloud or on those sites, but it is in our case._

Take a look at the new branch's metadata:

<pre>
git branch -a
</pre>

Now switch back to master and merge in your changes:

<pre>
git checkout master
git merge week05
</pre>

It might looks something like this as we merge the **week05** README with the **master** README:

<pre>
git merge week05
Updating d0aee52..7ae1b47
Fast-forward
README.md | 9 +++++++++
1 file changed, 9 insertions(+)
</pre>

## Week 06 Branch

Now create a week06 branch and modify the readme as we did in week05:

<pre>
git branch week06
git checkout week06
geany README.md &
</pre>

The changes might look like this:

<pre>
  ## Week 06 Branch

  - [Angular Solar Starter Tests Assignment][solar-start-test]
</pre>

Check the status:

<pre>
git status
git branch -a
</pre>

Add in your changes, commit and push your new branch to the cloud (BitBucket/GitHub):

<pre>
git add .
git commit -m "Week06 Readme"
git push --set-upstream origin week06
</pre>

## Merge Week06 into Master

Now we merge in our changes to the master branch:

<pre>
git checkout master
git merge week06
</pre>

**NOTE**: _We don't necessarily have to merge our changes back into master every day. You should merge them, however, before we go on to week 07. The point being that master ends up contains our latest while our branches show our status at the end of each week. This is not the only thing you can do with branches, nor is it even a common strategy, but it fits our goals in this class. In other words, its nice in this class to have a handy record of where we are at the end of each week. But other teams would do very different things with branches. One of our goals, of course, is simply to be sure we understand how to use git branches. The exact way we use them is not important._

Now check the status, and go back to **week06** where we will do our work this week:

<pre>
git branch -a
git checkout week06
</pre>

## HttpBackend

We use the Angular $httpBackend object from the **angular-mocks** to allow us to mock the loading of JSON from the server.

**NOTE**: _Angular mocks and httpBackend do much more than just allow us to mock loading JSON, but lets start there, and move on to mocking whole objects a bit later on._

For more on httpbackend, see the

- The last few slides here: [http://bit.ly/unittestasync](http://bit.ly/unittestasync)
- [Elvenware on httpBackend][elf-http-backend]

Start by creating a test called **spec/test-mocks.js**:

```javascripts
describe('Elvenware Simple Plain Suite', function() {

    'use strict';

    fit('proves we can run tests', function() {
       expect(true).toBe(true);
    });
});
```

Now angularize it by loading the mainController, this time adding code to load $httpBackend:

```javascripts
describe('Elvenware Simple Plain Suite', function() {

    'use strict';

    var $httpBackend, scope, mainController;

    // Set up the module
    beforeEach(module('elfApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _$controller_) {
        scope = _$rootScope_.$new();
        var $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        mainController = _$controller_('MainController', {
            $scope: scope
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('proves we can run tests', function() {
       expect(true).toBe(true);
    });

    it('should find the index', function() {
      expect(scope.index).toBe(0);
    });

});
```

Notice that we also have an **afterEach** section. This ensures that there are no pending http request after our tests. In particular, we are going to use $httpBackend to mock the act of loading JSON. In particular, we will write code that ensures that calls to $http.get actually call our method, rather than making a request to a server. The **afterEach** method tests that we actually called these mocks, rather than leave them hanging. This helps us ensure that we are doing what we set out to do, and that the next test starts with a clean slate.

You might also want temporarily add a test from our **test-basic** file that ensures we can access the scope. You can delete this test later if you want, it is just a sanity check.

[elf-http-backend]: http://www.elvenware.com/charlie/development/web/JavaScript/Angular.html#mocking-objects-with-httpbackend

## Mocking JSON Requests

Here is a test that actually mocks the **$http.get** call in our **getRenewable** method. This method, as you know,   retrieves data from the server. Only this time, instead of getting data from a real server, we put in our own mock data instead:

```javascript
it('proves we can mock getting JSON data', function() {

  var renewable = [{
      "Year": "2017",
      "Solar (quadrillion Btu)": "0.8045307",
      "Geothermal (quadrillion Btu)": "0.2349284",
      "Other biomass (quadrillion Btu)": "0.50916",
      "Wind power (quadrillion Btu)": "2.202328",
      "Liquid biofuels (quadrillion Btu)": "1.2329197",
      "Wood biomass (quadrillion Btu)": "1.9860924",
      "Hydropower (quadrillion Btu)": "2.5859957"
  }];

  // Define what happens when $http.get() is called.
  var requestHandler = $httpBackend
      .when('GET', 'data/Renewable.json')
      .respond(renewable);

  $httpBackend.expectGET('data/Renewable.json');
  scope.getRenewable();
  $httpBackend.flush();
  expect(scope.renewable[0].Year).toEqual('2017');

});
```
