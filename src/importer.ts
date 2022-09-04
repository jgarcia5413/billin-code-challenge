import { CSVFileReader } from './infrastructure/services/CSVFileReader.adapter';
import { InvoiceInMemoryRepository } from './infrastructure/services/InvoiceInMemoryRepository.adapter';
import { ImportInvoicesService } from './useCases/importInvoices.service';

export class Importer {
  async import(filePath: string): Promise<any> {
    const service = new ImportInvoicesService(
      new CSVFileReader(),
      new InvoiceInMemoryRepository(),
    );
    return service.import(filePath);
  }
}
