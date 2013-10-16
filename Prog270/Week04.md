Week 04
=======

General
-------

Our goals this week:

- Tools: Become more comfortable with GitHub and Cloud 9 and markdown editors.
- CSS: Learn what CSS is, and how to link a stylesheet into an HTML file
- Media Queries: Learn about media queries and how to use them to adabt to mobile platforms

InClass
-------

- [Our Deck](http://bit.ly/17GSF8W)
- [Discussion](https://bc.instructure.com/courses/834458/discussion_topics/1738776/)
- [HTML file Structure on Elvenware](http://elvenware.com/charlie/development/web/HtmlGuide/GettingStarted.html#theStructureOfAnHTMLDocument)
- [CSS Basics on Elvenware](http://elvenware.com/charlie/development/web/CssGuide/BasicSyntax.html#top)
- [MediaQueries on Elvenware](http://elvenware.com/charlie/development/web/CssGuide/MediaQueries.html)
- [Useful MediaQuery Link](http://css-tricks.com/css-media-queries/)

Online
----

Here is where I will place assignments you should complete outside
of class time.

Here is an example of how to combine three different "looks" for 
a page in a single CSS file. The appearance of the page changes
as you resize the browser:

```
/* Default */
body {
	background-color: #0088FF;
	color: #FFFFFF;
}

/* Medium */
@media screen and (max-width: 1024px) {
	body {
		background-color: #00FF00;
		color: #006600;
	}
}

/* Small */
@media screen and (max-width: 520px) {
	body {
		background-color: #FF0000;
		color: #440000;
	}
}	
```

- [Download the complete example](https://bc.instructure.com/courses/834458/files/30380635/download?wrap=1)




