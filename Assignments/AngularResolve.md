# AngularResolve

This was the project we worked on in class on Wednesday, Nov 19.

Include the following elements:

- Angular Module
- Angular Config
- Angular controller
- Angular Resolve with promise 
- Angular $routeProvider with HTML template
- Convert CSV to JSON. (See 
- Server side connection to CouchDb

See also this video: [AngularResolve](http://youtu.be/kjdpswy9xJk)

## CSV Portion

Create a spreadsheet. Enter three rows of data:

- NpcName
- NpcValue
- Description

Save to CSV. Import into Angular Resolve, doing the transformation on the client side.

Put the Json data from the CSV in CouchDb. Load data from CouchDb.

I believe the code (from the GameData01 assignment) looked something like this:

```
    var csv = fs.readFileSync(filename).toString().split("\n");
    var json = [];
    var tokens = csv[0].split(spl=itChar);
    console.log(tokens);
    for(var i=1;i < csv.length;i++) {
	var content = csv[i].split(splitChar);
	var tmp = {};
	for(var j=0; j < tokens.length; j++) {
		try {
			tmp[tokens[j]] = content[j];
		} catch(err) {
			tmp[tokens[j]] = "";
		}
	}
	json.push(tmp);
    }
```

## CouchDb

Create the same or similar data in a couchdb database called angular_resolve_lastname, where lastname is your last name in lower case letters.

## Turn it in

Put your work in a Git folder called Week09_AngularResolve. Check it in.