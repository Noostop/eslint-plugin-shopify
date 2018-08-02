# Prefer singular TypeScript enums. (prefer-singular-enums)

Provides consistent when naming [Enums](https://www.typescriptlang.org/docs/handbook/enums.html) within TypeScript code.

## Rule Details

This rule enforces all TypeScript Enums to be singular. An error will occur if the enum is defined with a pluralized name.

Examples of **incorrect** code for this rule:

```ts
enum Pages {
  Products,
  Orders,
  Discounts,
}
```

Examples of **correct** code for this rule:

```ts
enum Page {
  Products,
  Orders,
  Discounts,
}
```

## When Not To Use It

If you have established coding standards using a different naming convention for TypeScript Enums, you can safely disable this rule.
