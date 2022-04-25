module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true,
        "jest": true,
        "jquery": true,
    },
    "extends": ["eslint:recommended", "plugin:jsx-a11y/recommended"],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": ["jsx-a11y"],
    "rules": {
        indent: ['error', 4],
    }
}
