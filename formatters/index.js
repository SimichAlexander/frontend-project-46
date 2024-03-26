import stylish from "../formatters/stylish.js";
import plain from "../formatters/plain.js";
import json from "../formatters/json.js";

const formatter = (object, format) => {
  if (format === "plain") {
    return plain(object);
  } else if (format === "json") {
    return json(object);
  }
  return stylish(object);
};

export default formatter;
