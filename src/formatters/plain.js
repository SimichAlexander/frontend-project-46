import _ from 'lodash';

const getValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  return typeof data === 'string' ? `'${data}'` : data;
};

const plain = (object) => {
  const iter = (data, acc) => {
    const result = data.flatMap((obj) => {
      switch (obj.status) {
        case 'added':
          return `Property '${acc + obj.key}' was added with value: ${getValue(obj.value)}`;
        case 'removed':
          return `Property '${acc + obj.key}' was removed`;
        case 'updated':
          return `Property '${acc + obj.key}' was updated. From ${getValue(
            obj.value1,
          )} to ${getValue(obj.value2)}`;
        case 'unchanged':
          return [];
        case 'nested':
          return iter(obj.children, `${acc}${obj.key}.`);
        default:
          throw new Error('Error status');
      }
    });
    return result.join('\n');
  };
  return iter(object.children, '');
};

export default plain;
