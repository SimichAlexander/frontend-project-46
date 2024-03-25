// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import gendiff from '../src/gendiff.js';
import obj from '../__fixtures__/diff-object.js';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diff-json', () => {
  expect(gendiff('./file1.json', './file2.json')).toBe(obj);
});


// test('diff-yaml', () => {
//   expect(gendiff('./file1.yml', './file2.yml')).toEqual(
//     `{
//       common: {
//         + follow: false
//           setting1: Value 1
//         - setting2: 200
//         - setting3: true
//         + setting3: null
//         + setting4: blah blah
//         + setting5: {
//               key5: value5
//           }
//           setting6: {
//               doge: {
//                 - wow: 
//                 + wow: so much
//               }
//               key: value
//             + ops: vops
//           }
//       }
//       group1: {
//         - baz: bas
//         + baz: bars
//           foo: bar
//         - nest: {
//               key: value
//           }
//         + nest: str
//       }
//     - group2: {
//           abc: 12345
//           deep: {
//               id: 45
//           }
//       }
//     + group3: {
//           deep: {
//               id: {
//                   number: 45
//               }
//           }
//           fee: 100500
//       }
//   }`,
//   );
// });
