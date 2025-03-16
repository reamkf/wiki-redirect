module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // React関連のルール
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',

    // 一般的なルール
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-undef': 'error',

    // JSX関連のルール
    'jsx-quotes': ['error', 'prefer-double'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.jsx', '*.js'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};