<style>
p.menu_class
{
	border: thin black solid;
	width: 90px;
	border-radius: 8px;
	text-align: center;
	padding: 5px;
}

.theMenu {
  color: green;
}
</style>

<script type="text/javascript">
$(document).ready
(
	function()	{
      $(".hideMe").click(function () {
        $(this).slideUp();
      });      

      $(".hideMe").hover(
      function () {
        $(this).addClass("green");
      },
      function () {
        $(this).removeClass("green");
      });
    }

);

function toggleMenu() {    
    $('.theMenu').slideToggle('medium');
}

function Restore()
{
 	$(".hideMe").slideDown();
}
</script>


Exploring jQuery Text
=====================

<p class="hideMe">Click on this paragraph to make it disappear</p>

<p class="hideMe">We are using the JQuery Click Method to make this happen.</p>

Here is what the code looks like. First we make sure the paragraphs
above are assigned to a class called **hideMe**, then we write the
following:

```javascript
$("hideMe").click
(
    function()
    {
        $(this).slideUp();
    }
);
```

<p><a onclick="Restore()">Restore Text</a></p>

Working with Menus
------------------

This can be a great trick for making menus appear and disappear on small
devices. The problem you face is the lack of real estate on small
devices. So you need to find a way to make menus visible when the user
wants them, but hidden by default. One technique is to put a hyperlink
or button at the top of the screen that when toggled makes the menu
appear or disappear. The code is just what you see above. You put the
whole menu in some element that has an id with a name like "TheMenu".
Then write some CSS:

```css
p {
     border: thin black solid;
     width: 90px;
     border-radius:8px;
     text-align:center;
     padding: 5px;
}
```

And add a little JQuery:

```javascript
function toggleMenu()
{    
    $('ul.theMenu').slideToggle('medium');
}
```

And some simple HTML:

```html
<p class="menu_class" onclick="toggleMenu()">Toggle Menu</p>
<ul class="theMenu" hidden="true">
<li><a href="#">Menu Item 1</a></li>
<li><a href="#">Menu Item 2</a></li>
</ul>
```


Like this:

<section id="MenuDemo">
	<p class="menu_class" onclick="toggleMenu()">Toggle Menu</p>
	<ul class="theMenu" hidden="true">
		<li><a href="#">Menu Item 1</a></li>
		<li><a href="#">Menu Item 2</a></li>
	</ul>
</section>

When you click the "Toggle Menu" area then the menu should toggle on and off.
