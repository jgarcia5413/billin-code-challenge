import 'dotenv/config';

export const config = {
  filePath: process.env.FILE_PATH,
  delimiter: process.env.CSV_DELIMITER,
  encoding: process.env.CSV_ENCODING,
  hasHeader: process.env.CSV_HAS_HEADER === 'true',
};
