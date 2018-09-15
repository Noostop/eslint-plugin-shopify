module.exports = {
  meta: {
    docs: {
      description: 'Restricts usage of enzyme to the good parts.',
      category: 'Best Practises',
      recommended: true,
      uri:
        'https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/enzyme-no-bad-features.md',
    },
    schema: [],
  },

  create(context) {
    const enzymeWrappers = [];
    return {
      'Program:exit': function() {
        enzymeWrappers.forEach(checkNodeForInvalidProps);
      },
      CallExpression(node) {
        if (!isEnzymeWrapper(node)) {
          return;
        }

        enzymeWrappers.push(node);
      },
    };

    function report(node, prop) {
      context.report({
        node,
        message:
          'No bad enzyme features. Avoid using {{prop}} on an enzyme wrapper.',
        data: {prop},
      });
    }

    function checkNodeForInvalidProps(node) {
      const invalidProps = getInvalidPropsForNode(node);
      if (invalidProps.length) {
        return invalidProps.map((prop) => report(node, prop));
      }

      const variableDeclaratorParent = findParent(
        node,
        (parent) => parent.type === 'VariableDeclarator',
      );

      if (variableDeclaratorParent) {
        const references = context
          .getDeclaredVariables(variableDeclaratorParent)[0]
          .references.slice(1);
        references.forEach((reference) =>
          checkNodeForInvalidProps(reference.identifier),
        );
      }

      return false;
    }
  },
};

function isEnzymeWrapper({callee: {name}}) {
  return name === 'shallow' || name === 'mount' || name === 'render';
}

function getInvalidPropsForNode(node) {
  if (node.parent.type !== 'MemberExpression') {
    return false;
  }

  return [
    'setState',
    'setContext',
    'setProps',
    'instance',
    'state',
    'simulate',
    'simulateError',
    'ref',
    'context',
  ]
    .map((prop) => {
      if (hasPropertyName(node.parent, prop)) {
        return prop;
      }
      return null;
    })
    .filter((prop) => prop);
}

function hasPropertyName({property}, name) {
  return property && property.name === name;
}

function findParent(node, test) {
  if (test(node)) {
    return node;
  } else if (node.parent) {
    return findParent(node.parent, test);
  }
  return null;
}
