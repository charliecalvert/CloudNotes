# React ESLint

Turn on EsLint. I have been very slow to reach this conclusion, even though some of you have tried to tell me this for some time. At any rate, my current thinking is that we should use EsLint, and EsLint only, to lint our React programs. You can, therefore, turn off JsHint and JSCS. You only need to be running eslint.

Install some stuff:

```
npm install --save-dev eslint
npm install --save-dev eslint-plugin-react
npm install --save-dev babel-eslint
```

Or:

```
npm install --save-dev eslint eslint-plugin-react babel-eslint
```

Perhaps it would make sense to install these globally, but for now, I'm doing it on a per-project basis. If you want to install it globally, try these commands:

```nohighlighting
npm i -g eslint
npm i -g eslint-plugin-react
npm i -g eslint-plugin-requirejs
npm i -g babel-eslint
```

Read here [for more details](https://www.npmjs.com/package/eslint).

## RC File

And here is at least a starter **.eslintrc** file:

```
{
    "plugins": [ "react", "requirejs" ],
    "rules": {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/react-in-jsx-scope": "error",
        "no-console": "off",
        "indent": "error",
        "quotes": ["error", "single"],
        "linebreak-style": ["error", "unix"],
        "semi": ["error", "always"]
    },
    "env": {
        "amd": true,
        "browser": true,
        "es6": true,
        "jest": true,
        "node": true,
        "jquery": true
    },

    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": { "jsx": true }
    },
    "extends": "eslint:recommended"
}
```

## Arrow Functions

I'm not clear about this. Set "parser": "babel-eslint" in **.eslintrc** to allow arrow functions.

## Run from command line

Assuming your ES6 code is in a directory called **source**, do one of these, where the first is for the global install, and the second is for the local install:

    eslint source
    ./node_modules/.bin/eslint source/

Also, consider putting it in your **package.json** file in the **scripts** section. For instance you might write something like this in one of your **package.json** files:

```javascript
"scripts": {
    "start": "DEBUG=firebase-express:server nodemon ./bin/www",
    "bundle": "node_modules/.bin/webpack --watch",
    "lint": "./node_modules/.bin/eslint source/**"
},
```

When I ran **npm run lint**, it worked, but NPM reports an error until I get all the eslint errors and warnings out of my code. Then it returns cleanly. Before that, I see the results of my tests, but NPM reports an error

## Turn it in

Just point me at your midterm, final, or some appropriate project. When I open it, I'll expect to see a **.eslintrc** file and have most of the files relatively error free in terms of eslint errors.
