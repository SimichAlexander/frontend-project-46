import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const chooseFormatter = (object, format) => {
    if (format === 'plain') {
        return plain(object);
    }
    if (format === 'json') {
        return json(object);
    }
    return stylish(object);
};

export default chooseFormatter;
