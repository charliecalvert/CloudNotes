---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/GoogleDriveSdk.md
relativePath: elvenware/development/web/JavaScript/GoogleDriveSdk.md
title: GoogleDriveSdk
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
subject: JavaScript
fileNameMarkdown: GoogleDriveSdk.md
fileNameHTML: GoogleDriveSdk.html
queryPath: /javascript-guide/
---

<!-- toc -->
<!-- tocstop -->

#Google Drive SDK

- [Home Page][homePage]
- [JavaScript QuickStart][jsQuickStart]

[homePage]: https://developers.google.com/drive/web/
[jsQuickStart]: https://developers.google.com/drive/web/quickstart/quickstart-js

[Search Parameters](https://developers.google.com/drive/web/search-parameters)

	var request = gapi.client.drive.files.list({'maxResults': 5 });

Useful Links

- [invalid_redirect_url](http://stackoverflow.com/a/12004469/253576)
	- Look in the oauth credentials for your project in the [Google Developer Console](https://console.developers.google.com):
	- On my system: JAVASCRIPT ORIGINS = [http://localhost:30025](https://www.example.com)
	- On My system: REDIRECT URIS = [http://localhost:30025/oauth2callback](https://www.example.com)
- [invalid_client error](http://stackoverflow.com/a/18951654/253576)
	- Again, on the Google Developer Console
	- Look at the Consent Screen.
	- Fill in your email and a name
	- My name was DriveSdkSheet_Calvert
