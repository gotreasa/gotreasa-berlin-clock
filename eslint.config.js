import globals from 'globals';
import js from '@eslint/js';
import jestFormatting from 'eslint-plugin-jest-formatting';
import jest from 'eslint-plugin-jest';
import sonarjs from 'eslint-plugin-sonarjs';
import babelParser from '@babel/eslint-parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      parser: babelParser,
      sourceType: 'module',
      globals: {
        ...globals.jest,
        ...globals.node,
        ...globals.es2021,
        myCustomGlobal: 'readonly',
      },
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: ['@babel/plugin-syntax-import-assertions'],
        },
      },
    },
    ignores: ['.husky/_/**'],
    plugins: {
      jestFormatting: jestFormatting,
      jest: jest,
      sonarjs: sonarjs,
    },
    rules: {
      camelcase: 0,
      'jest/expect-expect': [
        'error',
        {
          assertFunctionNames: ['expect', 'request.**.expect'],
        },
      ],
      'jest/no-standalone-expect': [
        'error',
        {
          additionalTestBlockFunctions: ['Then', 'And'],
        },
      ],
      'no-underscore-dangle': 0,
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: 'next',
        },
      ],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: 'return',
          prev: '*',
        },
      ],
    },
  },
];
