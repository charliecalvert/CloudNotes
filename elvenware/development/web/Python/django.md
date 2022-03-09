---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Python/django.md
relativePath: elvenware/development/web/Python/django.md
title: Django
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

## Overview

Learn about DJango.

Install
-------

Install pip:

```bash
sudo apt-get install python-pip
```

Install virtualenv:

```bash
sudo apt-get install python-virtualenv    
```

Create a virtual environment:

```bash
virtualenv test
cd test
source bin/activate
```

Install uwsgi:

```bash
sudo apt-get install python2.7-dev
pip install uwsgi
```
Start uwsgi:

```bash
uwsgi --http :8000 --wsgi-file test.py
```

And ultimately:

```bash
uwsgi --http :8000 --module mysite.wsgi
```

A simple way to get started is to use pip:

```bash
sudo pip install django
```

This will probably install django into the following directory, or one
similar to it:

```bash
/usr/local/lib/python2.7/dist-packages/
```

An alternative install involves downloading the Django and then run the
included setup program.

To download DJango go here: 

- [Download](https://docs.djangoproject.com/en/dev/intro/tutorial01/)

 

```code
$ tar xzvf Django-1.3.1.tar.gz
$ cd Django-1.3.1/
$ sudo python setup.py install

python -c "from distutils.sysconfig import get_python_lib; print get_python_lib()"
/usr/lib/python2.7/dist-packages
```

In the following, I run a test to see if Django is installed. The error
shown below after the attempt to **import django** indicates that Django
is not installed:

```python
charlie@WesternSea:~/Downloads/Django-1.3.1$ python
Python 2.7.2+ (default, Oct  4 2011, 20:03:08)
[GCC 4.6.1] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import django
>>> pring django.get_version()
  File "<stdin>", line 1
    pring django.get_version()
               ^
SyntaxError: invalid syntax
>>> print django.get_version()
1.3.1
>>>
```

Here is how it looks if Django is installed:

```python
charlie@WesternSeas:~$ python
Python 2.7.3 (default, Aug 1 2012, 05:16:07)
[GCC 4.6.3] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import django
>>>
```

As you can see, when everything is set up properly, you can type
**import django** at the Python prompt without getting an error. (If you
get an error when you simply type the word **python** at the command
prompt, that means that Python is not installed. I cover installing
Python [here](install.html).

To learn more about DJango, go here:

[Intro Tutorial](https://docs.djangoproject.com/en/dev/intro/tutorial01/)

Set up a web site {#webSite}
-----------------

First create a site:

```bash
django-admin.py startproject mysite
```

You should now navigate to the **mysite** folder and spend some time
exploring it.

```bash
mkdir mysite
cd mysite
python manage.py runserver
Validating models...

0 errors found
Django version 1.3.1, using settings 'mysite.settings'
Development server is running at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
[29/Jan/2012 00:58:21] "GET / HTTP/1.1" 200 2051
```

Okay, your site is set up, and a toy webserver is running.

Go to <http://localhost:8000/>

![Django start screen][dj-start]

Running Under Apache with WSGI {#wsgi}
------------------------------

The example above shows how to get django running under a test server.
When you deploy, and sometimes even during development, it is best to
run under Apache. Fortunately, it is not difficult to run django under
Apache. To begin, install a program called WSGI.

To install mod-wsgi under Ubuntu:

```bash
sudo apt-get install libapache2-mod-wsgi
```

Now you need to edit your configuration file Apache, which is in the
sites-available directory:

```bash
sudo gedit /etc/apache2/sites-available/default
```

Edit the code so it looks like this:

```xml
<Directory /var/www/>
    Options Indexes FollowSymLinks MultiViews ExecCGI

    AddHandler cgi-script .cgi
    AddHandler wsgi-script .wsgi

    AllowOverride None
    Order allow,deny
    allow from all
</Directory>
```

You can then restart apache like this:

```bash
sudo /etc/init.d/apache2 restart
```

Now place a hello world application called **index.wsgi** in
**/var/www:**

```python
def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/plain')])
    yield 'Hello World\n'
```

You can also make index.wsgi a default page by editing dir.conf:

```bash
sudo gedit /etc/apache2/mods-enabled/dir.conf
```

After opening the file, add **index.wsgi** to the list of recognized
default files.

At this stage, you have wsgi up and running. Your next step is to link
in Django, as explained here:

- [modswgi](https://docs.djangoproject.com/en/dev/howto/deployment/wsgi/modwsgi/)

To add in an existing Django project, just add code like the following
to the bottom of your **sites-available/default** file, and outside the
**virtualhost** section:

```xml
WSGIScriptAlias / /home/charlie/django/myproject/myproject/wsgi.py
WSGIPythonPath /home/charlie/django/myproject

<Directory /home/charlie/django/myproject/myproject>
    <Files wsgi.py>
        Order deny,allow
        Allow from all
    </Files>
</Directory>
```

Then restart apache.

Static Files {#staticFiles}
------------

The simplest way to serve up static files is to create an app, put a
static directory in it, and then put your static files in that static
directory. Assume you have project called **myproject.** Inside it you
create an app called called books:

```code
myproject
-->myproject
---->books
------>static
```

In order to get CSS for your admin working correctly, you might also
need to add the following below WSGIPythonPath:

```code
Alias /static/ /usr/local/lib/python2.7/dist-packages/django/contrib/admin/static/
```

The whole thing would then look like this:

```code
WSGIScriptAlias / /home/charlie/django/myproject/myproject/wsgi.py
WSGIPythonPath /home/charlie/django/myproject
Alias /static/ /usr/local/lib/python2.7/dist-packages/django/contrib/admin/static/

<Directory /home/charlie/django/myproject/myproject>
    <Files wsgi.py>
        Order deny,allow
        Allow from all
    </Files>
</Directory>
```

If you want to start serving up your own static pages, then do something
like this where you point to a directory on your own site:

```code
Alias /static/ /home/charlie/django/myproject/myproject/static/
```

In settings.py, there should be no need, at least at first, to change
these settings:

```code
STATIC_ROOT = ''

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
STATIC_URL = '/static/'
```

For more information, go here:

- [Static Files](https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/)
- [Interface](http://en.wikipedia.org/wiki/Web_Server_Gateway_Interface)
- [Ubuntu Forums](http://ubuntuforums.org/showthread.php?t=833766)

 

Shell Prompt {#shell}
------------

If you get an error about DJANGO\_SETTINGS\_MODULE is undefined when
working at the Python prompt, then start Python like this:

``` {.code}
python manage.py shell
```

This is just the same as typing **python**but now your **settings.py**
file has been run and your paths and other settings are properly
configured.

Databases
---------

When modifying a sqlite3 database, both the database itself, and the
folder it is in, should be writable by Apache:

```bash
sudo chown charlie:www-data mydatabase.db
chmod 664 mydatabase.db
sudo chown charlie:www-data myDataFolder
chmod 775 myDataFolder
```

Remember you can always check the current values for file or folder with
this command:

```bash
stat -c '%A %a %n' *  
```

Here is code for installing mysql:

```bash
sudo apt-get install python-mysqldb
python manage.py syncdb
```

```sql
charlie@WesternSea:~/Source/mysite$ python manage.py sql polls
BEGIN;
CREATE TABLE `polls_poll` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `question` varchar(200) NOT NULL,
    `pub_date` datetime NOT NULL
)
;
CREATE TABLE `polls_choice` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `poll_id` integer NOT NULL,
    `choice` varchar(200) NOT NULL,
    `votes` integer NOT NULL
)
;
ALTER TABLE `polls_choice` ADD CONSTRAINT `poll_id_refs_id_5d896c23` FOREIGN KEY (`poll_id`) REFERENCES `polls_poll` (`id`);
COMMIT;
charlie@WesternSea:~/Source/mysite$ python manage.py syncdb
Creating tables ...
Creating table polls_poll
Creating table polls_choice
Installing custom SQL ...
Installing indexes ...
No fixtures found.
charlie@WesternSea:~/Source/mysite$ python manage.py shell
Python 2.7.2+ (default, Oct  4 2011, 20:03:08)
[GCC 4.6.1] on linux2
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
>>> from polls.models import Poll, Choice
>>> Poll.objects.all()
[]
>>> import datetime
>>> p = Poll(question="What's up?", pub_date=datetime.datetime.now())
>>> p.save()
>>> p.id
1L
>>> p.question
"What's up?"
>>> p.pub_date
datetime.datetime(2012, 1, 29, 1, 57, 57, 496429)
>>> Poll.objects.all()
[]
>>>
```

Links {#links}
-----

- [The Django Book](http://www.djangobook.com/)
- [Django Project](https://www.djangoproject.com/)
- [Django Docs](https://docs.djangoproject.com/en/1.4/)

[dj-start]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/DjangoStart.png
