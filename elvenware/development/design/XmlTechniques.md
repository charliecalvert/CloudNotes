---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/design/XmlTechniques.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/design
fileName: XmlTechniques.md
relativePath: /design/XmlTechniques.md
title: XmlTechniques
directoryName: design
category: design-guide
---

<header>
    <h1>Charlie Calvert on Elvenware</h1>
    <h2>Writing Code and Prose on Computers</h2>
</header>

One simple way to work with XML data is to open it in Excel. Inside of Excel, choose **File | Open,** select your XML file, and use the default options to display the data in Excel.

You might also want to play with the **Use the XML Source task pane** option that you see when you first opt to open an XML file in Excel. So create a new Spreadsheet and repeat the first step from paragraph 1, but this time choose **Use the XML Source Task Pane.** After you choose that option, click through a dialog or two, then you will see a "map" of your data structure (the metadata) in the right side of the Excel screen, but no data. Not yet. <span style="mso-spacerun: yes"></span>(Since I want you to display metadata in this assignment, the ability to see the “map” is a nice feature.) Drag a few fields from the Map area to your blank spreadsheet. For instance, drag the name of a plant and its mass.

Now make sure the Developer tab is visible in <span style="mso-spacerun: yes"></span> Excel. Choose **File | Options | Customize Ribbon** and check the **Developer** option on the right in the **Main Tabs** section. Close the **Options**. Now you should see the Developer tab at the top of Excel. Turn to that tab. Select **Import.** Browse for your XML file and you will see that just the fields you selected are visible in Excel. Play with this technology for a bit, choosing different options in the XML Map each time you import data.

Browsers such as Chrome, Firefox and Edge also do a nice job of displaying XML data.
