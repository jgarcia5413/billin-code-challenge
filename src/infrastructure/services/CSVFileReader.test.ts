/***
INFO:: Check it for any doubts about the test data provided.
    https://jestjs.io/docs/manual-mocks#mocking-node-modules
    https://jestjs.io/docs/mock-function-api#mockfnmockimplementationfn
***/

const mock = jest.fn();
jest.mock('fs', () => ({
  readFile: mock,
}));

import { CSVFileReader } from './CSVFileReader.adapter';
describe('CSVFileReader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const csvFileReader = new CSVFileReader();
  const filename = 'test_file.csv';
  const data = 'a;b;c;d;e;f';

  it('should read a CSV file', async () => {
    const options = {
      delimiter: ';',
      encoding: 'utf-8',
    };

    mock.mockImplementation((_filename, _options, callback) => {
      callback(null, data);
    });
    const result = await csvFileReader.read(filename, options);
    expect(result).toEqual([['a', 'b', 'c', 'd', 'e', 'f']]);
  });

  it('should throw an error when the file does not exist', async () => {
    const options = {
      delimiter: ';',
      encoding: 'utf-8',
    };

    mock.mockImplementation((_filename, _options, callback) => {
      callback(new Error('File not found'), data);
    });
    await expect(csvFileReader.read(filename, options)).rejects.toThrow(
      'File not found',
    );
  });

  it('should read a CSV file with default options', async () => {
    mock.mockImplementation((_filename, _options, callback) => {
      callback(null, data);
    });
    const result = await csvFileReader.read(filename);
    expect(result).toEqual([['a', 'b', 'c', 'd', 'e', 'f']]);
  });

  it('should read a CSV with empty lines', async () => {
    const data = 'a;b;c;d;e;f\n  \n \ng;h;i;j;k;l';
    mock.mockImplementation((_filename, _options, callback) => {
      callback(null, data);
    });
    const result = await csvFileReader.read(filename);
    expect(result).toEqual([
      ['a', 'b', 'c', 'd', 'e', 'f'],
      ['g', 'h', 'i', 'j', 'k', 'l'],
    ]);
  });
});
