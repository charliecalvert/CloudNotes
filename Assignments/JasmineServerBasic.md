## Jasmine Server Side {#jasmine-node}

We want to be able to run tests that test our code on the server side, not in the browser. We will use Jasmine to do this. For instructions on how to set Jasmine up for these kinds of tests, see the following two sections of the Jasmine document on Elvenware:

- [Jasmine Server](http://www.elvenware.com/charlie/development/web/UnitTests/Jasmine.html#jasmine-server)
- [Jasmine Reporter](http://www.elvenware.com/charlie/development/web/UnitTests/Jasmine.html#reporter)

## Assignment Repo

Get the assignment repo:

```
cd ~/Git
git clone http://github.com/charliecalvert/elven-assignments.git
```

Copy the **GetNumbers** and **ObjectBasicsJasmine** assignments to your repository. The destination folders should be called **Week02-GetNumbers** and **Week02-ObjectBasicsJasmine**.

<pre>
cd ~/Git/elven-assignments
cp -r GetNumbers ~/Git/progXXX-lastname-201X/Week02-GetNumbers
cp -r ObjectBasicsJasmine ~/Git/progXXX-lastname-201X/Week02-ObjectBasicsJasmine
</pre>

**NOTE**: _I will frequently spell out the commands for basic Linux operations like the copy commands shown above, particular early in the quarter. However, it really should be enough for me to just tell you what to do, rather than having to spell out the details of how to do it. In general, I'm not going to accept a typo on my part in code such as that shown above as an excuse for not completing an assignment on time._

## Number Tests

Get the GetNumbers tests to pass when you type either **jasmine** or **node jasmine-runner.js**. Begin by install the necessary libraries:

```
npm install
```

Then run the tests:

```
node jasmine-runner.js
```

When you succcessfully complete the operation, the output should look something like this:

```
$ node jasmine-runner.js
Spec started

  GetNumbers Jasmine intro tests
    ✓ proves true is true
    ✓ proves getNumbers is an object
    ✓ shows getNumbers has nine methods
    ✓ shows getOne returns one
    ✓ shows getTwo returns two
    ✓ shows getThree returns three
    ✓ shows getFour returns four
    ✓ shows getFive returns five
    ✓ shows getSix returns six
    ✓ shows getSeven returns seven
    ✓ shows getEight returns eight
    ✓ shows getNine returns nine

Executed 12 of 12 specs SUCCESS in 0.007 sec.
```

Before you turn in your work, make sure all your code is clean by running **grunt check**:

```
$ grunt check
Running "jsbeautifier:files" (jsbeautifier) task
Beautified 5 files, changed 0 files...OK

Running "jscs:src" (jscs) task
>> 5 files without code style errors.

Running "jshint:files" (jshint) task
>> Report "result.xml" created.
```

If you get any errors when running **grunt check**, clean up your code before submitting the assignment.

## Object Tests

Complete the **ObjectBasicsJasmine** tests just as you did the **GetNumbers** tests. The output should looks like this:

```
$ node jasmine-runner.js
Spec started

  My Object Test Suites

    Object Basics with Require
      ✓ proves true is true
      ✓ proves that one is smaller than two
      ✓ proves myObject is an object
      ✓ shows myObject is not a function object
      ✓ shows myObject has three methods
      ✓ shows myObject has two numeric properties
      ✓ shows myObject has one string property

Executed 7 of 7 specs SUCCESS in 0.008 sec.
```

## Turn it in

Make sure all the tests pass and that none of the code in the test suites has changed.

Push.

When you submit the assignment, tell me the names of the folders in your repository where I can find your work, especially if you did not use the names specified above.

**NOTE**: _I don't want anyone to feel any pressure to use the names I provide for the folders you use. I should, however, warn you that if you do not, then Clause 231, subsection 23, subparagraph 18 of the standard Bellevue College Agreement that you signed when you entered the college will be activated. This is the clause that involves the three to five year trip to Antarctica in search of the famous but highly elusive Antarctic Python. Food will be supplied, or at least tools with which you can procure food will be provided, but it is suggested that you dress warmly, and due to Climate Change, that you bring plenty of waterproof clothing in case the Ross Ice Shelf breaks up while you are crossing it._
