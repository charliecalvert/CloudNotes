## Overview

This document describes the steps needed to complete the Final for Isit 320 in 2015.

## Goals

- Complete as many of the unit tests as you can for the HyperExplore project
- Complete, as best you can, the interface for the HyperExplore project
- Use UpStart or systemd to get your final running on EC2, on port 30025

More unit tests may show up during the weekend, so check back to see if there have been updates. The updates are available in the $$ELF_TEMPLATES/

## Turn it in

Check your work into your repository. When submitting the final, give me the [Elastic IP address][elasticip] of instance running on EC2. You should submit a link to your running project in this format:

- http://<YOUR ELASTIC IP>:30025

Your project should remain running on EC2 until midnight on Monday, December 14 or until I:

- Return your final and
- Assign you a final grade

If you get a final grade before Monday, December 14, you can turn off your instance on EC2 at that time, if that is what you want to do.

[elasticip]:http://www.elvenware.com/charlie/development/cloud/WebServices.html#elastic

## NOTES

Below you will a few notes and hints

## Graphics

At least one portion of your final should provide support for displaying graphics if they are available. Pick whichever set of links you prefer:

- Delicious
- Bitly
- Twitter

## Detail Delicious

Here is the **elfDelicious.detailDelicious** method:

```javascript
detailDelicious: function(index) {
    'use strict';
    $('#deliciousDetails').html(JSON.stringify(elfDelicious.deliciousLinks[index], null, 4));
},
```

## Grunt Check

Be sure that **grunt-check** passes. By this time, most of the errors returned from **grunt jscs** are probably pretty trivial, but be sure that you code is clean before turning it in.

## Elastic IP

Be sure that you create, properly associate and submit an **Elastic IP** for your instance running on EC2. In order to confirm that your project is running on EC2, I must be able to reach it, and I can't do that if you only have a **Public IP**. The **Public IP** addresses automatically associated with your instance on EC2 is not necessarily permanent. To create a permenant IP address, you need an **Elastic IP**, as explained [here][elasticip].

**NOTE**: *Once you create an Elastic IP address, your Elastic IP and Public IP address are usually the same. At that point, your Public IP address should be permanent, but only because you have created an Elastic IP address and associated it with your instance.*

[elasticip]:http://www.elvenware.com/charlie/development/cloud/WebServices.html#elastic

## Unit Test Count

On Saturday, during the extra help session, we copied over a number of new tests and confirmed that students could get them working. Right now there should be some 100+ tests. (I have a few more that I never copied out, making my total 119, but I think yours could be closer to 110.)

It is not necessary to get all these to pass, but it would be nice if you could have most of them passing. If you are having trouble getting a test to pass, please ask about it in the discussion area. I will try to be very liberal in offering help to fix tests at this point. Of course, the close you get to the due date of the final, the less likely it will be that you will get an answer to your question in time.

Here is the command to compare the work in your folder to the work in the **JsObjects**. Issue the command from the root of your HyperExplorer project:

	meld spec/ $ELF_TEMPLATES/UnitTest/HyperExplorer/

Or, if you are on Cloud 9:

	diff spec/ $ELF_TEMPLATES/UnitTest/HyperExplorer/

## Optional Tests

Most tests begin with **test-**. To include them, put this in the files object found in **karma.conf.js**:

```javascript
'spec/test*.js',
```

Some tests are optional (extra credit) and begin with **opt**. These are mostly twitter tests, which were added so late in the quarter that I did not want to insist that you include them in the final. Instead I made them optional. These tests begin with **spec/opt-test-**. To include them, write the following in the **files** object found in **karma.conf.js** :

```javascript
'spec/opt-test*.js',
```

When included these tests in my project, I had about 126 total tests.

## Test Directories

This section can now also be found in the **BitlyRefine** assignment.

In **$ELF_TEMPLATES/UnitTest/HyperExplorer** there are two directories called **data** and **fixtures**. Your data directory should hold files like:

- bitly-links.js
- delicious-javascript-links.js
- tweets.js
- tweets-timeline.js

There is also a fixture directory. Your fixture directory should hold files like this:

- bitly.html
- delicious.html
- fixture.html
- test-local-cloud.html
- twitter.html

To create some of the fixture code, expand the code in the files directory for **karma.conf.js**:

```javascript
jade: {
    compile: {
        options: {
            pretty: true,
            data: {
                debug: false
            }
        },
        files: {
            'spec/fixtures/delicious.html': ['views/delicious.jade', '$ELF_TEMPLATES/JadeMixins/*.jade'],
            'spec/fixtures/fixture.html': ['views/fixture.jade', '$ELF_TEMPLATES/JadeMixins/*.jade'],
            'spec/fixtures/twitter.html': ['views/twitter.jade', '$ELF_TEMPLATES/JadeMixins/*.jade']

        }
    }
},
```


