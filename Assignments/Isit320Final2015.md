## Overview

This document describes the steps needed to complete the Final for Isit 320 in 2015.

## Goals

- Complete as many of the unit tests as you can for the HyperExplore project
- Complete, as best you can, the interface for the HyperExplore project
- Use UpStart or systemd to get your final running on EC2, on port 30025

More unit tests may show up during the weekend, so check back to see if there have been updates. The updates are available in the $$ELF_TEMPLATES/

## Turn it in

Check your work into your repository keeping your work in the WeekXX-HyperExplorer folder, or tell me clearly which folder it is in.

When submitting the final, give me the [Elastic IP address][elasticip] of instance running on EC2. You should submit a link to your running project in this format:

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

Also, super optional, and for extra credit:

```javascript
'spec/charlie-test*.js',
```

Perhaps like this:

```javascript
files: [
    // CODE OMITTED HERE
    'spec/test*.js',
    'spec/opt-test*.js',
    'spec/charlie-test*.js',
    'spec/data/*.js',
    'spec/**/*.html'
],
```
When included these tests in my project, I had, as of Dec 10, about 153 total tests.

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

## Exclude Data Folder from JSCS

My configuration object for JSCS in **Gruntfile.js** looks like this:

```
jscs: {
    src: ['**/*.js', '!spec/data/*.js'],
    options: {
        config: '.jscsrc'
    }
},
```

The second rule in the **src** array excludes the following files from **spec/data** directory, that we did not create, from our JSCS tests:

- bitly-links.js
- delicious-javascript-links.js
- tweets.js
- tweets-timeline.js

Sometimes these files follow JSON syntax, which uses double quotes, while our JSCS rule says that we want to use single quotes. Since we did not really create the content for these files, and since we want to use their data exactly as it was sent to use by our web services, we should not edit them. The best solution I could see was just to exclude them from our JSCS tests. That way we could keep the data sent to us by delicious, twitter and bitly exactly as we got it without needing to change the rules for the rest of our code.

## Changes

I made some last minute changes on Thursday, Dec 10 in the AM

I've made yet one more change to [elfDownloads.dataTypeSelection][data-type].

[data-type]: http://www.ccalvert.net/books/CloudNotes/Comments/HyperExplorerComments.html#datatypeselection 

This change, which simplifies our code, does require a change to the last test in **test-downloads.js**, since we are now calling **elfDownloads.getLinkData** from inside the bitly options and not calling it at the end of the method. This is at least a somewhat cleaner design. The changed test:

```javascript
it('shows that we don\'t call to get more links on last line of radio button select', function() {
        spyOn(elfDownloads, 'getLinkData');
        elfDownloads.dataTypeSelection();
        expect(elfDownloads.getLinkData).not.toHaveBeenCalled();
});
```

Notice that we now call **not.toHaveBeenCalled**.

**NOTE**: *My recent changes to **dataTypeSelection** broke the old version of the test shown above. Therefore, you probably want to copy over the new versions of tests:*

```
meld spec/ $ELF_TEMPLATES/UnitTest/HyperExplorer/
```

Or, possibly copy them all over, with copy set to interactive mode. (Just remove the -i if you don't want to be prompted before each file is replaced):

```
cp -i $ELF_TEMPLATES/UnitTest/HyperExplorer/*.js spec/.
```

## ShowRecord

I noticed a few folks were still having trouble with matching the names in bitly.jade to the ID's used in **elfDisplay.showRecord**. As a result, I have written a new, optional set of unit tests called **opt-test-bitly-show-record.js**.

I also moved one test out of **test-interface.js** and put it in **opt-test-bitly-show-record.js**. I made the move because the test was similar to whole series of tests that I created in **opt-test-bitly-show-record.js**. These tests simply check for the existence of an input control with a specific ID. These changes mean that you now have to use the same ID's I use for your input controls if you want the optional tests to pass, but it is, I hope, a small price to pay for helping people to get this part of their code to work.

With all the required and optional unit tests, including those in **charlie-test-delicious-analysis.js**, we now have 153 tests.

## Delicous Uitls

See [here][dutil].

[dutil]: http://www.ccalvert.net/books/CloudNotes/Assignments/HyperlinkExplorer.html#delicious-utils