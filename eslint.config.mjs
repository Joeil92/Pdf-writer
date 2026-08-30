import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import unicorn from 'eslint-plugin-unicorn'
import boundaries from 'eslint-plugin-boundaries'
import globals from 'globals'

export default tseslint.config(
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      unicorn
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase'
        }
      ]
    },
    settings: {
      react: { version: 'detect' }
    }
  },
  {
    files: ['src/renderer/src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: { project: 'tsconfig.web.json' }
      },
      'boundaries/root-path': 'src/renderer/src',
      'boundaries/elements': [
        { type: 'app', pattern: 'app', capture: [] },
        { type: 'pages', pattern: 'pages/*', capture: ['slice'] },
        { type: 'widgets', pattern: 'widgets/*', capture: ['slice'] },
        { type: 'features', pattern: 'features/*', capture: ['slice'] },
        { type: 'entities', pattern: 'entities/*', capture: ['slice'] },
        { type: 'shared', pattern: 'shared/*', capture: ['segment'] }
      ]
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'app' } },
              allow: {
                to: {
                  element: {
                    types: { anyOf: ['pages', 'widgets', 'features', 'entities', 'shared'] }
                  }
                }
              }
            },
            {
              from: { element: { type: 'pages' } },
              allow: {
                to: {
                  element: { types: { anyOf: ['widgets', 'features', 'entities', 'shared'] } }
                }
              }
            },
            {
              from: { element: { type: 'widgets' } },
              allow: {
                to: { element: { types: { anyOf: ['features', 'entities', 'shared'] } } }
              }
            },
            {
              from: { element: { type: 'features' } },
              allow: {
                to: { element: { types: { anyOf: ['entities', 'shared'] } } }
              }
            },
            {
              from: { element: { type: 'entities' } },
              allow: { to: { element: { type: 'shared' } } }
            },
            {
              from: { element: { type: 'shared' } },
              allow: { to: { element: { type: 'shared' } } }
            }
          ]
        }
      ]
    }
  },
  eslintConfigPrettier
)
