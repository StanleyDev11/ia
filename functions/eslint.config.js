// eslint.config.js (à placer dans le dossier `functions/`)

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: {
        name: "readonly",
        length: "readonly",
      },
      env: {
        es6: true,
        node: true,
      },
    },
    plugins: {
      // eslint plugins can be added here if needed
    },
    rules: {
      "no-restricted-globals": ["error", "name", "length"],
      "prefer-arrow-callback": "error",
      "quotes": ["error", "double", { allowTemplateLiterals: true }],
    },
  },
  {
    files: ["**/*.spec.*"],
    languageOptions: {
      env: {
        mocha: true,
      },
    },
    rules: {
      // rules specific to test files
    },
  },
];
