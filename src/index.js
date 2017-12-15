const operators = ['+', '#', '?', '/', '.', ';', '&'];

function uritemplate(pattern) {
  return (context) => pattern.replace(
    /\{([^\{\}]+)\}|[^\{\}]+/g,
    (match, submatch, offset, string) => {
      if (!submatch) return match;

      return this.fill(context, submatch);
    }
  );
}

uritemplate.prototype.processKey = function(context, key, operator) {
  if (!context[key]) return null;

  return encodeURI(context[key]);
};

uritemplate.prototype.fill = function(context, submatch) {
  let operator = null;
  let workString = submatch;
  let glue = ',';
  let prefix = '';

  if (operators.indexOf(workString[0]) >= 0) {
    operator = workString[0];
    workString = workString.substr(1);
  }

  // Prefix
  if (operator === '#' || operator === '?' || operator === '/' || operator === '&') {
    prefix = operator;
  }

  // Glue
  if (operator === '?' || operator === '/' || operator === '&') {
    glue = operator;
  }

  const allKeys = workString.split(',');

  const result = allKeys.map(key => this.processKey(context, key, operator));

  return prefix + result.join(glue);
};

export default uritemplate;
