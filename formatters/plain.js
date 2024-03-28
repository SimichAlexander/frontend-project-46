import _ from 'lodash';

const plain = (object) => {
  const iter = (data, acc) => {
    if (!Array.isArray(data)) {
      if (_.isObject(data)) {
        if (!Object.prototype.hasOwnProperty.call(data, 'status')) {
          return '[complex value]';
        }
      }
      return typeof data === 'string' ? `'${data}'` : data;
    }
    const result = data.flatMap((obj) => {
      switch (obj.status) {
        case 'added':
          return `Property '${acc + obj.key}' was added with value: ${iter(obj.value, acc)}`;
        case 'removed':
          return `Property '${acc + obj.key}' was removed`;
        case 'updated':
          return `Property '${acc + obj.key}' was updated. From ${iter(obj.value1, acc)} to ${iter(
            obj.value2,
            acc,
          )}`;
        case 'unchanged':
          return [];
        case 'nested':
          return iter(obj.children, `${acc}${obj.key}.`);
        default:
          return 'Error';
      }
    });

    return result.join('\n');
  };
  return iter(object.children, '');
};

export default plain;
