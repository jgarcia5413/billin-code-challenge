import { IFileReader } from '../../domain/services/fileReader.port';
import fs from 'fs';
import { config } from '../../config';

type CSVOptions = {
  delimiter?: string;
  encoding?: string;
};

export class CSVFileReader implements IFileReader {
  read(filename: string, options?: CSVOptions): Promise<string[][]> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        filename,
        { encoding: options?.encoding ? options.encoding : 'utf-8' },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            const rows = data
              .split('\n')
              .filter((row) => row.trim().length > 0)
              .map((row: string): string[] => {
                return row.split(options?.delimiter ? options.delimiter : ';');
              });
            if (config.hasHeader) rows.shift(); // remove header row
            resolve(rows);
          }
        },
      );
    });
  }
}
