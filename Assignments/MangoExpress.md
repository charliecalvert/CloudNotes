## Description

Create a MangoExpress project on a subject of your choosing. This is simply the next step on the project we have been developing. At this stage you should be focusing mostly on:

- Picking a topic
- Integrating a few stray pieces of bootstrap

Don't over do it when building this project. We still have four or five weeks to bring this project to completion.

Hopefully this is reasonably complete, but -- as always -- come back and check for updates. 

## Step One

Copy your [AngularFacadeUi][afu] project into a new folder called Week06-MangoExpress. A command to accomplish this goal might look something like this:

    robocopy Week06-TestLive02 Week07-MangoExpress /MIR

Open your "new" project in WebStorm.

When you copy a project this way, you bring along the **.idea** folder. This means your new project will have the same name as your original project. To fix that, right click on the top node in the project pane, visible at the left of the WebStorm IDE. Change the project (not the directory) name to **MangoExpress**.

**NOTE**: *Though I wasn't intentionally following any plan, but just doing what seemed obvious, nevertheless the type of project we have been developing seems to now be known in the community as a Mean Stack project: MongoDb + Express + Angular = MEAn.  MangoExpress is just another way to combine portions of the words MongoDb, Express, and Angular into a single word.*

[afu]:http://www.ccalvert.net/books/CloudNotes/Assignments/AngularScienceFacadeUi.html


## Step Two 

Several steps here.

### Install Boostrap

Add in bootstrap.

    bower install jquery --save
    bower install bootstrap --save

### Link Bootstrap

Add bootstrap to **layout.jade**. First the CSS:

    link(rel="stylesheet", href="components/bootstrap/dist/css/bootstrap.css")
    link(rel="stylesheet", href="components/bootstrap/dist/css/bootstrap-theme.css")

Then the JavaScript:

    script(src="components/jquery/dist/jquery.js")
    script(src="components/bootstrap/dist/js/bootstrap.js")

Put your title inside a bootstrap Jumbotron:

    div.jumbotron
        h1= title
        p Welcome to #{title}

Turn your buttons into Bootstrap buttons. Before we added bootstrap, our buttons looked like this:

    button(ng-click='myController.loadScientists()') Load Scientists

To convert to bootstrap, add the **btn** and **btn-default** classes to your buttons:

    button(class="btn btn-default" ng-click='myController.loadScientists()') Load Scientists

Or, to be more in the spirit of Jade, write this:

    button.btn.btn-default(ng-click='myController.loadScientists()') Load Scientists

The two buttons might look like this:

<button>No Bootstrap</button>
<button class="btn btn-default">Bootstrap Default</button>

If you don't like the default look, you can try **btn-primary** instead:

    button.btn.btn-primary Bootstrap Primary

Like this:

<button class="btn btn-primary">Bootstrap Primary</button>

Other variations include **btn-success**, **btn-warning**, **btn-info**, and **btn-danger**:

<button class="btn btn-success">Bootstrap Success</button>
<button class="btn btn-warning">Bootstrap Warning</button>
<button class="btn btn-info">Bootstrap Info</button>
<button class="btn btn-danger">Bootstrap Danger</button>

Or, if you want to go hog-wild, you can make your buttons big with **btn-lg** and use a glyph icon:

    button.btn.btn-primary.btn-lg(ng-click='myController.loadScientists()')
      span.glyphicon.glyphicon-asterisk(aria-hidden='true')
      |  Load Scientists

Like this:

<button class="btn btn-primary btn-lg"><span aria-hidden="true" class="glyphicon glyphicon-asterisk"></span> Load Scientists</button>

**NOTE**: *When in doubt about how to translate HTML to jade, go to [html2jade.org][hj] and paste in the HTML that you want to use in your Jade code.*

There is [much more][boot] that we can do with bootstrap, but this is probably enough for now.

[boot]:http://getbootstrap.com/components/
[hj]:http://html2jade.org/

## Step Three

Pick a theme that you are interested in. It could be something technical like Angular development or HTML and CSS. It could be some subject you are interested in such as healthcare, literature, music or some field of science. It might be a hobby like hiking, sports, cooking or bike riding. It might even be something silly like -- well I'm too out of it to know know what is silly -- maybe look here for silly things that are trending:

    https://www.google.com/trends/topcharts

Convert the database from Scientists to your own subjects. Create your pages instead of **astronomy.jade** and **physics.jade**. For instance, if your subject is book authors then you have pages with names like **henry-james.jade** or **mark-twain.jade**. Or maybe you want to focus on books rather than authors, or authors and books, in which case you might need something like this:  **tom-sawyer.jade**. 

Make sure you are using your own database and not mine. Change field names and labels as appropriate. Continue to have a field that can be matched to the name of your associated **jade** document.

We'll probably work on this project a lot over the remainder of the quarter. Don't try to complete it this weekend. Just get started on it. Next week, this will probably become the midterm, with a few variations and additions. So you will have more time. This week, just focus on picking a topic, starting your database, and setting up two or three "proof of concept" documents. If you do too much work too fast, you might find it hard to make changes later, so go light...

In general, you should be thinking about creating a web site that you want to show off as a portfolio. We'll move all this stuff up into the cloud over time, maybe even over a short time. So consider choosing a topic that you would want to show to a potential employer. 

In reminding you about employers, I don't mean to push your toward technical subjects. In fact, most employers probably don't want to build a technical web site. So, especially if you want to be on the design end of things, a very different kind of site might look good to a potential employer. On the other hand, if you want to be a JavaScript developer, then maybe a technical theme would make sense -- but perhaps not. 

Most important, by far, is picking a theme that motivates you to get work done. Pick a subject that really interests you. 

I'm not easily offended, so I don't much care what you pick, but be careful about picking politics or religion. These are subjects that could make it hard for me or others to look at the site objectively. There might, however, be exceptions to these rules. For instance, if you are truly devout, and want to build a site on your faith, that might work out well. Or if you are interested in climate change, then that might make a good topic. "Here are some cool low impact energy solutions... etc". But a site on "why people I disagree with are jerks" or "not many folks agree with me so I'm opting for armed revolution" would likely be bad choices. When in doubt: try to be positive, and avoid going negative.

## Turn it in

Make sure your code is in the Week06-MangoExpress folder of your repository. Confirm that all your tests pass. Press the submit button and add comments as usual or as needed.


