---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AngularChartOrganic.md
relativePath: Assignments/AngularChartOrganic.md
title: AngularChartOrganic
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: AngularChartOrganic.md
fileNameHTML: AngularChartOrganic.html
---


<!-- toc -->
<!-- tocstop -->

# Angular Chart Organic

This is inpart an in class exercise. Using Yeoman, Angular, Angular-Charts, Angular-Bootstrap create a web application that:

- Has a drop down select with these options:
	- PieChart
	- BarChart
	- ColumnChart
	- AreaChart
	- LineChart
	- Table
- Has a page demonstrating how to use the Angular bootstrap toggles, checkboxes and radiobuttons
- Has an Angular Google Chart that displays information about the top organic food nations
- Has input controls display the amount, in euros, consumed
	- When the user edits the input controls the chart changes to reflect the edits


Reference: [http://bit.ly/angular-yeoman](http://bit.ly/angular-yeoman)

Your application should, at times, look something like this:

![AngularChartOrganic](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGZTBYVmZjdGdXR0E)

## Select DropDown

When the user selects an item from the dropdown, the chart changes its type. For instance, it changes from PieChart to BarChart. You can set up the select control like this:

```
$scope.chartSelect = {
    "type": "select",
    "name": "Service",
    "value": "PieChart",
    "values": [ "PieChart", "BarChart", "ColumnChart", 
         "AreaChart", "LineChart", "Table"]
};
```

The HTML should look like this:

```HTML
<select ng-model="chartSelect.value" 
     ng-options="v for v in chartSelect.values" ng-change="chartTypeUpdate()">
</select>
```
