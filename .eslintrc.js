module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:vue/essential',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-var': 'error',
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info'],
      },
    ],
    'no-debugger': 'warn',
    semi: 'off',

    // typescript related rules
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    // not ok
    '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',

    // template related rules
    'vue/html-indent': [
      'warn',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    // 'vue/max-attributes-per-line': [
    //   'warn',
    //   {
    //     singleline: {
    //       max: 3,
    //     },
    //     multiline: {
    //       max: 3,
    //     },
    //   },
    // ],
    'vue/component-name-in-template-casing': [
      'warn',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: [],
      },
    ],
  },
};
