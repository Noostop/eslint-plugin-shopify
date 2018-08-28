# Prefer relative local imports extend to the file from where they are importing without relying on an index file. (prefer-explicit-local-imports)

Imports inside the same directory should extend directly to the file from where they are importing without relying on an index file. This means the source of these imports should not end with a `/`, but the path should terminate at an individual filename. This preserves the index file inside a directory as a mechanism for exposing pieces of the module to the outside application.

## Rule Details

This rule disallows any relative local imports that rely on the existence of an index file.

Examples of **incorrect** code for this rule:

```ts
import Thing from '../';
import OtherThing from './';
import Module from '../../index.ts'
```

Examples of **correct** code for this rule:

```ts
import Thing from '../Thing';
import OtherThing from './OtherThing';
import Module from '../Module'
```

## When Not To Use It

If you do not wish to enforce explicit relative local imports, you can safely disable this rule.
