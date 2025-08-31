import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImportX from 'eslint-plugin-import-x';
import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
    },
  },

  {
    files: ['**/*.ts'],
    plugins: {
      'import-x': eslintPluginImportX,
    },
    settings: {
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
      'import-x/resolver': {
        typescript: {
          project: ['tsconfig.base.json'],
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      'import-x/no-cycle': 'error',
      'import-x/order': [
        'error',
        {
          'newlines-between': 'always',
          named: true,
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/attributes-order': ['error'],
    },
  },

  eslintConfigPrettier,
];
