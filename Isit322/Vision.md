## Overview

**NOTE**: _This file was last updated in 2015. Much has changed since then. I keep it just because it might form a template for an updated version of this information._

For the IDE, I think we are using WebStorm. If we find it helpful to use Android Studio instead when working with Cordova, then it is worth mentioning that they are both
made by JetBrains, and by and large work the same way.

I prefer using mocha, but it seems that yeoman has pulled us back toward jasmine due to the code they generate for our projects. Also, there has been a long marriage between Jasmine and Angular.

Fortunately, the syntax for mocha and jasmine is not just similar, but identical, at least in most cases. I want us to use chai for assertions in our tests because chai is flexible and works with both jasmine and mocha. It provides a single way to write assertions on both testing platforms. Karma works with either Jasmine or Mocha, and complements them rather than representing an alternative technology.

I keep wanting to play with Selenium, and came really close to doing so in Prog272, and then pulled back at the last minute and ended up creating integration tests using the same technique that jasmine uses here:

*   [http://jasmine.github.io/1.3/introduction.html](http://jasmine.github.io/1.3/introduction.html)

If you look at the bottom of that page you can see that they whole page is actually unit tested live on their site. Actually not a unit test, but an integration test.

Finally, lets move away from the tests and talk about the architecture for our apps. I want us to create an app that has:

*   Angular (integrated with bootstrap)
*   Google Charts
*   Yeoman with its integration of grunt, npm, bower and jasmine/mocha and HTML5 boilerplate
*   A programmable web service, such as the Census API.
*   And present it as either a web app or as Cordova

Except for Cordova, that is what we see in both the AngularChartOrganic and AngularChartCensus assignments. If you look at the second screen shot in AngularChartCensus, you will see that it combines all the elements described above except for Cordova. But you can combine Angular and Cordova, as demonstrated in this Yeoman generator.

To sum up, we are working from two different ends:

*   Testing with jasmine, mocha and chai
*   Creating apps with angular, yeoman, bootstrap and Google charts

This is the platform that we want to use in this class. As always, I could have done a much better job of presenting this during my lectures, but I feel the solution ultimately is a good one. Not perfect, but good enough.

* * *

Let's step away from the particulars and talk theory for a bit. The Microsoft (and my old Borland) worlds had a big advantage:

*   They presented the developer with a single unified solution. For instance: VisualStudio, .NET and C#.

They also had disadvantages:

*   They locked you into their single solution. If you wanted to use another IDE, you were going to give up a lot. If you wanted to switch platform, forget it, you were locked into Windows and .NET. But you could move between C#, Basic and F# with amazing fluidity. In that regard, they scored. (They are currently furiously back pedaling and trying to break out of their single platform, but that horse escaped from the barn long ago, at least in the eyes of most developers. Everyone else saw the problem five, ten even fifteenb years ago. They were the last to get on board, and still they are much less flexible than they want us to think.)
*   They had trouble advancing their strategy. They got locked into it, and could not see how to move it forward, how to innovate.

The open source community, had no such problem. They could:

*   Innovate radically by plugging in new pieces into their broad standards. In a matter of ten years the completely revised web apps and turned not just the development world, but the financial and cultural worlds upside down in the process. They innovated like crazy on their open standard HTML, scripting and web server platforms, and the results were spectacular.
*   They could also stay fluid and open by not locking you into a single solution. They played to the standard, not to the technology. You picked the IDE or editor you preferred, you could switch platforms from Apache to Node, from Python to PHP, from Java to Mono. There are, for instance, may JavaScripts frameworks, not just one blessed framework.

Their problem, however, was that:

*   They could not present the user with a single solution. They pulled pieces in from all over, which is confusing, as you point out.

Now, hopefully, you can see one of the reasons I have focused on Angular: it provides, to some degree, a single solution by encapsulating the following technologies:

*   RequireJs and the modular pattern
*   jQuery
*   The Factory and MVC pattern
*   Templating libraries
*   Jasmine/Mocha testing

I'm probably leaving some important technologies out, but the point is that Angular helps resolve the problem that you are pointing out. We still need Google charts, but it is not that big a jump.

By adding in Yeoman, we are also given ready made solutions for how to combine technologies such as Angular, Bootstrap and Jasmine. We type yo angular, and we are given a single solution that integrates all these tools. It is a huge help, at least for me.

As John has pointed out, we give up some things by using Angular, but I think the advantages outweigh the drawbacks.

We don't like Angular because:

*   It is opinionated. Rather than let us pick our libraries, it picks them for us. It also decides which patterns are important, and how we should implement them.
*   It, to some degree, locks us into a single solution. Once we have committed to Angular, it is hard to pull back until we move on to the next app.

Those are the drawbacks. But we like Angular, because it combines

*   Jasmine tests with their front end. Jasmine and Angular were linked from the beginning.
*   It brings lots of technologies such as jQuery, templates and RequireJs together into a single platform. It integrates them for us in a clean, well designed architecture.
*   It teaches us a lot about how to design apps. It uses good patterns (MVC and Factories) and it promotes best practices such as loose coupling and unit testing.

Overall, I think Angular is a win for us. But I will continue to switch back and forth between Angular and other solutions quarter by quarter to help us see that Angular is more an arrow pointing toward how to build apps rather than a single solution that we should all adopt.

Yes, there are problems inherent in open source solutions that force us to confront problems like this. It is a rough and tumble world, but oh my gosh, right now it is working very well indeed.
