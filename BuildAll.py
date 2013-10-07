import os
import sys
from elfutils.MarkdownToHtml import MarkdownToHtml

# Site Root
cloudNotesFrom= os.environ['GITHUB'] + "CloudNotes\\"
cloudNotesTo=os.environ['ELVENWARE'] + "charlie\\books\\CloudNotes\\"

# CloudNotes Root
def cloudRoot(markdown):
	files = ["CloudNotes"];
	markdown.copyFrom=cloudNotesFrom
	markdown.destination=cloudNotesTo
	markdown.runner(files);


# Prog270
def prog270(markdown):
	files = ["Resources", "Week01", "Week02", "MarkdownAssignment"];
	markdown.copyFrom=cloudNotesFrom + "Prog270"
	markdown.destination=cloudNotesTo + "Prog270"
	markdown.runner(files);
	
# Isit320
def isit320(markdown):
	files = ["Resources", "Week01", "Week02", "GitTipsFromKurt"];
	markdown.copyFrom=cloudNotesFrom + "Isit320"
	markdown.destination=cloudNotesTo + "Isit320"
	markdown.runner(files);

# Run Program
m = MarkdownToHtml()
cloudRoot(m)
#prog270(m)
isit320(m)
