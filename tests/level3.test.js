import uritemplate from '../src';

const values = {
  var: 'value',
  hello: 'Hello World!',
  empty: '',
  path: '/foo/bar',
  x: 1024,
  y: 768,
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

test('map?{x,y}', values, 'map?1024,768');
test('{x,hello,y}', values, '1024,Hello%20World!,768');

// +
test('{+x,hello,y}', values, '1024,Hello%20World!,768');
test('{+path,x}/here', values, '/foo/bar,1024/here');

// .
test('{.var}', values, '.value');
test('{.x,y}', values, '.1024.768');

// /
test('{/var}', values, '/value');
test('{/var,x}/here', values, '/value/1024/here');

// ;
test('{;x,y}', values, ';x=1024;y=768');
test('{;x,y,empty}', values, ';x=1024;y=768;empty');

// ?

test('{?x,y}', values, '?x=1024&y=768');
test('{?x,y,empty}', values, '?x=1024&y=768&empty=');

// &

test('?fixed=yes{&x}', values, '?fixed=yes&x=1024');
test('{&x,y,empty}', values, '&x=1024&y=768&empty=');
