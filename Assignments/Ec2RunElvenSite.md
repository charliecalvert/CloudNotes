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

## Include Bootswatch

Please complete the simple [Elven Site Styles][ess] assignment before turning in this assignment. When using your _Elven Site_ web site creator on EC2 I want to be able to select the bootswatch theme for the created site.

## Turn it in

Submit your elastic IP pointing at your running app. I expect to be able to click on links and go to your IP address (sans port) to see your newly styled pages.

[ahtml]: http://www.ccalvert.net/books/CloudNotes/Assignments/ApacheHtml.html
[ahah]: http://www.ccalvert.net/books/CloudNotes/Assignments/ApacheHtml.html#apache-helpers
[ess]: http://www.ccalvert.net/books/CloudNotes/Assignments/ElvenSiteStyles.html
[btsw]: https://bootswatch.com/
