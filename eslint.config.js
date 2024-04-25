import globals from 'globals';
import js from '@eslint/js';
import jestFormatting from 'eslint-plugin-jest-formatting';
import jest from 'eslint-plugin-jest';
import sonarjs from 'eslint-plugin-sonarjs';

// export default {
//   languageOptions: {
//     ecmaVersion: 2024,
//     sourceType: "module",
//     globals: {
//         ...globals.jest,
//         ...globals.node,
//         ...globals.es2021,
//         myCustomGlobal: "readonly"
//     }
//   },
//   // "extends": [
//   //   "airbnb-base",
//   //   "plugin:jest/recommended",
//   //   "plugin:jest-formatting/recommended",
//   //   "plugin:jest/style",
//   //   "plugin:sonarjs/recommended",
//   //   // https://github.com/prettier/eslint-config-plugin
//   //   // by adding this config last, we can overwrite any other styling rules from eslint configs
//   //   "plugin:prettier/recommended"
//   // ],
//   "plugins": ["jest-formatting", "jest", "sonarjs"],
//   "rules": {
//     "camelcase": 0,
//     "jest/expect-expect": [
//       "error",
//       {
//         "assertFunctionNames": ["expect", "request.**.expect"]
//       }
//     ],
//     "jest/no-standalone-expect": [
//       "error",
//       {
//         "additionalTestBlockFunctions": ["Then", "And"]
//       }
//     ],
//     "no-underscore-dangle": 0,
//     "no-unused-vars": [
//       "error",
//       {
//         "argsIgnorePattern": "next"
//       }
//     ],
//     "padding-line-between-statements": [
//       "error",
//       {
//         "blankLine": "always",
//         "next": "return",
//         "prev": "*"
//       }
//     ]
//   }
// }
export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.jest,
        ...globals.node,
        ...globals.es2021,
        myCustomGlobal: 'readonly',
      },
    },

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
