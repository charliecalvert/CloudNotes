## Description

- Mongoose Slides: [http://bit.ly/elf-mongoose](http://bit.ly/elf-mongoose)
- [Prog219 Resources](http://www.ccalvert.net/books/CloudNotes/Prog219/Prog219-Resources.html)
- [MongooseBasics assignment][mb].

## Mongoose Updates

In **modules/scientists**, the **subjects** array should look like this: [String].

```
var scientistsSchema = mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "subject": String,
    "subjects": [String],
    comments: [{ body: String, date: Date }]
});
```

You should be able to make this change without modifying the rest of your code.

[mb]: http://www.ccalvert.net/books/CloudNotes/Assignments/MongooseBasics.html 