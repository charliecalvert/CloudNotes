---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/index.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/React
fileName: index.md
relativePath: /React/index.md
title: index
directoryName: React
category : react-guide
---

<h1>{{ page.title }}</h1>

<p>My custom loop to list all the pages in the react-guide directory.</p>
<p>V 0.97: of the custom loop that lists all the pages in the react-guide directory.</p>

```html
<h1>{{ page.title }}</h1>

<p>My custom loop to list all the pages in the react-guide directory.</p>
<p>V 0.9802: of the custom loop that lists all the pages in the react-guide directory.</p>

<h1>{{ page.title }}</h1>

<ul>
  {% for react-guide in site.react-guide %}
    <li>
      <a href="{{ react-guide.url }}">{{ react-guide.title }}</a>
    </li>
  {% endfor %}
</ul>
```

<h1>{{ page.title }}</h1>

<p>My custom loop to list all the pages in the react-guide directory.</p>
<p>V 1.0: of the custom loop that lists all the pages in the react-guide directory.</p>

<h1>{{ page.title }}</h1>

<ul>
  {% for react-guide in site.react-guide %}
    <li>
      <a href="{{ react-guide.url }}">{{ react-guide.title }}</a>
    </li>
  {% endfor %}
</ul>

## Manual Pages

* [AddressComponent.html](AddressComponent.html)
* [CongressAddressServer.html](CongressAddressServer.html)
* [GitUserTesting.html](GitUserTesting.html)
* [ReactAddressEditDialog.html](ReactAddressEditDialog.html)
* [ReactAddressMock.html](ReactAddressMock.html)
* [ReactAddressTestingDataManager.html](ReactAddressTestingDataManager.html)
* [ReactEsLint.html](ReactEsLint.html)
* [ReactMicroServices.html](ReactMicroServices.html)
* [ReactNativeAddress.html](ReactNativeAddress.html)
* [ReactNativeAndroidSdk.html](ReactNativeAndroidSdk.html)
* [ReactNativeBasics.html](ReactNativeBasics.html)
* [ReactPropBasics.html](ReactPropBasics.html)
* [ReactProps.html](ReactProps.html)
* [ReactPropsEsLint.html](ReactPropsEsLint.html)
* [ReactPropsMaterial.html](ReactPropsMaterial.html)
* [ReactPropsNative.html](ReactPropsNative.html)
* [RestBasics.html](RestBasics.html)
* [TestSnapShotsAndHints.html](TestSnapShotsAndHints.html)
* [UnitTestsAddress.html](UnitTestsAddress.html)
