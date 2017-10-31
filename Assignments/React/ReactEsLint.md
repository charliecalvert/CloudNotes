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

Perhaps it would make sense to install these globally, but for now, I'm doing it on a per-project basis.

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

I'm not clear about this. Set "parser": "babel-eslint" in .eslintrc to allow arrow functions.

## Turn it in

Just point me at your final, where I expect to see a **.eslintrc** file.
