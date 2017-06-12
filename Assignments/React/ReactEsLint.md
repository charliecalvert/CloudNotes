# React ESLint

Turn on EsLint

Install some stuff:

```
npm install eslint --save-dev
npm install eslint-plugin-react --save-dev
```

And

```
{
    "plugins": [ "react" ],
    "rules": {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/react-in-jsx-scope": "error",
        "no-console": "warn",
        "indent": "error",
        "quotes": ["error", "single"],
        "linebreak-style": ["error", "unix"],
        "semi": ["error", "always"]
    },
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
        "node": true
    },
    "ecmaFeatures": {
        "experimentalObjectRestSpread": true
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": { "jsx": true }
    },
    "extends": "eslint:recommended"
}
```

## Arrow Functions

Set "parser": "babel-eslint" in .eslintrc to allow arrow functions.
