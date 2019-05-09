## Overview

- Show Material-ui Menu for Standard Prog272 Express App
  - MaterialUiMenu
- Show Material-ui Menu for Create React App
  - MaterialUiMenuSPA
- Show Address Display
  - Week06 Show Address
- Add menu and Firebase login
  - week03-rest-basics


## Data

*   httpBackend in these slides: <span id="docs-internal-guid-f0a54871-71f6-753e-1a9a-9686e658e5d7"><span>[http://bit.ly/unittestasync](http://bit.ly/unittestasync)</span></span>
*   <span><span>Antipatterns in these slides: <span id="docs-internal-guid-fa214d7b-748a-993c-e242-0f1263a3fb8c"><span>[http://bit.ly/elfunit](http://bit.ly/elfunit)</span></span></span></span>
*   <span>Module Dependencies: [http://bit.ly/angular-mod](http://bit.ly/angular-mod)</span>
*   [Refactor Angular Test Project Modules In Class](/teach/assignments/AngularTestsInClass.html)
*   [Midterm](/teach/assignments/Isit322Midterm2015.html)
*   [Vision](/teach/isit322/Vision.html)

## Add Chai to Karma

In bower.json, add chai, probably by typing **bower install chai --save-dev.** I'm include angular mocks and scenario for context, but you only need to add chai:

<pre><span>"devDependencies"</span>: {  
  <span>"angular-mocks"</span>: <span>"~1.3.0"</span>,  
  <span>"angular-scenario"</span>: <span>"~1.3.0"</span>,  
  <span>"chai"</span>: <span>"~1.10.0"  
</span></pre>

In karma.conf.js add chai. I'm including jquery only for context. It is not needed for chaI:

<pre><span>files</span>: [  
  <span>'bower_components/jquery/dist/jquery.js'</span>,  
  <span>'bower_components/chai/chai.js'</span>,</pre>

And in your test:

<pre>describe(<span>'Controller: StatePop'</span>, <span>function</span> () {  

  <span>var</span> <span>expect</span> = <span>chai</span>.<span>expect</span>;</pre>

## Spec Reporter

This is the tool that gives us fancy output when we run our tests. Like having the browser, but at the command line.

To get started:

<pre>npm install karma-spec-reporter --save-dev</pre>

In karma.conf.js add a **reporters** property. I include **exclude** and **port** for context and to help you find where to insert it. (Of course, within reason, it doesn't really matter where you put it, but for consistency then):

<pre><span>exclude</span>: [],  

<span>reporters</span>: [<span>'spec'</span>],  

<span>// web server port  
</span><span>port</span>: <span>8080</span>,</pre>

We need to reference it also in the plugins section near the bottom of **karma.conf.js.** I've included phantomjs, chrome and jasmine for context, but all you should have to add is **karma-spec-reporter**:

<pre><span>plugins</span>: [  
  <span>'karma-phantomjs-launcher'</span>,  
  <span>'karma-chrome-launcher'</span>,  
  <span>'karma-jasmine'</span>,  
  <span>'karma-spec-reporter'  
</span>],</pre>
