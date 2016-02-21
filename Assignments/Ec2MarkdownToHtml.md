## Overview

The goal of the EC2 Markdown to Html assignment is set up MakeHtml on our EC2 instances, and to learn a bit about:

- Working with bitmaps.
- Working CSS
- Viewing your pages on a mobile device

Part of the midterm will be to create a web site on EC2 using our Markdown to HTML technology. You will be able asked to choose a theme for your website, and the content that should appear on it.

When doing this assignment, you might consider focusing on some subject that you would like to explore on the midterm. For instance, if you want your midterm website to be about the Mars rover missions, then you might want to consider choosing bitmaps about that subject while working on this assignment. I mention this only as a heads up, there is no requirement, nor am I expecting, that you have a complete theme in this assignment. Nor am I asking you to pick any particular type of bitmap to display. I simply want to let you know where we are headed, so you can make informed choices.

You can and should pick a topic that interests you. If no idea comes to mind, then possible topics include:

- A resume
- Favorite Music
- Favorite Books
- Favorite Movies
- Hobbies
- Interests


Don't try to polish or make your site fancy at this stage. Just try to get it working.

## Update

MakeHtml has been updated. On Pristine Lubuntu, copy over the new version.

Begin the process by updating JsObjects:

```
jo
git pull
```

Rename your old version:

```
cd ~/Source
mv MakeHtml MakeHtml.old
```

Copy in the new version and run it to be sure it works:

```
cp -r $JSOBJECTS/JavaScript/NodeCode/MakeHtml .
cd MakeHtml
npm install
npm start
```

See this code in the config folder:

```
{
  "calvert": {
    "base-dir": "/home/bcuser/",
    "site-dirs": [
      "Documents/AllTest",
      "Documents/AllSite"
    ],
    "destination-dirs": [
      "/var/www/html/",
      "/home/bcuser/temp/test-site/"
    ]
  }
}
```

You can use this file to specify where to copy markdown files from, and where to copy HTML to. By default, the first item in each list will be used.

**NOTE**: *You may need to modify this file, and particularly the **base-dir** to fit your system.*

## Getting Started

While still on Pristine Lubuntu, follow the instructions in the [Lamp Markdown] assignment and create a site that you like on the Pristine Lubuntu Apache server. Copy your markdown files to your Git repository. Push them.

On EC2, pull your repository. Copy your files back out to a directory called **Documents/AllTest**:

```
mkdir ~/Documents
mkdir ~/Documents
cp -r AllTest ~/Documents/.
```

Don't forget to set up permissions on **/var/www/html**:

```
sudo chown -R ubuntu:ubuntu /var/www/html/
```

Set up the MakeHtml program on EC2. Run it. Access your website using your Elastic IP address.
Repeat the process of developing your site on Pristine Lubuntu, pushing it to your repository, and then pulling on EC2.

**NOTE**: *The point here is that an EC2 server instance does not make a good development machine. Do your development on Pristine Lubuntu, then use Git to transfer your files EC2, and to ultimately display the result in your web site.*

**NOTE**: *Some of you may be interested in setting up a domain name, rather than using a raw IP address. We will very likely do that, but later in the course.*

## Bitmaps

Go into and create three documents on any subject you like. Include at least one picture in each document. The pictures can come from anywhere. They need not be pictures you create. To help you get started, you can use the image icon at the top of *Remarkable*. Just paste in the URL of your picture. As a rule, you want to select smaller images so that they do not take up to much space on your page, but we will talk some about changing the size of a picture in the next section.

You can search for the images on the [Wiki Media Commons][wm-main]. These images are free to use and usually come without complex copyright issues.

**NOTE**: *It is important that you don't take images from sites at random. Many images on the web are copyrighted and require payment before they can be used on your site. We are constructing a public site, and we don't want to bring the "long arm of the law" down on you or Bellevue College.*

When looking on WikiMedia, there are two approaches. First, try one of these searches:

- [Featured Pictures](https://commons.wikimedia.org/wiki/Commons:Featured_pictures)
- [Quality Pictures](https://commons.wikimedia.org/wiki/Commons:Quality_images)
- [Valued Pictures](https://commons.wikimedia.org/wiki/Commons:Valued_images)

Alternatively, go to the [main page][wm-main] and use the search box on the top right. For instance, search on **Mountains**.

Once you see an image you like:

- Click on it.
- Choose **More Details** at bottom right.
- Right lick on image sizes beneath the picture, choosing one that is approximately 640X480.  
- Choose **Copy Location**, **Copy Link Address**  or some similar option.
- Click on the Image icon at the top of StackEdit and paste in the URL of your image.

Example results:

![Foo](http://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sunrise%2C_Manaslu.jpg/640px-Sunrise%2C_Manaslu.jpg)

![enter image description here][tree-types]

[wm-main]:http://commons.wikimedia.org/wiki/Main_Page
[tree-types]:http://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Contrasting_Tree_Types_Coexist_in_a_Forest.jpg/640px-Contrasting_Tree_Types_Coexist_in_a_Forest.jpg

When working with bitmaps, see also:

- [LampMarkDown](http://www.ccalvert.net/books/CloudNotes/Assignments/LampMarkdown.html#step-four)
- [MarkdownBasics](http://www.ccalvert.net/books/CloudNotes/Assignments/MarkdownBasics.html#creating-pictures)

## CSS

As you already know, you can enter bang, square brackets and a title, then parenthesis and a URL to display a picture with markdown. A bit like this, where you text is flush left:

```
![Title](http://foo.com/my-picture.png)
```

The above code yields a picture with a default size:

![Bridge][bridge]

If you want to get more control over the picture, you can use CSS. This usually involves writing real HTML in your markdown, and including a class. Here is my simple CSS class:

```css
img.twenty-five-percent {
   width: 25%;
}
```

You should put the CSS in **/var/www/html/css/style.css**.

And here is the HTML code for using this new CSS class:

```html
<img class="twenty-five-percent" src="https://foo.com/my-picture.jpg" alt="bridge">
```

<img class="twenty-five-percent" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Manhattan_Bridge_Construction_1909.jpg/800px-Manhattan_Bridge_Construction_1909.jpg" alt="bridge">

[bridge]: https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Manhattan_Bridge_Construction_1909.jpg/800px-Manhattan_Bridge_Construction_1909.jpg

You can paste the line with the HTML IMG tag in it directly into your markdown file while using Remarkable. Markdown supports both markdown itself, and HTML. When using markdown, you can just switch to HTML as needed:

```
## Some Header

Some markdown text. You can mix HTML and markdown in the same file.

<img class="twenty-five-percent" src="https://foo.com/my-picture.jpg" alt="bridge">
```

For all this to work, make sure you are using the most recent version of MakeHtml, as explained near the top of the file. In particular, the new version of **MakeHtml** includes code that loads **style.css**.

## Turn it in

Provide a link to your web site so that I can view it. It should look something like this:

```
http://XX.XX.XX.XX/master-list.html
```

Here XX.XX.XX.XX is your elastic IP address, and **master-list.html** is some valid page on your site that links to your other pages either directly or indirectly.

 When you submit the assignment, include at least two pictures:

 - One of your web site on a page that shows a bitmap
 - One of the output generated from running the MakeHtml program at the EC2 ubuntu command prompt.

## Hint

Check **~/Source/MakeHtml/config/ElvenConfig.json** to make sure it is compatible with your system. In particular, check the "base-dir", which assumes that your home path is **/home/bcuser**.

```
{
  "calvert": {
    "base-dir": "/home/bcuser/",
    "site-dirs": [
      "Documents/AllTest",
      "Documents/AllSite"
    ],
    "destination-dirs": [
      "/var/www/html/",
      "/home/bcuser/temp/test-site/"
    ]
  }
}
```
