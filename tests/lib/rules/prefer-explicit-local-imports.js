const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/prefer-explicit-local-imports');

const ruleTester = new RuleTester();
const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
};

const errors = [
  {
    type: 'ImportDeclaration',
    message:
      'Relative local imports should extend to the file from where they are importing without relying on an index file.',
  },
];

ruleTester.run('prefer-explicit-local-imports', rule, {
  valid: [
    {
      code: "import Button from '../Button'",
      parserOptions,
    },
  ],

  invalid: [
    {
      code: "import Button from '../'",
      parserOptions,
      errors,
    },
    {
      code: "import Button from '..'",
      parserOptions,
      errors,
    },
    {
      code: "import Button from './'",
      parserOptions,
      errors,
    },
    {
      code: "import Button from '.'",
      parserOptions,
      errors,
    },
    {
      code: "import Button from '../../index'",
      parserOptions,
      errors,
    },
    {
      code: "import Button from '../../index.ts'",
      parserOptions,
      errors,
    },
    {
      code: "import Button from '../../index.js'",
      parserOptions,
      errors,
    },
  ],
});
