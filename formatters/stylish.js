import _ from "lodash";

const stylish = (object) => {
  let str = "";
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return data;
    }
    str += "{\n";
    for (let key of data) {
      if (key.status === "added") {
        str += `${" ".repeat(depth * 4 - 2)}+ ${key.key}: ${printObject(
          key.value,
          depth + 1
        )}\n`;
      } else if (key.status === "deleted") {
        str += `${" ".repeat(depth * 4 - 2)}- ${key.key}: ${printObject(
          key.value,
          depth + 1
        )}\n`;
      } else if (key.status === "changed") {
        str += `${" ".repeat(depth * 4 - 2)}- ${key.key}: ${printObject(
          key.value1,
          depth + 1
        )}\n`;
        str += `${" ".repeat(depth * 4 - 2)}+ ${key.key}: ${printObject(
          key.value2,
          depth + 1
        )}\n`;
      } else if (key.status === "nested") {
        str += `${" ".repeat(depth * 4 - 2)}  ${key.key}: ${iter(
          key.children,
          depth + 1
        )}`;
      } else {
        str += `${" ".repeat(depth * 4 - 2)}  ${key.key}: ${printObject(
          key.value,
          depth + 1
        )}\n`;
      }
      // str += `${" ".repeat(depth * 4 - 4)}}\n`;
    }
    return str;
  };
  return iter(object.children, 1);
};

export default stylish;

const printObject = (value, depth) => {
  const replacer = " ";
  const spacesCount = 4;

  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`
    );

    return ["{", ...lines, `${bracketIndent}}`].join("\n");
  };

  return iter(value, depth);
};