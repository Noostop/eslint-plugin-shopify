const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/enzyme-no-bad-features');

require('babel-eslint');

const parser = 'babel-eslint';
const ruleTester = new RuleTester();
function error(prop) {
  return [
    {
      type: 'Identifier',
      message: `No bad enzyme features. Avoid using ${prop} on an enzyme wrapper.`,
    },
  ];
}

ruleTester.run('enzyme-no-bad-features', rule, {
  valid: [
    {
      code: `
        const wrapper = shallow(<Foo />);
        wrapper.at(0);
        wrapper.childAt(0);
        wrapper.children();
        wrapper.closest('.foo');
        wrapper.contains(<div />);
        wrapper.containsAllMatchingElements([<div>Foo</div>, <div>Bar</div>]);
        wrapper.containsAnyMatchingElements([<div>Foo</div>, <div>Bar</div>]);
        wrapper.containsMatchingElement(<div>Foo</div>);
        wrapper.debug();
        wrapper.dive();
        wrapper.equals(<div className="foo bar" />);
        wrapper.every('.foo')
        wrapper.everyWhere(n => n.hasClass('foo'));
        wrapper.exists();
        wrapper.filter('.foo');
        wrapper.filterWhere(n => typeof n.type() !== 'string');
        wrapper.find('.foo');
        wrapper.findWhere(n => n.type() !== 'string');
        wrapper.first();
        wrapper.forEach(n => n);
        wrapper.get(0);
        wrapper.hasClass('foo');
        wrapper.hostNodes();
        wrapper.html();
        wrapper.is('.foo');
        wrapper.isEmpty();
        wrapper.key();
        wrapper.last();
        wrapper.map(n => n);
        warpper.matchesElement('<div>Foo</div>');
        wrapper.name();
        wrapper.not('.foo');
        wrapper.parent();
        wrapper.parents();
        warpper.props();
        wrapper.prop('bar');
        wrapper.reduce((acc, n) => acc + n.prop('foo'));
        wrapper.reduceRight((acc, n) => acc + n.prop('foo'));
        wrapper.slice(1, 2);
        wrapper.some('.foo');
        wrapper.someWhere(n => n);
        wrapper.tap(n => n);
        wrapper.text();
        wrapper.type();
        wrapper.unmount();
        wrapper.update();
      `,
      parser,
    },
    {
      code: `
        const wrapper = mount(<Foo />);
        wrapper.at(0);
        wrapper.childAt(0);
        wrapper.children();
        wrapper.contains(<div />);
        wrapper.containsAllMatchingElements([<div>Foo</div>, <div>Bar</div>]);
        wrapper.containsAnyMatchingElements([<div>Foo</div>, <div>Bar</div>]);
        wrapper.containsMatchingElement(<div>Foo</div>);
        wrapper.closest('.foo');
        wrapper.debug();
        wrapper.detach();
        wrapper.equals(<div className="foo bar" />);
        wrapper.every('.foo')
        wrapper.everyWhere(n => n.hasClass('foo'));
        wrapper.exists();
        wrapper.filter('.foo');
        wrapper.filterWhere(n => typeof n.type() !== 'string');
        wrapper.find('.foo');
        wrapper.findWhere(n => n.type() !== 'string');
        wrapper.first();
        wrapper.forEach(n => n);
        wrapper.get(0);
        wrapper.hasClass('foo');
        wrapper.hostNodes();
        wrapper.html();
        wrapper.is('.foo');
        wrapper.isEmpty();
        wrapper.key();
        wrapper.last();
        wrapper.map(n => n);
        warpper.matchesElement('<div>Foo</div>');
        wrapper.name();
        wrapper.not('.foo');
        wrapper.parent();
        wrapper.parents();
        warpper.props();
        wrapper.prop('bar');
        wrapper.reduce((acc, n) => acc + n.prop('foo'));
        wrapper.reduceRight((acc, n) => acc + n.prop('foo'));
        wrapper.slice(1, 2);
        wrapper.some('.foo');
        wrapper.someWhere(n => n);
        wrapper.tap(n => n);
        wrapper.text();
        wrapper.type();
        wrapper.unmount();
        wrapper.update();
      `,
      parser,
    },
    {
      code: `
        const wrapper = render(<Foo />);
        wrapper.at(0);
        wrapper.childAt(0);
        wrapper.children();
        wrapper.contains(<div />);
        wrapper.containsAllMatchingElements([<div>Foo</div>, <div>Bar</div>]);
        wrapper.containsAnyMatchingElements([<div>Foo</div>, <div>Bar</div>]);
        wrapper.containsMatchingElement(<div>Foo</div>);
        wrapper.closest('.foo');
        wrapper.debug();
        wrapper.detach();
        wrapper.equals(<div className="foo bar" />);
        wrapper.every('.foo')
        wrapper.everyWhere(n => n.hasClass('foo'));
        wrapper.exists();
        wrapper.filter('.foo');
        wrapper.filterWhere(n => typeof n.type() !== 'string');
        wrapper.find('.foo');
        wrapper.findWhere(n => n.type() !== 'string');
        wrapper.first();
        wrapper.forEach(n => n);
        wrapper.get(0);
        wrapper.hasClass('foo');
        wrapper.hostNodes();
        wrapper.html();
        wrapper.is('.foo');
        wrapper.isEmpty();
        wrapper.key();
        wrapper.last();
        wrapper.map(n => n);
        warpper.matchesElement('<div>Foo</div>');
        wrapper.name();
        wrapper.not('.foo');
        wrapper.parent();
        wrapper.parents();
        warpper.props();
        wrapper.prop('bar');
        wrapper.reduce((acc, n) => acc + n.prop('foo'));
        wrapper.reduceRight((acc, n) => acc + n.prop('foo'));
        wrapper.slice(1, 2);
        wrapper.some('.foo');
        wrapper.someWhere(n => n);
        wrapper.tap(n => n);
        wrapper.text();
        wrapper.type();
        wrapper.unmount();
        wrapper.update();
      `,
      parser,
    },
  ],
  invalid: [
    {
      code: `
        const wrapper = mount(<Foo />);
        wrapper.setState({bar: baz});
      `,
      parser,
      errors: error('setState'),
    },
    {
      code: `
        const wrapper = shallow(<Foo />);
        wrapper.setState({bar: baz});
      `,
      parser,
      errors: error('setState'),
    },
    {
      code: `
        const wrapper = render(<Foo />);
        wrapper.setState({bar: baz});
      `,
      parser,
      errors: error('setState'),
    },
    {
      code: `
        const wrapper = shallow(<Foo />);
        wrapper.setContext();
      `,
      parser,
      errors: error('setContext'),
    },
    {
      code: `
        const wrapper = mount(<Foo />);
        wrapper.setContext();
      `,
      parser,
      errors: error('setContext'),
    },
    {
      code: `
        const wrapper = render(<Foo />);
        wrapper.setContext();
      `,
      parser,
      errors: error('setContext'),
    },
    {
      code: `
        const wrapper = shallow(<Foo />);
        wrapper.setProps();
      `,
      parser,
      errors: error('setProps'),
    },
    {
      code: `
        const wrapper = mount(<Foo />);
        wrapper.setProps();
      `,
      parser,
      errors: error('setProps'),
    },
    {
      code: `
        const wrapper = render(<Foo />);
        wrapper.setProps();
      `,
      parser,
      errors: error('setProps'),
    },
    {
      code: `
        const wrapper = shallow(<Foo />);
        wrapper.instance();
      `,
      parser,
      errors: error('instance'),
    },
    {
      code: `
        const wrapper = mount(<Foo />);
        wrapper.instance();
      `,
      parser,
      errors: error('instance'),
    },
    {
      code: `
        const wrapper = render(<Foo />);
        wrapper.instance();
      `,
      parser,
      errors: error('instance'),
    },
    {
      code: `
        const wrapper = shallow(<Foo />);
        wrapper.state();
      `,
      parser,
      errors: error('state'),
    },
    {
      code: `
        const wrapper = mount(<Foo />);
        wrapper.state();
      `,
      parser,
      errors: error('state'),
    },
    {
      code: `
        const wrapper = render(<Foo />);
        wrapper.state();
      `,
      parser,
      errors: error('state'),
    },
    {
      code: `
        const wrapper = shallow(<Foo />);
        wrapper.simulate('click');
      `,
      parser,
      errors: error('simulate'),
    },
    {
      code: `
        const wrapper = mount(<Foo />);
        wrapper.simulate('click');
      `,
      parser,
      errors: error('simulate'),
    },
    {
      code: `
        const wrapper = render(<Foo />);
        wrapper.simulate('click');
      `,
      parser,
      errors: error('simulate'),
    },
    {
      code: `
        const wrapper = shallow(<Foo />);
        wrapper.simulateError(new Error());
      `,
      parser,
      errors: error('simulateError'),
    },
    {
      code: `
        const wrapper = mount(<Foo />);
        wrapper.simulateError(new Error());
      `,
      parser,
      errors: error('simulateError'),
    },
    {
      code: `
        const wrapper = render(<Foo />);
        wrapper.simulateError(new Error());
      `,
      parser,
      errors: error('simulateError'),
    },
    {
      code: `
        const wrapper = shallow(<Foo />);
        wrapper.ref('foo');
      `,
      parser,
      errors: error('ref'),
    },
    {
      code: `
        const wrapper = mount(<Foo />);
        wrapper.ref('foo');
      `,
      parser,
      errors: error('ref'),
    },
    {
      code: `
        const wrapper = render(<Foo />);
        wrapper.ref('foo');
      `,
      parser,
      errors: error('ref'),
    },
    {
      code: `
        const wrapper = shallow(<Foo />);
        wrapper.context('foo');
      `,
      parser,
      errors: error('context'),
    },
    {
      code: `
        const wrapper = mount(<Foo />);
        wrapper.context('foo');
      `,
      parser,
      errors: error('context'),
    },
    {
      code: `
        const wrapper = render(<Foo />);
        wrapper.context('foo');
      `,
      parser,
      errors: error('context'),
    },
  ],
});
