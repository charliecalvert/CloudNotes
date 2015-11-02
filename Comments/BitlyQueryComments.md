## Overview

Notes on BitlyQuery.

## Displaying the Data

There is no necessity to do this, but if you want to display the **bitly-links.json** data, do something like this in **control.js**:

```javascript

var bitlyUrlParser = {

    bitlyLinks: null,

    getUrl: function(accessToken) {
        'use strict';

        var baseUrl = 'https://api-ssl.bitly.com/v3/user/link_history';
        var params = '?access_token=';

        if (accessToken === -1) {
            return 'data/bitly-links.json';
        } else {
            var url = baseUrl + params;
            return url += accessToken;
        }
    },

    getBitlyLinks: function(accessToken) {
        'use strict';

        var url = bitlyUrlParser.getUrl(accessToken);

        $.getJSON(url, function(result) {
            bitlyUrlParser.bitlyLinks = result;
            $('#displayLinks').html(JSON.stringify(result, null, 4));
        }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log('Request Failed: ' + err);
            console.log('url:', url);
        });
    },

    // CODE OMITTED HERE
};

$(document).ready(function() {
    'use strict';
    bitlyUrlParser.getBitlyLinks(-1);
});

```

**displayLinks** should be an HTML PRE tag.

```jade
+elfPanel("Optional Output to show we can load data from disk.")
    .output
        pre#displayLinks
```

## Status Code and Status Text

These methods should be declared inside our **bitlyUrlParser:**. Be sure you don't accidentally declare them outside the object:

```javascript

var bitlyUrlParser = {

    // CODE OMITTED HERE

    getStatusCode: function() {
        'use strict';
        return bitlyUrlParser.bitlyLinks.status_code;
    },

    getStatusText: function() {
        'use strict';
        return bitlyUrlParser.bitlyLinks.status_txt;
    },

    // CODE OMITTED HERE
};
```

## Get Link History

Though we will change this method in later versions of this program, for now, this is how to get the link history:

```javascript

var bitlyUrlParser = {

    // CODE OMITTED HERE

    getLinkHistory: function(index) {
        'use strict';
        return bitlyUrlParser.bitlyLinks.data.link_history[index];
    },

    // CODE OMITTED HERE

};
```

## Get the map

The map function can help us transform data from one format to another. Often, when you query a web service, they send you data in a format that is not very convenient. The JavaScript **map** function can help you transform the data from an awkward format to one that can be easily consumed by your program.

```javascript
var bitlyUrlParser = {

    // CODE OMITTED HERE


    getMap: function() {
        'use strict';
        return bitlyUrlParser.bitlyLinks.data.link_history.map(function(history) {
            var myDate = new Date(history.created_at * 1000);
            return {
                title: history.title,
                link: history.link,
                created_at: myDate.toLocaleString()
            };
        });
    }

    // CODE OMITTED HERE
};
```

The objects in the array returned by this method have three properties:

- title
- link
- created-at

Like this 

``` javascript
{
	title: "My Title",
    link: "http://foo.com",
    created-at: 234324342 }
}
```

## Include Two New Tests

No one loses points for not including these, but these two tests help ensure that **getBitlyLinks** and **getUrl** are implemented properly. I'll just give you the whole of the **Test Bitly Suite**:

```javascript
describe('Test Bitly Suite', function() {
    'use strict';

    var accessToken = '2ac4b4ccf91019cff6a6b3f23bcbe05ec2bf7a8c';

    it('gets a url', function() {
        var url = bitlyUrlParser.getUrl(accessToken);

        expect(url).toBeTruthy();
        expect(url).toContain(accessToken);
        expect(url).toContain('https');
    });

    it('tests the local url we pass to getBitlyLinks', function() {
        var finalUrl;

        spyOn($, 'getJSON').and.callFake(function(url, success) {
            finalUrl = url;
            success(bitlyLinks);
            return {
                fail: function() {}
            };
        });

        bitlyUrlParser.getBitlyLinks(-1);
        expect(finalUrl).toBe('data/bitly-links.json');
    });

    it('tests the accesstoken url we pass to getBitlyLinks', function() {
        var finalUrl;

        spyOn($, 'getJSON').and.callFake(function(url, success) {
            finalUrl = url;
            success(bitlyLinks);
            return {
                fail: function() {}
            };
        });

        bitlyUrlParser.getBitlyLinks(accessToken);
        expect(finalUrl).toContain(accessToken);
        expect(finalUrl).toContain('https');
    });

});
```