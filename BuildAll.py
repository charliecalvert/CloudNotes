import os
import sys
import elfutils.elffiles as elffiles
from elfutils.MarkdownToHtml import MarkdownToHtml

# Site Root
cloudNotesFrom= os.environ['GITHUB'] + "CloudNotes\\"
cloudNotesTo=elffiles.ensureFinalSlash(os.environ['ELVENWARE']) + "charlie\\books\\CloudNotes\\"

# process and Copy the files
def makeItSo(markdown, folder, files):
	markdown.copyFrom = cloudNotesFrom + folder
	markdown.destination = cloudNotesTo + folder
	elffiles.ensureDir(markdown.destination)
	markdown.runReveal(files);
	#markdown.runner(files, ['StartReveal.html', 'Empty.html', 'Empty.html', 'EndReveal.html']);
	#markdown.runner(files, ['start.html', 'nav.html', 'footer.html', 'end.html']);

# CloudNotes Root
def cloudRoot(markdown):
	files = ["CloudNotes", "CloudOutline"];
	print(cloudNotesFrom)
	makeItSo(markdown, "", files);


# Prog270
def prog270(markdown):
	files = ["Resources", "Week01", "Week02", "Week03",
	"Week04", "Week05", "Week06", "Week07", "Week08", 
	"Week09", "Week10", "Week11",
	"MarkdownAssignment", 'GoogleSiteAssignment'];
	makeItSo(markdown, "Prog270", files);

# Isit320
def isit320(markdown):
	files = ["Resources", "Week01", "Week02", 
		"Week03", "Week04", "Week05", "Week06", "Week07",
		"Week08", "Week09", "Week10", "Week11", "GitTipsFromKurt"];
	makeItSo(markdown, "Isit320", files);

# Prog280
def prog280(markdown):
	files = ["Resources", "Week01", "Week02", "Week03", "Week04"];
	makeItSo(markdown, "Prog280", files);

def prog272(markdown):
	files=["Resources", "Week01", 'Week02', 'Week03', 'Week04', 
		'Week05', 'Week06'];
	makeItSo(markdown, "Prog272", files);

def assignments(markdown):
	files=["Prog270-011414", "OwnCloudInstall", "Cordova01",
		"LampBootstrap", "InfoManager01", "CodeAcademy01",
		"Evernote01", "NodeExpressMongo01", "StackGoogle",
		"StackDropBox", "GuestAdditions", "NodeModulesAssignment",
		"MongoMark", "NodeRoutes01", "Pandoc01"]
	makeItSo(markdown, "Assignments", files);

# Run Program
markdown = MarkdownToHtml()
#cloudRoot(markdown)
#prog280(markdown)
prog272(markdown)
#assignments(markdown);
#prog270(markdown)
#isit320(markdown)
