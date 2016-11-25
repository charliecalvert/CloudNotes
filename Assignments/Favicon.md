Create a custom Favicon and get it going on both EC2 and FireBase. Don't just reuse my icon, create a custom icon of your own design.

Put your icon (in PNG format) in the images directory of your repository. Submit, on the text page, the live URLs for both your sites.

In your config file, add this line:

"most-recent-date": "1980-01-01",

Like this:

```json
{
  "calvert": {
    "base-dir": "/home/bcuser/",
    "bootswatch": "superhero",
    "most-recent-date": "1980-01-01",
    "site-dirs": [
      "Documents/AllTest",
      "Documents/AllSite"
    ],
    "destination-dirs": [
      "/home/bcuser/Source/firebase/public/",
      "/var/www/html/",      
      "/home/bcuser/Source/firetest/public/",      
      "/home/bcuser/temp/test-site/"
    ]
  }
}
```
