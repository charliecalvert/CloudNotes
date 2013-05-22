Week 08
=======

Merging Git Files:

<http://elvenware.com/charlie/development/cloud/Git.html#merging-code>


Constants
---------

JsObjects/JavaScript/Properties/Constants01

CouchApp Pages
--------------

http://couchapp.org/page/pages-install
https://github.com/couchapp/couchapp

ez_setup.py
distribute_setup.py
set VS90COMNTOOLS=%VS110COMNTOOLS%
python-2.7.5.msi
pywin32-218.win32-py2.7.exe
py2exe-0.6.9.win32-py2.7.exe

couchapp init  
couchapp push . http://localhost:5984/pages

Erica
-----

	<https://github.com/benoitc/erica>

Install erica:
	
	git clone git://github.com/benoitc/erica.git
	sudo apt-get install erlang

Or, if you want to get into erlang, do this:

	sudo apt-get install erlang erlang-doc

Then create something

	erica create-webapp
	cd myapp
	erica push http://192.168.2.18:5984/myapp

Create an app called bar:

	erica create-webapp appid=bar
	cd bar
	erica push http://192.168.2.18:5984/bar
