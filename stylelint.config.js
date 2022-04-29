module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recess-order',
    'stylelint-config-standard-scss',
    // 'stylelint-config-prettier-scss',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'max-nesting-depth': 3,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['/./', 'v-deep', '-webkit-'],
      },
    ],
    'color-hex-case': 'upper',

    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};
