import os
import sys
import elfutils.elffiles as elffiles
from elfutils.MarkdownToHtml import MarkdownToHtml

# Site Root
cloudNotesFrom= os.environ['GITHUB'] + "CloudNotes\\"
cloudNotesTo=elffiles.ensureFinalSlash(os.environ['ELVENWARE']) + "charlie\\books\\CloudNotes\\"

# CloudNotes Root
def cloudRoot(markdown):
	files = ["CloudNotes", "CloudOutline"];
	print(cloudNotesFrom)
	markdown.copyFrom=cloudNotesFrom
	markdown.destination=cloudNotesTo
	elffiles.ensureDir(markdown.destination)
	markdown.runner(files);


# Prog270
def prog270(markdown):
	files = ["Resources", "Week01", "Week02", "Week03",
	"Week04", "Week05", "Week06", "Week07", "Week08", 
	"Week09", "Week10",
	"MarkdownAssignment", 'GoogleSiteAssignment'];
	markdown.copyFrom=cloudNotesFrom + "Prog270"
	markdown.destination=cloudNotesTo + "Prog270"
	elffiles.ensureDir(markdown.destination)
	markdown.runner(files);
	
# Isit320
def isit320(markdown):
	files = ["Resources", "Week01", "Week02", 
		"Week03", "Week04", "Week05", "Week06", "Week07",
		"Week08", "Week09", "Week10", "Week11", "GitTipsFromKurt"];
	markdown.copyFrom=cloudNotesFrom + "Isit320"
	markdown.destination=cloudNotesTo + "Isit320"
	elffiles.ensureDir(markdown.destination)
	markdown.runner(files);

# Run Program
markdown = MarkdownToHtml()
cloudRoot(markdown)
prog270(markdown)
isit320(markdown)
