import _ from 'lodash';

const plain = (object) => {
  const iter = (data, accumulator) => {
    if (!Array.isArray(data)) {
      if (_.isObject(data)) {
        if (!Object.prototype.hasOwnProperty.call(data, 'status')) {
          return '[complex value]';
        }
      }
      return typeof data === 'string' ? `'${data}'` : data;
    }
    let acc = accumulator;
    const result = data.flatMap((obj) => {
      let name;
      acc += `${obj.key}.`;
      switch (obj.status) {
        case 'added':
          name = acc.slice(0, acc.length - 1);
          acc = acc.replace(`${obj.key}.`, '');
          return `Property '${name}' was added with value: ${iter(obj.value, acc)}`;
        case 'removed':
          name = acc.slice(0, acc.length - 1);
          acc = acc.replace(`${obj.key}.`, '');
          return `Property '${name}' was removed`;
        case 'updated':
          name = acc.slice(0, acc.length - 1);
          acc = acc.replace(`${obj.key}.`, '');
          return `Property '${name}' was updated. From ${iter(obj.value1, acc)} to ${iter(obj.value2, acc)}`;
        case 'unchanged':
          acc = acc.replace(`${obj.key}.`, '');
          return [];
        case 'nested':
          name = acc;
          acc = acc.replace(`${obj.key}.`, '');
          return iter(obj.children, name);
        default:
          return 'Error';
      }
    });

    return result.join('\n');
  };
  return iter(object.children, '');
};

export default plain;
