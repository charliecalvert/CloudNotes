# Functional JavaScript

Learn about writing function code.

Functional code is:

- immutable
- stateless
- guaranteed, given specific inputs, to always create identical results

## Maps

We create a simple map like this:

```javascript
	getMap: function() { 'use strict';
		return this.deliciousLinks.map(function(link) {
			return { 'url': link.u };
		});
	}
```

This function takes the data in our deliciousLinks array of objects and converts it into a much simpler array of objects. In particular, the first two objects in our delicious data look like this:

```javascript
var deliciousLinks = [
	{
		"a": "charliecalvert",
		"d": "Elvenware JavaScript Home Page",
		"n": "",
		"u": "http://www.elvenware.com/charlie/development/web/JavaScript/",
		"t": [
			"javascript",
			"elvenware"
		],
		"dt": "2015-10-08T19:33:33Z"
	},
	{
		"a": "charliecalvert",
		"d": "Speaking JavaScript",
		"n": "",
		"u": "http://speakingjs.com/es5/index.html",
		"t": [
			"javascript",
			"books",
			"ebook",
			"learning"
		],
		"dt": "2015-10-04T04:16:39Z"
	}, etc...
```

After our map function runs, we have create a simplified array of objects that look like this:

```javascript
[
    {
        "url": "http://www.elvenware.com/charlie/development/web/JavaScript/"
    },
    {
        "url": "http://speakingjs.com/es5/index.html"
    }, etc...
```

We have converted an array of complex objects with six properties into an array of simple objects with only one property called **url**.

Once you understand the **map** function, it is easy to ceate more maps. For instance, here would be a method that maps both the **u** and the **a** properties of our original object in an object with two properties called **url** and **owner-name**:

```javascript
getOwnerNameMap: function() { 'use strict';
    return this.deliciousLinks.map(function(link) {
        return { 'url': link.u, 'owner-name': link.a };
    });
}
```

**NOTE**: *You can include the above method in **control.js** if you want, but it is not a necessary part of the assignment.*

The first two records in the array returned by the **getOwnerNameMap** function might look something like this:

```javascript
[
    {
        "url": "http://www.elvenware.com/charlie/development/web/JavaScript/",
        "owner-name": "charliecalvert"
    },
    {
        "url": "http://speakingjs.com/es5/index.html",
        "owner-name": "charliecalvert"
    }, etc...
```

## Another Example

Suppose we had only two members in our array:

```javascript
[
    {
        "Year": "2017",
        "Solar (quadrillion Btu)": "0.8045307",
        "Geothermal (quadrillion Btu)": "0.2349284",
        "Other biomass (quadrillion Btu)": "0.50916",
        "Wind power (quadrillion Btu)": "2.202328",
        "Liquid biofuels (quadrillion Btu)": "1.2329197",
        "Wood biomass (quadrillion Btu)": "1.9860924",
        "Hydropower (quadrillion Btu)": "2.5859957"
    },
    {
        "Year": "2016",
        "Solar (quadrillion Btu)": "0.6298938",
        "Geothermal (quadrillion Btu)": "0.232438",
        "Other biomass (quadrillion Btu)": "0.5113525",
        "Wind power (quadrillion Btu)": "2.0395132492",
        "Liquid biofuels (quadrillion Btu)": "1.2406718727",
        "Wood biomass (quadrillion Btu)": "1.9724914",
        "Hydropower (quadrillion Btu)": "2.5965158"
    }
]
```

Here is the method of **RenewablesUtls** that calls the built in JavaScript **map** function:

```javascript
this.getYears = function() {
    return renewables.map(function(renewable) {
        return renewable.Year;
    });
};
```

This method pulls our a single field from each member of our array of renewable objects array. In particular, it finds the Year field of each object in our array. The map method then creates an array consisting only of those fields. For instance, s
Our method would return this:

```javascript
[2017, 2016]
```

You can also return more complex arrays. For instance, you could return an array that looked like this:

```javascript
[
    { wood: "1.9860924" },
    { wood: "1.92724914" }
]
```

This might involve writing code like this:

```javascript
this.getWood = function() {
	return renewables.map(function(renewable) {
	    return { wood: renewable['Hydropower (quadrillion Btu)'] };
	});
}
```

You could test it something like this:

```javascript
it('proves we can get our wood map', function() {
    var woods = scope.renewableUtils.getWood();
    console.log(woods);
    expect(woods.length).toBe(12);
    expect(woods[11]).toEqual({ wood: '2.869035197' });
});
```
