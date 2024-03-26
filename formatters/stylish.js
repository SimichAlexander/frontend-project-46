import _ from "lodash";

const stylish = (object) => {
  const iter = (data, depth) => {
    if (!Array.isArray(data)) {
      if (!_.isObject(data)) {
        return data;
      }
      const lines = Object.entries(data).map(
        ([key, val]) => `${" ".repeat(depth * 4)}${key}: ${iter(val, depth + 1)}`
      );
      return ["{", ...lines, `${" ".repeat(depth * 4 - 4)}}`].join("\n");
    }
    const result = data.map((obj) => {
      switch (obj.status) {
        case "added":
          return `${" ".repeat(depth * 4 - 2)}+ ${obj.key}: ${iter(
            obj.value,
            depth + 1
          )}`;
        case "removed":
          return `${" ".repeat(depth * 4 - 2)}- ${obj.key}: ${iter(
            obj.value,
            depth + 1
          )}`;
        case "updated":
          return `${" ".repeat(depth * 4 - 2)}- ${obj.key}: ${iter(
            obj.value1,
            depth + 1
          )}\n${" ".repeat(depth * 4 - 2)}+ ${obj.key}: ${iter(
            obj.value2,
            depth + 1
          )}`;
        case "unchanged":
          return `${" ".repeat(depth * 4 - 2)}  ${obj.key}: ${iter(
            obj.value,
            depth + 1
          )}`;
        case "nested":
          return `${" ".repeat(depth * 4 - 2)}  ${obj.key}: ${iter(
            obj.children,
            depth + 1
          )}`;
        default:
          console.log("Error");
      }
    });
    return ["{", ...result, `${" ".repeat(depth * 4 - 4)}}`].join("\n");
  };
  return iter(object.children, 1);
};

export default stylish;
