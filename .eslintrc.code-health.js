module.exports = {
  extends: [
    // Suas configurações existentes
    './.eslintrc.js'
  ],
  rules: {
    // Regras para detectar código não utilizado
    '@typescript-eslint/no-unused-vars': ['error', {
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'ignoreRestSiblings': true
    }],
    
    // Detecta imports não utilizados
    'no-unused-vars': 'off', // Desabilita a regra JS em favor da TS
    
    // Detecta imports duplicados
    'import/no-duplicates': 'error',
    
    // Ordena imports
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always',
      'alphabetize': {
        'order': 'asc',
        'caseInsensitive': true
      }
    }],
    
    // Detecta imports de desenvolvimento em produção
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': [
        '**/*.test.{ts,tsx,js,jsx}',
        '**/*.spec.{ts,tsx,js,jsx}',
        '**/*.stories.{ts,tsx,js,jsx}',
        '**/*.config.{ts,js}',
        '**/jest.setup.{ts,js}',
        '**/vitest.setup.{ts,js}'
      ]
    }],
    
    // Detecta console.log esquecidos
    'no-console': ['warn', {
      'allow': ['warn', 'error']
    }],
    
    // Detecta debugger esquecidos
    'no-debugger': 'error',
    
    // Detecta código morto
    'no-unreachable': 'error',
    'no-unused-expressions': 'error'
  },
  
  // Configurações específicas para diferentes tipos de arquivo
  overrides: [
    {
      files: ['**/*.test.{ts,tsx,js,jsx}', '**/*.spec.{ts,tsx,js,jsx}'],
      rules: {
        // Permite console em testes
        'no-console': 'off'
      }
    },
    {
      files: ['**/*.stories.{ts,tsx,js,jsx}'],
      rules: {
        // Permite imports de desenvolvimento em stories
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ]
};
