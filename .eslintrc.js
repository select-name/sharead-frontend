/** Разрешенные импорты (с публичными API) */
const ALLOWED_PATH_GROUPS = ["pages/**", "features/**", "entities/**", "shared/**"].map(
    (pattern) => ({
        pattern,
        group: "internal",
        position: "after",
    }),
);
/** Для запрета приватных путей */
const DENIED_PATH_GROUPS = [
    // Private imports are prohibited, use public imports instead
    "app/**",
    "pages/*/**",
    "features/*/**",
    "entities/*/**",
    "shared/*/**",
    // Prefer absolute imports instead of relatives (for root modules)
    "../**/app",
    "../**/pages",
    "../**/features",
    "../**/entities",
    "../**/shared",
];

// TODO: Заэкстендить позднее
module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
        sourceType: "module",
    },
    env: {
        browser: true,
        es6: true,
    },
    plugins: ["react", "@typescript-eslint", "unicorn"],
    extends: [
        "react-app",
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "prettier",
    ],
    rules: {
        // imports
        "import/first": 2,
        "import/no-unresolved": 0,
        // TODO: eslint-plugin-boundaries
        "import/order": [
            2,
            {
                pathGroups: ALLOWED_PATH_GROUPS,
                pathGroupsExcludedImportTypes: ["builtin"],
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            },
        ],
        "no-restricted-imports": [2, { patterns: DENIED_PATH_GROUPS }],
        // variables
        "prefer-const": 2,
        "no-var": 2,
        // base
        "camelcase": [1, { ignoreDestructuring: true, ignoreImports: true, properties: "never" }],
        "no-else-return": 2,
        "max-len": [1, { code: 120 }],
        "dot-notation": 2,
        "eol-last": 2,
        // alert, console
        "no-alert": 2,
        "no-console": 2,
        // equals
        "eqeqeq": 1,
        "no-eq-null": 2,
        // function
        "max-params": [1, 2],
        "max-lines-per-function": [1, 48],
        "arrow-parens": [2, "always"],
        // "arrow-body-style": [1, "as-needed"],
        // plugin:unicorn
        "unicorn/no-for-loop": 2,
        "unicorn/no-abusive-eslint-disable": 2,
        "unicorn/no-array-instanceof": 2,
        "unicorn/no-zero-fractions": 2,
        "unicorn/prefer-includes": 2,
        "unicorn/prefer-text-content": 2,
        "unicorn/import-index": 2,
        "unicorn/throw-new-error": 2,
        // plugin: react
        "react/jsx-uses-react": 0,
        "react/react-in-jsx-scope": 0,
        "react/prop-types": 0,
        "no-restricted-globals": 1,
    },
    overrides: [],
};
