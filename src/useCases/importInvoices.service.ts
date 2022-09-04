import { IErrorLine } from '../domain/models/error.interface';
import { IInvoiceProps } from '../domain/models/invoice.interface';
import { IFileReader } from '../domain/services/fileReader.port';
import { ResultImportInvoices } from '../domain/models/result.interface';
import { config } from '../config';
import { parseRowToInvoice, validateRowToInvoice } from './utils/index';
import { IInvoiceRepository } from '../domain/services/invoiceRepository.port';

export class ImportInvoicesService {
  constructor(
    private fileReader: IFileReader,
    private invoiceRepository: IInvoiceRepository,
  ) {
    this.fileReader = fileReader;
    this.invoiceRepository = invoiceRepository;
  }

  async import(fileName: string): Promise<ResultImportInvoices> {
    const filePath = `${config.filePath}/${fileName}`;
    var rows = await this.fileReader.read(filePath, {
      encoding: config.encoding,
      delimiter: config.delimiter,
      hasHeader: config.hasHeader,
    });
    const invoices: IInvoiceProps[] = [];
    const errors: IErrorLine[] = [];
    let i = 0;
    for await (const row of rows) {
      i++;
      const validateRow = validateRowToInvoice(row);
      if (validateRow.length > 0) {
        errors.push({
          line: i,
          errors: validateRow,
        });
        continue;
      }
      try {
        const invoice = await this.invoiceRepository.save(
          parseRowToInvoice(row),
        );
        invoices.push(invoice);
      } catch (error) {
        // TODO: Log error (Should be insert in a ko array? or just log?)
        throw new Error();
      }
    }
    return {
      ok: invoices,
      ko: errors,
    };
  }
}
