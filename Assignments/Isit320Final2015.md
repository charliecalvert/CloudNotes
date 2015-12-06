## Overview

This document describes the steps needed to complete the Final for Isit 320 in 2015.

## Goals

- Complete as many of the unit tests as you can for the HyperExplore project
- Complete, as best you can, the interface for the HyperExplore project
- Use UpStart or systemd to get your final running on EC2, on port 30025

More unit tests may show up during the weekend, so check back to see if there have been updates. The updates are available in the $$ELF_TEMPLATES/

## Turn it in

Check your work into your repository. When submitting the final, give me the Elastic IP address of instance running on EC2. You should submit a link to your running project in this format:

- http://<YOUR ELASTIC IP>:30025

Your project should remain running on EC2 until midnight on Monday, December 14 or until I:

- Return your final and
- Assign you a final grade

If you get a final grade before Monday, December 14, you can turn off your instance on EC2 at that time, if that is what you want to do.

## NOTES

Below you will a few notes and hints

## Graphics

At least one portion of your final should provide support for displaying graphics if they are available. Pick whichever set of links you prefer:

- Delicious
- Bitly
- Twitter

## Detail Delicious

Here is the **elfDelicious.detailDelicious** method:

```javascript
detailDelicious: function(index) {
    'use strict';
    $('#deliciousDetails').html(JSON.stringify(elfDelicious.deliciousLinks[index], null, 4));
},
```
