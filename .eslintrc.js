module.exports = {
  "extends": "airbnb-base",
  "rules": {
  "no-underscore-dangle": [2, { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }],
  "comma-dangle": ["error", {
    "arrays": "never",
    "objects": "always",
    "imports": "never",
    "exports": "never",
    "functions": "ignore"
  }],
  }
};