- Jest Deck [http://bit.ly/jest-cra](http://bit.ly/jest-cra)
- [React Tutorial][rt]

From the root of your project:

```nohighlighting
npm install --save-dev jest enzyme-adapter-react-16
npm install --save-dev react-test-renderer enzyme
mkdir source/__tests__
ln -s node_modules/.bin/jest .
```

A **.babelrc** file:

```javascript
{
  "presets": ["env", "react"]
}
```

## ElfDebugEnzyme

Find it [here][ed].

Or choose the **Raw** view of the code on GitHub, and then:

```
cd source
wget <THE LONG URL FROM RAW VIEW>
cd1
```

## NPM

In **package.json** rename old **test** script to **karma-test** and set up **test** script:

```
"scripts": {
    "test": "jest",
    "karma-test": "karma start",
    "start": "nodemon ./bin/www",
    "bundle": "node_modules/.bin/webpack"
},
```

## Update

Get the latest packages:

```nohighlighting
npm install -g npm-check-updates
ncu
ncu -a
npm update
```
[rt]: http://facebook.github.io/jest/docs/en/tutorial-react.html
[ed]: https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab
