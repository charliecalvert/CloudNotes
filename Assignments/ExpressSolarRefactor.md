## Rename Renewables {#renewables-rename}

We have created a lot of files, and it is time to start organizing them. Let's create some subfolders and move our work into them.

Create a **views/renewables/** folder and move (**git mv**) our renewable files into it:

<pre>
$ ls -la
total 20
drwxrwxr-x 2 charlie charlie 4096 May 22 09:41 .
drwxrwxr-x 3 charlie charlie 4096 May 22 09:41 ..
-rw-rw-r-- 1 charlie charlie  256 May 19 19:33 renewable-by-index.jade
-rw-rw-r-- 1 charlie charlie  257 May 19 19:39 renewable-by-year.jade
-rw-rw-r-- 1 charlie charlie 2217 May 21 10:35 renewable-page.jade
charlie@rohan-elf:~/Git/prog272-calvert-2016/SolarVoyager/views/renewables
</pre>

In **routes/index.js** create a new route for handling renewable calls in their own folder:

```javascript
router.get('/renewables/:id', function(request, response) {
    console.log('renewables page called');
    response.render('renewables/' + request.params.id, { title: 'ElfComponent' });
});
```

This code says that instead of looking for **renewable-page.jade** or **renewable-by-index.jade** in the **views** folder, we should look for them in the **views/renewables folder**.

Finally, we have to change our requests on the client side so they look for files in the right place:

```javascript
var renewablesByYear = {
    color: "red",
    size: "big",
    init: function() {
        console.log(renewablesByYear.color);
        $('#elf-view').load('/renewables/renewable-by-year', function() {
```

This code says that the **init** method should load the jade file called **renewables/renewable-by-year.jade**. Before we make the change the last line looked like this:

```javascript
$('#elf-view').load('renewable-by-year', function() { ... })
```

This old, obsolete, code loaded **renewable-by-year.jade** from the **views folder**. We don't want to do that anymore. Now we want to load it from the **views/renewables/renewable-by-year.jade** folder.

**NOTE**: _Express doesn't ask us to specify the **views** folder in the above code because of this statement found around line 14 in **app.js**: _

```javascript
app.set('views', path.join(__dirname, 'views'));
```
_That code tells express where to look for our jade files. Specifically, it says look in the **views** folder. Hence we can **response.render('renewables/' + request.params.id, { title: 'ElfComponent' });** rather than **response.render('views/renewables/' + request.params.id, { title: 'ElfComponent' });**. The views folder is searched by default, so we don't need to specify it._

## Move Client Side Rewewables {#client-side-renewables}

I did it with these commands, starting from the root of my project:

<pre>
cd public/javascripts
mkdir renewables
git mv renewables.js renewables/.
git mv renewables-* renewables/.
</pre>

I spell this out because having a file called **renewables.js** that you want to move into a folder called **renewables** can be a bit tricky when using wildcards. Specifically, this call did not work because I was, unintentionally, asking git to move a folder into itself:

<pre>
git mv renewables* renewables/.
</pre>

So I moved the files in two steps, as shown in the third and fourth lines above.

The result looks like this when I ask for a listing of **public/javascripts/renewables**:

<pre>
$ ls -la
total 20
drwxrwxr-x 2 charlie charlie 4096 May 22 10:04 .
drwxrwxr-x 3 charlie charlie 4096 May 22 10:04 ..
-rw-rw-r-- 1 charlie charlie 1328 May 22 09:43 renewables-index.js
-rw-rw-r-- 1 charlie charlie 2923 May 22 09:42 renewables.js
-rw-rw-r-- 1 charlie charlie 1311 May 22 09:43 renewables-year.js
</pre>

You will now also have to make some changes in **main.js**, around lines 12 through 14. You need, of course, to set up the new paths, which I leave as an exercise for the reader.

**NOTE**: _Hopefully you have been doing so all along, but if you have not, stop now and test your work. Make sure all is well before you move on. If you are following along in class, and don't have time to test everything, then do so when you get home. If necessary comment out code, or turn to the bash shell and developer tools **network** page and make sure everything is acting you expect. Clearly these changes to the location of the renewables files must be working before you can debug related portions of your code._

## Create Home {#home}

Rename work.js to home.js. Rename all associated buttons, menus, variables and files. To help you find all instances of these variables, try these command from the root of the project folder:

<pre>
elfgrepcomps work
grep -r --include=\*.jade work
</pre>

**NOTE**: _The **elfgrepcomps** command is from JsObjects, but should be symbolically linked from your **bin** folder, and hence on your path._

If you trust them, there are also often search and replace across a project options in developer IDEs.
