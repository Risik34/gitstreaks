module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows modern ECMAScript features
    sourceType: 'module', // Allows the use of imports
    ecmaFeatures: {
      jsx: true, // Enables JSX if you're using React
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells ESLint to automatically detect the version of React to use
    },
  },
  extends: [
    'eslint:recommended', // Uses the recommended rules from ESLint
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
  ],
  plugins: [
    '@typescript-eslint', // Uses the TypeScript plugin
  ],
  rules: {
    // Custom rules can be added here
    'no-console': 'warn', // Warns on console logs
    'no-unused-vars': 'warn', // Warns on unused variables
    '@typescript-eslint/no-explicit-any': 'warn', // Warns against using the 'any' type
    'prettier/prettier': 'error', // Ensures Prettier formatting
  },
  env: {
    browser: true, // Allows browser global variables
    es2021: true, // Allows ES2021 features
  },
};
