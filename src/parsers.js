import * as fs from 'node:fs';
import yaml from 'js-yaml';

const parsers = (filepath1, filepath2) => {
    let data1;
    let dataObj1;
    let data2;
    let dataObj2;

    if (filepath1.endsWith('.json')) {
        data1 = fs.readFileSync(filepath1, { encoding: 'utf8' });
        dataObj1 = JSON.parse(data1);
    } else if (filepath1.endsWith('.yaml') || filepath1.endsWith('.yml')) {
        data1 = fs.readFileSync(filepath1, 'utf8');
        dataObj1 = yaml.load(data1);
    } else {
        console.log('Error');
    }

    if (filepath2.endsWith('.json')) {
        data2 = fs.readFileSync(filepath2, { encoding: 'utf8' });
        dataObj2 = JSON.parse(data2);
    } else if (filepath2.endsWith('.yaml') || filepath2.endsWith('.yml')) {
        data2 = fs.readFileSync(filepath2, 'utf8');
        dataObj2 = yaml.load(data2);
    } else {
        console.log('Error');
    }

    return [dataObj1, dataObj2];
};

export default parsers;
