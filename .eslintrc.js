module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "unused-imports", "prefer-arrow", "import"],
  rules: {
    "react/jsx-uses-react": "warn",
    "react/jsx-uses-vars": "warn",
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    "no-console": "warn",
    "no-debugger": "warn",
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    "no-trailing-spaces": "error",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    "arrow-body-style": ["warn", "as-needed"],
    "sort-imports": ["warn", { ignoreCase: true, ignoreDeclarationSort: true }],
  },

  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
};
