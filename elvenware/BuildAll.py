import sys
import os
import elfutils.elffiles as elffiles
from elfutils.MarkdownToHtml import MarkdownToHtml

elfWriting = os.environ['GIT_WRITING'] + "Elvenware\\"
elvenware = elffiles.ensureFinalSlash(os.environ['ELVENWARE'])

# Site Root
siteRootFrom=elfWriting
siteRootTo=elvenware + "charlie\\"

# OS Init
osFrom= elfWriting + "os\\"
osTo=elvenware + "charlie\\os\\"

# Development
devFrom= elfWriting + "development\\"
devTo= elvenware + "charlie\\development\\"

# Web Init
webFrom= elfWriting + "development\web\\"
webTo= elvenware + "charlie\\development\\web\\"

# process and Copy the files
def makeItSo(markdown, fromFolder, toFolder, files):
	markdown.copyFrom=fromFolder
	markdown.destination=toFolder
	elffiles.ensureDir(markdown.destination)
	markdown.runner(files, ['start.html', 'nav.html', 'footer.html', 'end.html']);

# Android
def osAndroid(markdown):
	files = ["index", "AndroidApplications", "AndroidBasics", "GalaxyS4",
		 "MobileDevices", "MobileTechnology", "GoogleIo",
		 "Networking", "PeopleCentered"];
	makeItSo(markdown, osFrom + "Android", osTo + "Android", files)

# Cloud
def cloud(markdown):
	files = ["Git", "OwnCloud", "WebServices", "DropBox"];
	makeItSo(markdown, devFrom + "Cloud", devTo + "Cloud", files);

# Web Root
def webRoot(markdown):
	files = ["index", 'Scripting']
	makeItSo(markdown, webFrom, webTo, files);

# HTML
def htmlGuide(markdown):
	files = ["index", "GettingStarted", "HtmlSyntax", "HtmlFive",
		"EclipseWebDevelopment", "Html5Audio"]
	makeItSo(markdown, webFrom + "HtmlGuide", webTo + "HtmlGuide", files);

# CSS
def cssGuide(markdown):
	files = ["index", 'BasicSyntax', 'MediaQueries']
	makeItSo(markdown, webFrom + "CssGuide", webTo + "CssGuide", files);

# JavaScript
def javaScript(markdown):
	files = ['index', 'Angular', 'GettingStarted', 'JavaScriptBasics',
		'JavaScriptObjects', 'JavaScriptFunctions', 'JavaScriptModules',
		'jQueryBasic', 'JQueryUi', 'JsonBasics', 'NodeJs', 'Require']
	makeItSo(markdown, webFrom + "JavaScript", webTo + "JavaScript", files)

def unitTests(markdown):
	files = ['index', 'Grunt', 'Protractor', 'Jasmine', 'Basics']
	makeItSo(markdown, webFrom + "UnitTests", webTo + "UnitTests", files);

#linux
def linux(markdown):
	files = ['index', 'VirtualBox', 'LinuxBasics', 'LinuxFiles',
		'XWinOpenBox']
	makeItSo(markdown, osFrom + "linux", osTo + "linux", files);

# Development Root
def developmentRoot(markdown):
	files = ['index']
	makeItSo(markdown, devFrom, devTo, files);

# Android Development Code
def androidCode(markdown):
	files = ['PhoneGap']
	makeItSo(markdown, devFrom + "Android", devTo + "Android", files);

def osRoot(markdown):
	files = ['index']
	makeItSo(markdown, osFrom, osTo, files);

def osWindows(markdown):
	files = ['index', 'WindowsFaq', 'VirtualMachines']
	makeItSo(markdown, osFrom + 'windows', osTo + 'windows', files);

def osComputers(markdown):
	computerName = 'Computers'
	files = ['Hardware']
	makeItSo(markdown, osFrom + computerName, osTo + computerName, files);

def osLinux(markdown):
	linuxName = 'linux'
	files = ['VirtualBox']
	makeItSo(markdown, osFrom + linuxName, osTo + linuxName, files);
	files = ['LinuxFAQ']
	makeItSo(markdown, osFrom + linuxName + '\LinuxDays', osTo + linuxName + '\LinuxDays', files);

def siteRoot(markdown):
	files = ['index', 'updates', 'contents']
	makeItSo(markdown, siteRootFrom, siteRootTo, files)
	
def databaseNoSql(markdown):
	files = ['CouchDb', 'MongoDb']
	makeItSo(markdown, devFrom + 'Database' + os.sep + 'NoSql', devTo + 'Database' + os.sep + 'NoSql', files)
	files = ['index']
	makeItSo(markdown, devFrom + 'Database', devTo + 'Database', files)
	
def databaseMySql(markdown):
	files = ['MySql']
	makeItSo(markdown, devFrom + 'Database' + os.sep + 'MySql', devTo + 'Database' + os.sep + 'MySql', files)

def test(markdown):
	files = ["HtmlSyntax"]
	makeItSo(markdown, webFrom + "HtmlGuide", webTo + "HtmlGuide", files);


markdown = MarkdownToHtml()
#androidCode(markdown)
#cloud(markdown)
#htmlGuide(markdown)
javaScript(markdown)
#linux(markdown)
#cssGuide(markdown)
#unitTests(markdown)
#developmentRoot(markdown)
#osAndroid(markdown)
#osRoot(markdown)
#osWindows(markdown)
#osComputers(markdown)
#osLinux(markdown)
#siteRoot(markdown)
#webRoot(markdown)
#test(markdown)
#databaseNoSql(markdown)
#databaseMySql(markdown);
