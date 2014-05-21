#Bridge Pattern 03

Here is an overview of the assignment:

- Start with the BridgePattern 02 assignment
- Add a new page that contains a markdown editor
- The user will be able to:
    - Save the markdown to MongoDb
    - Save the HTML to disk
    - Display the HTML on a GitHub page.
    
##Creating your GitHub Page


Set up your github pages as described here:

- [GitHub Pages](https://pages.github.com/)
- create a repository called: **username**.github.io
- Example [http://**charliecalvert**.github.io/](http://charliecalvert.github.io/)
- Clone the repository: git clone git@github.com:**username**/**username**.github.io.git
- Create an index.html page and push it:

```
<!DOCTYPE html>

<html>
    <head>
        <title>Charlie on Github</title>
    </head>
    <body>
        <h1>Charlie on Github</h1>
        <p>Let's get started</p>
    </body>
</html>
```

##Displaying Markdown Files

For now your filelist should contain at least two markdown files:

    {
        "type": "fileList",
        "content": {
            "President01.json": "/home/charlie/Documents/Data/Presidents01.json",
            "President02.json": "/home/charlie/Documents/Data/Presidents02.json",
            "President03.md": "/home/charlie/Documents/Data/Presidents03.md",
            "President04.md": "/home/charlie/Documents/Data/Presidents04.md"
        }
    }
    
If the user selects a markdown file, then retrieve it from disk and display it in a page that contains your markdown editor. 

The code for displaying the markdown editor page and initializing the object that creates can be exactly the same as in the midterm, but I want you to start using the bridge pattern as well as the factory pattern. This means that the following call should place text into the **input** control in the markdown editor:

    myBridge.loadFile(fileName);
    
Typically the **markdownReader.loadFile** method calls the display method in its callback.    

##Saving Files

Suppose the user choose to edit Presidents04.md. When the user clicks the save button in the markdown editor:

- Save a new copy of /home/charlie/Documents/Data/Presidents04.md
- In your gitHub page directory, save Presidents04.html. You got it by calling **converter.makeHtml(saveMarkdown);**
- Save the markdown into MongoDb.

##MongoDb

For now, the JSON you save to MongoDb should look like this:

    {
        "FileName": fileName,
        "Path" path,
        "markdown": markdown
    }

Ultimately, we will probably replace or generate FileList.json from these records in the database. So you should see a parallel between these records and the information in **FileList.json**. The big difference, of course, is that the JSON contains a copy of the markdown, rather than just pointing to it. 

##Turn it In

Save your work in a Week08BridgePattern03 folder in your repository. Include a .project that has your last name appended to the directory name: Week08BridgePattern03-LastName.