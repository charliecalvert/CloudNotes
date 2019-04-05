```bash
mkdir Source
cd Source
elf-express eslint-test
cd eslint-test
npm i
```

Make sure **.bowerrc** looks like this:

```json
{
  "directory": "public/bower_components"
}
```

make sure .pretterignore has **bower_components**. Like this:

```code
**/build/**
**/bower_components/**
**/serviceWorker.js
```

```code
bower install
npm run build
npm start
```

Browse to http://localhost:30025

Run **get-gist**. From the menu choose option A

Run:

```code
./prettier
eslint .
```

Eslint should be clean

In WebStorm, choose **File | Settings**. Go to **Languages and Frameworks | JavaScript | Code Quality tools**, and turn on EsLint: **Manual Eslint Configuration** and then set the path EsLint config to:

		~/npm/lib/node_modules/eslint
		
