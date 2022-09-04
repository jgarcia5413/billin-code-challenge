import 'dotenv/config';

export const config = {
  filePath: process.env.FILE_PATH ? process.env.FILE_PATH : './files',
  delimiter: process.env.CSV_DELIMITER ? process.env.CSV_DELIMITER : ';',
  encoding: process.env.CSV_ENCODING ? process.env.CSV_ENCODING : 'utf-8',
  hasHeader: process.env.CSV_HAS_HEADER
    ? process.env.CSV_HAS_HEADER === 'true'
    : true,
};
