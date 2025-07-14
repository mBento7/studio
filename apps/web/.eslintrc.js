module.exports = {
  extends: [
    'next/core-web-vitals'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [],
  rules: {
    // Regras básicas para evitar problemas comuns
    'no-console': ['warn', {
      allow: ['warn', 'error']
    }],
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'no-duplicate-imports': 'error',
    'no-unreachable': 'error',
    'no-unused-expressions': 'error',
    'no-useless-return': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxEOF: 0,
      maxBOF: 0
    }],
    'eol-last': 'error',
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true
    }],
    'indent': ['error', 2, {
      SwitchCase: 1
    }]
  },
  
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'build/',
    'dist/',
    '*.config.js',
    '*.config.mjs',
    'public/',
    '.genkit/'
  ]
};