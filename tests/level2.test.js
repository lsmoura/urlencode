import uritemplate from '../src';

const values = {
  var: 'value',
  hello: 'Hello World!',
  path: '/foo/bar',
};

const test = (template, values, expected) => {
  const templateFunction = new uritemplate(template);
  const result = templateFunction(values);

  console.log(
    `${expected} === ${result}: ${expected === result ? 'OK' : 'FAIL'}`
  );
  if (expected !== result) {
    console.log(template);
  }
};

// +
test('{+var}', values, 'value');
test('{+hello}', values, 'Hello%20World!');
test('{+path}/here', values, '/foo/bar/here');
test('here?ref={+path}', values, 'here?ref=/foo/bar');

// #
test('X{#var}', values, 'X#value');
test('X{#hello}', values, 'X#Hello%20World!');
