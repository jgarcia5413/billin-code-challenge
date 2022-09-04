export interface IFileReader {
  read(filePath: string, options?: any): Promise<string[][]>;
}
