import _ from 'lodash';

const getValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  return typeof data === 'string' ? `'${data}'` : data;
};

const getPropertyName = (acc, key) => `${acc + key}`;

const plain = (object) => {
  const iter = (data, acc) => {
    const mapping = {
      added: (obj) => `Property '${getPropertyName(acc, obj.key)}' was added with value: ${getValue(obj.value)}`,
      removed: (obj) => `Property '${getPropertyName(acc, obj.key)}' was removed`,
      updated: (obj) => `Property '${getPropertyName(acc, obj.key)}' was updated. From ${getValue(obj.value1)} to ${getValue(obj.value2)}`,
      unchanged: () => [],
      nested: (obj) => iter(obj.children, `${acc}${obj.key}.`),
    };
    const result = data.flatMap((obj) => mapping[obj.status](obj));
    return result.join('\n');
  };
  return iter(object.children, '');
};

export default plain;
