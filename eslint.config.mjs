import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Configuration de base Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Configuration globale
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        // Node.js globals
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        global: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  
  // Règles TypeScript strictes
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // TypeScript strict
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-unnecessary-type-arguments": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": false,
          "ts-nocheck": false,
          "ts-check": false,
        },
      ],
    },
  },
  
  // Règles React strictes
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      // React strict
      "react/jsx-no-useless-fragment": "off",
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-uses-react": "off", // Pas nécessaire avec React 17+
      "react/jsx-uses-vars": "error",
      "react/no-array-index-key": "warn",
      "react/no-danger": "warn",
      "react/no-deprecated": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-find-dom-node": "error",
      "react/no-is-mounted": "error",
      "react/no-render-return-value": "error",
      "react/no-string-refs": "error",
      "react/no-unescaped-entities": "off", // Permettre les entités non échappées
      "react/no-unknown-property": "error",
      "react/no-unsafe": "warn",
      "react/self-closing-comp": "error",
      "react/sort-comp": "off", // Désactivé car trop restrictif
      "react/void-dom-elements-no-children": "error",
      "react/jsx-key": "error",
      "react/jsx-no-comment-textnodes": "error",
      "react/jsx-no-target-blank": "error",
      "react/jsx-pascal-case": "error",
      "react/jsx-props-no-spreading": "warn",
      "react/jsx-sort-props": "off", // Désactivé car trop restrictif
      "react/jsx-space-before-closing": "off", // Désactivé car obsolète
      "react/jsx-uses-react": "off",
      "react/jsx-wrap-multilines": "error",
      "react/no-access-state-in-setstate": "error",
      "react/no-children-prop": "error",
      "react/no-danger-with-children": "error",
      "react/no-will-update-set-state": "error",
      "react/require-default-props": "off", // Désactivé car TypeScript gère ça
      "react/require-optimization": "off", // Désactivé car trop restrictif
      "react/forbid-component-props": "off", // Désactivé car trop restrictif
      "react/forbid-dom-props": "off", // Désactivé car trop restrictif
      "react/forbid-elements": "off", // Désactivé car trop restrictif
      "react/forbid-foreign-prop-types": "off", // Désactivé car TypeScript gère ça
      "react/forbid-prop-types": "off", // Désactivé car TypeScript gère ça
      "react/no-multi-comp": "off", // Désactivé car trop restrictif
      "react/no-set-state": "off", // Désactivé car trop restrictif
      "react/prefer-es6-class": "error",
      "react/prefer-stateless-function": "warn",
      "react/prop-types": "off", // Désactivé car TypeScript gère ça
      "react/react-in-jsx-scope": "off", // Pas nécessaire avec React 17+
      "react/require-render-return": "error",
      "react/sort-prop-types": "off", // Désactivé car obsolète
      "react/style-prop-object": "error",
    },
  },
  
  // Règles générales strictes
  {
    rules: {
      // Variables et scope
      "no-var": "error",
      "prefer-const": "error",
      "no-const-assign": "error",
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "no-dupe-else-if": "error",
      "no-duplicate-case": "error",
      "no-duplicate-imports": "off", // Géré par TypeScript
      "no-unused-vars": "off", // Géré par TypeScript
      "no-undef": "off",
      "no-use-before-define": "off",
      
      // Fonctions
      "no-func-assign": "error",
      "no-import-assign": "error",
      "no-param-reassign": "error",
      "prefer-arrow-callback": "error",
      "arrow-spacing": "error",
      "no-confusing-arrow": "error",
      "no-useless-constructor": "error",
      "no-useless-return": "error",
      
      // Objets et arrays
      "no-array-constructor": "error",
      "no-new-object": "error",
      "object-shorthand": "error",
      "prefer-object-spread": "error",
      "no-obj-calls": "error",
      
      // Strings
      "no-new-wrappers": "error",
      "prefer-template": "error",
      "template-curly-spacing": "error",
      
      // Numbers
      "no-new": "error",
      "no-octal": "error",
      "no-octal-escape": "error",
      "radix": "off",
      
      // Control flow
      "no-case-declarations": "error",
      "no-empty": "off",
      "no-empty-character-class": "error",
      "no-empty-pattern": "error",
      "no-fallthrough": "error",
      "no-irregular-whitespace": "error",
      "no-redeclare": "error",
      "no-sparse-arrays": "error",
      "no-unreachable": "error",
      "no-unreachable-loop": "error",
      "use-isnan": "error",
      "valid-typeof": "error",
      
      // Best practices
      "accessor-pairs": "error",
      "array-callback-return": "error",
      "block-scoped-var": "error",
      "class-methods-use-this": "warn",
      "complexity": ["warn", 10],
      "consistent-return": "off",
      "curly": "error",
      "default-case": "off",
      "default-case-last": "error",
      "dot-location": ["error", "property"],
      "dot-notation": "error",
      "eqeqeq": "error",
      "grouped-accessor-pairs": "error",
      "guard-for-in": "error",
      "max-classes-per-file": ["warn", 1],
      "no-alert": "warn",
      "no-caller": "error",
      "no-console": "warn",
      "no-delete-var": "error",
      "no-div-regex": "error",
      "no-else-return": "error",
      "no-eval": "error",
      "no-extend-native": "error",
      "no-extra-bind": "error",
      "no-extra-boolean-cast": "error",
      "no-extra-label": "error",
      "no-extra-semi": "error",
      "no-floating-decimal": "error",
      "no-global-assign": "error",
      "no-implied-eval": "error",
      "no-invalid-this": "error",
      "no-iterator": "error",
      "no-labels": "error",
      "no-lone-blocks": "error",
      "no-lonely-if": "off",
      "no-loop-func": "error",
      "no-magic-numbers": "off", // Désactivé car trop restrictif
      "no-mixed-operators": "off",
      "no-mixed-spaces-and-tabs": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
      "no-multi-spaces": "error",
      "no-multi-str": "error",
      "no-new": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-octal": "error",
      "no-octal-escape": "error",
      "no-param-reassign": "error",
      "no-proto": "error",
      "no-redeclare": "error",
      "no-return-assign": "error",
      "no-return-await": "off",
      "no-script-url": "error",
      "no-self-assign": "error",
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "no-unmodified-loop-condition": "error",
      "no-unused-expressions": "error",
      "no-unused-labels": "error",
      "no-useless-call": "error",
      "no-useless-catch": "error",
      "no-useless-concat": "error",
      "no-useless-escape": "error",
      "no-useless-return": "error",
      "no-void": "error",
      "no-warning-comments": "warn",
      "no-with": "error",
      "prefer-named-capture-group": "off",
      "prefer-promise-reject-errors": "error",
      "prefer-regex-literals": "error",
      "require-await": "off",
      "require-unicode-regexp": "warn",
      "vars-on-top": "error",
      "wrap-iife": "error",
      "yoda": "error",
      
      // Style
      "quotes": "off",
      "camelcase": "off",
      "indent": "off",
      "no-nested-ternary": "off",
      "no-plusplus": "off",
      "lines-around-directive": "off",
      "array-bracket-newline": ["error", "consistent"],
      "array-bracket-spacing": "error",
      "array-element-newline": "off", // Désactivé car trop restrictif
      "arrow-spacing": "error",
      "block-spacing": "error",
      "brace-style": "error",
      "capitalized-comments": "off", // Désactivé car trop restrictif
      "comma-dangle": ["error", "always-multiline"],
      "comma-spacing": "error",
      "comma-style": "error",
      "computed-property-spacing": "error",
      "consistent-this": "error",
      "eol-last": "error",
      "func-call-spacing": "error",
      "func-name-matching": "error",
      "func-names": "off", // Désactivé car trop restrictif
      "func-style": "off", // Désactivé car trop restrictif
      "function-paren-newline": "off", // Désactivé car trop restrictif
      "id-blacklist": "off", // Désactivé car obsolète
      "id-length": "off", // Désactivé car trop restrictif
      "id-match": "off", // Désactivé car trop restrictif
      "implicit-arrow-linebreak": "off", // Désactivé car trop restrictif
      "indent-legacy": "off", // Désactivé car obsolète
      "init-declarations": "off", // Désactivé car trop restrictif
      "jsx-quotes": "error",
      "key-spacing": "error",
      "keyword-spacing": "error",
      "line-comment-position": "off", // Désactivé car trop restrictif
      "linebreak-style": "off", // Désactivé car dépend du système
      "lines-around-comment": "off", // Désactivé car trop restrictif
      "lines-between-class-members": "error",
      "max-depth": ["warn", 4],
      "max-len": ["warn", 100],
      "max-lines": "off", // Désactivé car trop restrictif
      "max-lines-per-function": "off", // Désactivé car trop restrictif
      "max-nested-callbacks": "off", // Désactivé car trop restrictif
      "max-params": "off", // Désactivé car trop restrictif
      "max-statements": "off", // Désactivé car trop restrictif
      "max-statements-per-line": "error",
      "multiline-comment-style": "off", // Désactivé car trop restrictif
      "multiline-ternary": "off",
      "new-cap": "off",
      "new-parens": "error",
      "newline-after-var": "off", // Désactivé car obsolète
      "newline-before-return": "off", // Désactivé car trop restrictif
      "newline-per-chained-call": "off", // Désactivé car trop restrictif
      "no-array-constructor": "error",
      "no-bitwise": "error",
      "no-continue": "error",
      "no-inline-comments": "off", // Désactivé car trop restrictif
      "no-lonely-if": "off",
      "no-mixed-operators": "off",
      "no-mixed-spaces-and-tabs": "error",
      "no-multi-assign": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
      "no-negated-condition": "warn",
      "no-restricted-syntax": "error",
      "no-tabs": "error",
      "no-ternary": "off", // Désactivé car trop restrictif
      "no-trailing-spaces": "error",
      "no-underscore-dangle": "off", // Désactivé car trop restrictif
      "no-unneeded-ternary": "error",
      "no-whitespace-before-property": "error",
      "nonblock-statement-body-position": "error",
      "object-curly-newline": "off", // Désactivé car trop restrictif
      "object-curly-spacing": "error",
      "object-property-newline": "off", // Désactivé car trop restrictif
      "object-shorthand": "error",
      "one-var": "off", // Désactivé car trop restrictif
      "one-var-declaration-per-line": "error",
      "operator-assignment": "error",
      "operator-linebreak": "off", // Désactivé car trop restrictif
      "padded-blocks": "off", // Désactivé car trop restrictif
      "padding-line-between-statements": "off", // Désactivé car trop restrictif
      "prefer-object-spread": "error",
      "quote-props": ["error", "as-needed"],
      "quotes": ["error", "single"],
      "radix": "off",
      "require-jsdoc": "off", // Désactivé car trop restrictif
      "require-unicode-regexp": "warn",
      "semi": "error",
      "semi-spacing": "error",
      "semi-style": "error",
      "sort-keys": "off", // Désactivé car trop restrictif
      "sort-vars": "off", // Désactivé car trop restrictif
      "space-before-blocks": "error",
      "space-before-function-paren": "error",
      "space-in-parens": "error",
      "space-infix-ops": "error",
      "space-unary-ops": "error",
      "spaced-comment": "error",
      "switch-colon-spacing": "error",
      "template-tag-spacing": "error",
      "unicode-bom": "error",
      "wrap-regex": "error",
    },
  },
  
  // Configuration spécifique pour les fichiers de configuration
  {
    files: ["*.config.{js,mjs,ts}", "*.config.*.{js,mjs,ts}"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  
  // Configuration pour les tests
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}", "**/__tests__/**/*"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
  
  // Configuration pour les scripts
  {
    files: ["scripts/**/*"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  
  // Configuration pour react-email-starter
  {
    files: ["react-email-starter/**/*"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-optional-chain": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
    },
  },
  
  // Fichiers ignorés
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "dist/",
      "build/",
      "coverage/",
      "*.d.ts",
      "*.js.map",
      "*.css.map",
      "public/",
      ".env*",
      "*.log",
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "docs/",
      "test-results/",
      "playwright-report/",
      "*.tmp",
      "*.temp",
      ".DS_Store",
      "Thumbs.db"
    ],
  },
];

export default eslintConfig;
