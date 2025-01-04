import globals from "globals";
import pluginJs from "@eslint/js";

// export default [
// { languageOptions: { globals: globals.browser } },
// pluginJs.configs.recommended,
// {
//   rules: {
//     // ...js.configs.recommended.rules, // Рекомендовані правила ESLint
//     "no-console": "off", // Вимкнення правила для `console.log`
//     "no-unused-vars": [
//       "warn",
//       { argsIgnorePattern: "^_" }, // Ігнорування змінних, що починаються на `_`
//     ],
//     "no-undef": "error", // Помилка, якщо використовується невизначена змінна
//     "prefer-const": "warn", // Рекомендується використовувати `const`, якщо змінна не переназначається
//     "arrow-body-style": ["warn", "as-needed"], // Мінімізація використання `{}` у функціях-стрілках
//     "no-var": "error", // Заборона використання `var`
//   },
// },
// ];

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,

  {
    rules: {
      "no-console": "off",
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" }, // Ігнорування змінних, що починаються на `_`
      ],
      "no-undef": "error", // Помилка, якщо використовується невизначена змінна
      "prefer-const": "warn", // Рекомендується використовувати `const`, якщо змінна не переназначається
      "arrow-body-style": ["warn", "as-needed"], // Мінімізація використання `{}` у функціях-стрілках
      "no-var": "error", // Заборона використання `var`
      "default-param-last": "error",
      "prettier/prettier": "error",
      "func—names": "off",
      "no—process—exit": "off",
      "object—shorthand": "off",
      "class—methods-use-this": "off",
    },
  },
];
