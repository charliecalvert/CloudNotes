---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AngularChartCensus.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: AngularChartCensus.md
relativePath: /AngularChartCensus.md
title: AngularChartCensus
directoryName: Assignments
category : assignments-guide
---

#Angular Chart Census

This assignment is not yet complete, but you can get started by doing at least this much.

You can base your project on [**AngularChartOrganic**][chartOrg]. Only this time, instead of showing data about the top organic countries, you should pull data from the US Census and dynamically graph it to show the:

- Top ten states by population
- Bottom ten states by population

For instance.

![StatesPop](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGSWhLUGl5WTBuLVk)

If you want, you can try to graph all states by population. 

I think that should be three different pages, but perhaps we can make the change dynamic. I will need to think about it.


![WaZip](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGMkdRR3hNTTNraVk)

## Zip Codes in Washington State

- Include information on Zip codes in Washington state
- Let the user query by specific zip code.
- Get the top 5 most populous zip codes in the state and graph their relative sizes (Shown in screen shot.)
- Get the top five least populous which have a population larger than zero and graph their relative size.

To query for zip codes, you need to include a:

- **The base url**: http://api.census.gov/data/2010/sf1?
- **Your Key**: &key=[YOUR KEY]
- **The thing you want to get, which is population**: &get=[YOUR QUERY GOAL]. The code for population is P0010001
- **What kind of population**: &for=zip+code+tabulation+area: [THE ZIP YOU WANT INFO ON] or * for all.
- **The zips in what state**: &in=state: [ THE STATE YOU WANT ]. Washington is 53.

Example when asking for population of zip code 98005 in Washington State:

	http://api.census.gov/data/2010/sf1?key=[YOURKEY]&get=P0010001&for=zip+code+tabulation+area:98005&in=state:53"

I'm guessing wildly now, but a nice place to take it after the midterm would be to include mapping....

[chartOrg]: http://www.elvenware.com/charlie/books/CloudNotes/Assignments/AngularChartOrganic.html

## Unit Tests

You should be able to at least run simple tests against your StateZip and StatePop modules.

## Future

We are pushing toward the midterm with this assignment. I'm guessing that the midterm will:

- Work on mobile sites
- Work in Cordova apps


> by [Charlie Calvert](http://elvenware.com/charlie).