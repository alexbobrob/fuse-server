module.exports = {
    env: {
        node: true,
        commonjs: true,
        es6: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-console': 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        // Best Practices
        eqeqeq: 'error',
        'no-invalid-this': 'error',
        'no-return-assign': 'error',
        'no-unused-expressions': ['error', { allowTernary: true }],
        'no-useless-concat': 'error',
        'no-useless-return': 'error',

        // Variable
        'no-use-before-define': 'error',

        // Stylistic Issues
        'array-bracket-newline': ['error', { multiline: true, minItems: null }],
        'array-bracket-spacing': 'error',
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'block-spacing': 'error',
        'comma-dangle': 'error',
        'comma-spacing': 'error',
        'comma-style': 'error',
        'computed-property-spacing': 'error',
        'func-call-spacing': 'error',
        'implicit-arrow-linebreak': ['error', 'beside'],
        'keyword-spacing': 'error',
        'multiline-ternary': ['error', 'never'],
        'no-mixed-operators': 'error',
        'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
        'no-tabs': 'error',
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        'nonblock-statement-body-position': 'off',
        'object-property-newline': [
            'error',
            { allowAllPropertiesOnSameLine: true },
        ],
        'quote-props': ['error', 'as-needed'],
        semi: ['error', 'never'],
        'semi-spacing': 'error',
        'space-before-blocks': 'error',
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',

        // ES6
        'arrow-spacing': 'error',
        'no-confusing-arrow': 'error',
        'no-duplicate-imports': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-const': 'error',
        'prefer-template': 'error',

        // Others
        'consistent-return': 'off',
    },
}
