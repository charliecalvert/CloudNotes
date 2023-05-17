---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/CheckProjects.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: CheckProjects.md
relativePath: /CheckProjects.md
title: CheckProjects
directoryName: Assignments
category : assignments-guide
---

# Check Projects

Make sure each of your projects has a project file and a unique name.

To help out, I hastily created a Python script called **CheckProjects**. This script can, at least in theory, iterate over the **.project** files in your repository and confirm that each one has a unique name.

The script is in Elvenware in the **Python/RegEx** directory. You can see the [CheckProjects][checkProject] in GitHub. The simplest way to get a copy is to go to your **Git/JsObjects** folder and run **git pull**. The file should be downloaded automatically.

To run the script, copy it to the root of your repository and run it like this:

```
python3 CheckProjects.py
```

If all goes well, it should return something like this:

```
['CopyParticles']
['GameDataProject']
['PointLocker']
['SocketsCore']
['ThreeFloor']
['Week03MazeBuilder']
['Week04_Particles']
['Week04_WebSocket']
['Week05_CanvasTest']
['Week05_SimpleParticle']
```

The output shown above shows the name for each project in the repository that has a .project file. If something has gone wrong, you might see output like this:

```
['TEST05']
['TEST05']
['TEST05']
['CanvasTest']
['Week05_Particles']
['TEST05']
Error:  ['TEST05']
Error:  ['TEST05']
Error:  ['TEST05']
Error:  ['TEST05']
```

The output shown here first shows the names of all the projects in the repository, and then prints out as an error each instance of a name that is repeated. Here is another example:

```
['SocketBasic']
['Test05']
['Week03_MazeBuilder']
['PointerLock']
['CanvasTest']
['Week03_MazeBuilder']
['Week05_SimpleParticle']
['Week03_MazeBuilder']
['Week06_GameListener']
['Week03_MazeBuilder']
['Test10']
['Test11']
['Test10']
Error:  ['Week03_MazeBuilder']
Error:  ['Week03_MazeBuilder']
Error:  ['Week03_MazeBuilder']
Error:  ['Week03_MazeBuilder']
Error:  ['Test10']
Error:  ['Test10']
```

Just now the program does not detect folders that are missing project files.

##Turn it In

Confirm that each of your projects has a unique name and a project file. Please report errors using my script, but the failure of the script is not a reason not to complete the assignment. 

When you are done, update your repository and submit the assignment, passing in the URL for your repository.

[checkProject]: https://github.com/charliecalvert/JsObjects/blob/master/Python/RegEx/CheckProjects.py

