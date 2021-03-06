## Description

Information on using Mocha and Chai.

## Chai

Start by adding [chai](http://chaijs.com/) to **test/bower.json**:

	bower install chai --save

Add this to **index.html**.

```
<script src="bower_components/chai/chai.js"></script>
```

Modify **test.js** so that it looks, in its entirety, like this:

```
(function() {
    'use strict';

    var expect = chai.expect;

    describe('Integration Tests', function() {

        it('should prove we loaded chai', function() {
            expect(true).to.equal(true);
        });

    });
})();
```

Notice that:

- We use strict
- We use **chai expect**
- We removed one **describe** suite
- We changed the descriptions of the suites and tests
- We added an expectation to our test