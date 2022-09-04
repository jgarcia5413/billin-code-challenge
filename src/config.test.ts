import 'dotenv/config';

describe('config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('config should return default values if .env variables are undefined', () => {
    process.env.FILE_PATH = undefined;
    process.env.CSV_DELIMITER = undefined;
    process.env.CSV_ENCODING = undefined;
    process.env.CSV_HAS_HEADER = undefined;
    const config = require('./config').config;
    expect(config).toEqual({
      filePath: './files',
      delimiter: ';',
      encoding: 'utf-8',
      hasHeader: true,
    });
  });

  it('config should return values on .env if exits', () => {
    process.env.FILE_PATH = 'a';
    process.env.CSV_DELIMITER = 'b';
    process.env.CSV_ENCODING = 'c';
    process.env.CSV_HAS_HEADER = 'false';
    const config = require('./config').config;
    expect(config).toEqual({
      filePath: 'a',
      delimiter: 'b',
      encoding: 'c',
      hasHeader: false,
    });
  });

  it('.env should be exits', () => {
    expect(process.env).toBeDefined();
  });
});
