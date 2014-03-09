Install Syte
------------

For now, my notes on Syte are embedded in your assignment:

-   <https://bc.instructure.com/courses/793364/assignments/2286178>

Install Filezilla

You can learn about Filezilla here:

-   <http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#filezilla>


Assignment
----------

The goal of this assignment is to install Syte on your EC2 instance. When you
are done, provide a link to your web site. You should provide connections on
your Syte to at least your a WordPress Site, your GitHub site, your Twitter
Site, and one other site of your choice. Open up and use Port 30025 for your web
site.

Tips on opening up a port:

<http://www.elvenware.com/charlie/development/cloud/WebServices.html#ec2SecurityGroups>

My version of Syte may be available at times at this address:

<http://ec2-23-23-170-11.compute-1.amazonaws.com:30025/>

It looks like this when you are at the default view, which features the WordPres
blog:

![](<http://www.elvenware.com/charlie/development/cloud/images/Syte01Small.png>)

Charlie Syte

Click here for [full size image][1]

[1]: <http://www.elvenware.com/charlie/development/cloud/images/Syte01.png>

Compare to my [actual blog][2].

[2]: <http://elvenware.wordpress.com/>

Here is another view, this time showing the GitHub section:

![](<http://www.elvenware.com/charlie/development/cloud/images/Syte02Small.png>)

Charlie Syte

Click here for [full size image][3]

[3]: <http://www.elvenware.com/charlie/development/cloud/images/Syte02.png>

Compare to my GitHub site:

<https://github.com/charliecalvert?tab=repositories>

Syte Install
------------

Navigate to our Git directory (/home/\$USER/Git)

Then run this command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
git clone git://github.com/rigoneri/syte.git
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Then run these commands:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
sudo apt-get install python-setuptools
sudo apt-get install libpq-dev python-dev
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

sudo easy_install pip

Navigate to your syte folder. Check to make sure requirements.txt is in that
folder. (It should be.) And this run this command:

sudo pip install --use-mirrors -r requirements.txt

If you succeed you will get a message like this:

Successfully installed Django requests psycopg2 gunicorn pybars rauth PyMeta

NOTE: If you get "error pg_config executable not found" then that means you
didn't install libpq-dev

You could, I suppose, do it all by hand. Start like this:

sudo easy_install django

And then run sudo easy_install on everything from requirements.txt

Syte Set Up
-----------

This is explained in some detail in the Syte README.md:

<https://github.com/rigoneri/syte/blob/master/README.md>

To make a PNG file a 32X32 ICO file: http://converticon.com/

One useful trick is to use Filezilla to copy the files you want to edit back to
your Windows or Mac client. There you will find editors easier to use than
either nano or vi. Here is a screen shot showing how to configure the Filezilla
Site Manager. The only change on your instance will be the IP address in the
Host field:

![](<http://www.elvenware.com/charlie/development/cloud/images/Filezilla00.png>)

Setting up Filezilla

### ROOT_URI

Here is how I set up the ROOT_URI:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
if DEPLOYMENT_MODE == 'dev':
    SITE_ROOT_URI = 'http://ec2-23-23-170-11.compute-1.amazonaws.com:30025/'
    DEBUG = True
else:
    DEBUG = False
    SITE_ROOT_URI = 'http://ec2-23-23-170-11.compute-1.amazonaws.com:30025/'
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You will, of course, have a different URL, but the general appearance will be
similar.

### WordPress

He shows a capital W for Wordpress, yet it seems to me that won't work. I
believe you need to change it to a small w:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
BLOG_PLATFORM = 'wordpress'  # Wordpress or tumblr

#Blog Integration: Wordpress
WORDPRESS_BLOG_URL = 'elvenware.wordpress.com'
WORDPRESS_API_URL = 'https://public-api.wordpress.com/rest/v1/sites/{0}'.format(WORDPRESS_BLOG_URL)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To make this work, you should go to Wordpress.com and create a free site for
yourself. Later I will look into making this work for our EC2 versions of
WordPress. Having a free Wordpress blog on Wordpress.com is, for many people, a
good thing.

GitHub and LastFm
-----------------

Both GitHub and LastFm require that you get long complicated tokens from the
site. For instance, see these sections of the settings file:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#Github Integration
GITHUB_INTEGRATION_ENABLED = True
GITHUB_API_URL = 'https://api.github.com/'
GITHUB_ACCESS_TOKEN = '823234097082 AND SO ON FOR EVER AND EVER'

GITHUB_OAUTH_ENABLED = True
GITHUB_CLIENT_ID = '823234097082 AND SO ON'
GITHUB_CLIENT_SECRET = '823234097082 AND SO ON FOR EVER AND EVER''
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You will want to put the long keys that you get from GitHub in the fields that
begin 82323....

To learn more, see the section of Rodrigo's site that has this heading:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Setting up GitHub integration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Running Syte
------------

After you edit syte_settings.py and set server to your ip and some port, then
you type something like this, where you pass in the IP and Port that you
specified:

python manage.py runserver 192.168.2.17:30025

Using Virtual Environment
-------------------------

You don't have to do this, but we will probably use this some next quarter, if
you are thinking about Prog282.

You can optionally set up a virtual environment:

sudo easy_install virtualenv sudo easy_install virtualwrapper

Switch to syte environment

mkvirtualenv syte workon syte

Git Issues
----------

Here are some things you might want to know about git.

Git Branch
----------

List available branches:

git branch

Create a branch:

git branch myBranch

Switch to a branch:

git checkout myBranch

Then edit a file and check your changes in to your branch:

git add MyFile git commit -m "Committing changes to MyFile"

Clone a Local Repository
------------------------

git clone file:////home/charlie/git/myrepo git clone file:////\$HOME/git/myrepo

Clone a Specific Branch
-----------------------

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    BRANCH=chasyte
    REPOSITORY=file:////home/charlie/git/myrepo
    mkdir 
    cd $BRANCH
    git init
    git remote add -t $BRANCH -f origin $REPOSITORY
    git checkout $BRANCH
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
