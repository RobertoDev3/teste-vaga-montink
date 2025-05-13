import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      'react/jsx-props-no-spreading': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'react/prop-types': 'off',
      'import/no-duplicates': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'import/prefer-default-export': 'off',
      '@typescript-eslint/camelcase': 'off',
      'import/no-anonymous-default-export': [
        'warn',
        { allowObject: true, allowArrowFunction: true },
      ],
      semi: ['error'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      'prefer-arrow-callback': ['error'],
      'prefer-template': ['error'],
    },
  }),
];

export default eslintConfig;
