## Overview

The goal of **Ec2 Run Elven Site** is to get your most recent version of our ElvenSite program running on EC2. This should include support for [bootswatch][btsw].

After clicking walk, I should be able to go to local host and see the pages it produced, such as master list.

For help moving your Apache based CSS, JavaScript and images back and forth between your work machine and EC2, see this assignment, and particularly the **ApacheHelper** scripts near the end:

- [ApacheHtml][ahtml]
- [ApacheHelper Scripts Section][ahah]

You probably need to do this before you do much else:

```
sudo apt-get install build-essential
```

In **package.json**, we should now include **phantomjs-prebuilt** instead of **phantomjs**. Read more:

- [here][phjs00]
- [here][phjs01]
- [here][phjs02]

[phjs00]: https://www.npmjs.com/package/phantomjs-prebuilt
[phjs01]: https://github.com/gruntjs/grunt-lib-phantomjs/issues/97
[phjs02]: https://github.com/Medium/phantomjs/issues/447

## Include Bootswatch

Please complete the simple [Elven Site Styles][ess] assignment before turning in this assignment. When using your _Elven Site_ web site creator on EC2 I want to be able to select the bootswatch theme for the created site.

## Turn it in

Submit a screen shot of your elastic IP pointing at your running app. Or, if you have upstart working, a link to your running app. At minimum, I expect to be able to click on links and go to your IP address (sans port) to see your newly styled pages. So, any two of the following will fulfill the requirements:

- Screen shot of your app running on EC2 as it appears after you click the walk button.
- Link to your running app on EC2
- Link to a page your created with your app. This URL has no port number (30025), it just points at a page you created that is accessible through the Apache Server on the default Port 80.

[ahtml]: http://www.ccalvert.net/books/CloudNotes/Assignments/ApacheHtml.html
[ahah]: http://www.ccalvert.net/books/CloudNotes/Assignments/ApacheHtml.html#apache-helpers
[ess]: http://www.ccalvert.net/books/CloudNotes/Assignments/ElvenSiteStyles.html
[btsw]: https://bootswatch.com/
