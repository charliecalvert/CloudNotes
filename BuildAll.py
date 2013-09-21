import sys
from elfutils.MarkdownToHtml import MarkdownToHtml

# Site Root
cloudNotesFrom="G:\\Src\\GitHub\\CloudNotes\\"
cloudNotesTo="G:\\Web\\Elvenware\\charlie\\books\\CloudNotes\\"

# CloudNotes Root
def cloudRoot(markdown):
	files = ["CloudNotes"];
	markdown.copyFrom=cloudNotesFrom
	markdown.destination=cloudNotesTo
	markdown.runner(files);


# Prog270
def prog270(markdown):
	files = ["Week01"];
	markdown.copyFrom=cloudNotesFrom + "Prog270"
	markdown.destination=cloudNotesTo + "Prog270"
	markdown.runner(files);
	
# Isit320
def isit320(markdown):
	files = ["Week01"];
	markdown.copyFrom=cloudNotesFrom + "Isit320"
	markdown.destination=cloudNotesTo + "Isit320"
	markdown.runner(files);

# Run Program
m = MarkdownToHtml()
cloudRoot(m)
prog270(m)
isit320(m)
