import uritemplate from '../src';

const object = {
  var: 'value',
  hello: 'Hello World!',
};

const testCase1 = new uritemplate('{var}');
const testResult1 = testCase1(object);
console.log(testResult1);

const testCase2 = new uritemplate('{hello}');
const testResult2 = testCase2(object);
console.log(testResult2);
