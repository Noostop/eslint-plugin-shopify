const {extname, basename} = require('path');

module.exports = {
  meta: {
    docs: {
      description:
        'Prefer relative local imports extend to the file from where they are importing without relying on an index file.',
      category: 'Best Practises',
      recommended: false,
      uri:
        'https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/prefer-explicit-local-imports.md',
    },
    fixable: null,
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const pathParts = node.source.value.split('/');
        const lastPathPart = pathParts[pathParts.length - 1];

        if (isVagueImport(lastPathPart)) {
          context.report({
            node,
            message:
              'Relative local imports should extend to the file from where they are importing without relying on an index file.',
          });
        }
      },
    };
  },
};

function isVagueImport(str) {
  if (str.length <= 2) {
    return str === '' || str === '.' || str === '..';
  }

  return basename(str, extname(str)) === 'index';
}
