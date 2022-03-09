---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/Art/photos/svg-test/SvgTester.md
relativePath: elvenware/Art/photos/svg-test/SvgTester.md
title: SvgTester
debug: aec has both but checking ELF code
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

## Overview

I am able to put SVG code directly in a markdown file so long as I am careful with white space. No blank lines.

I can add links to SVG file. For now, I'm using inline SVG in HTML files only, not in markdown.

## SVG Inline Code

Here are some examples of SVG files embedded directly in HTML.

<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="MyGradient">
            <stop offset="10%" stop-color="yellow" />
            <stop offset="90%" stop-color="blue" />
        </linearGradient>
    </defs>
    <rect fill="url(#MyGradient)" stroke="black" stroke-width="5" x="20" y="20" width="300" height="100"/>
</svg>

<svg xmlns="http://www.w3.org/2000/svg"
     preserveAspectRatio="none"
     version="1.1"
     width="100%"
     height="100%"
     xmlns:xlink="http://www.w3.org/1999/xlink">
   <defs>
    <linearGradient id="myLinearGradient1"
                    x1="0%" y1="0%"
                    x2="0%" y2="100%"
                    spreadMethod="pad">
      <stop offset="0%"   stop-color="#b2bbca" stop-opacity="1"/>
      <stop offset="100%" stop-color="#73839f" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%"
     style="fill:url(#myLinearGradient1);" />
</svg>

## SVG Linked Files

Here are some examples of linking to SVG files.

<img src="/images/SimpleGraphic.svg" alt="Test SimpleGraphic">
<img src="/images/sam.svg" alt="Test Sam">
<img src="/images/tester.svg" alt="Test Tester">
