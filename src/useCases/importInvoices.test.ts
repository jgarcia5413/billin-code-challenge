import { CSVFileReader } from '../infrastructure/services/CSVFileReader.adapter';
import { ImportInvoicesService } from './importInvoices.service';

const invoiceRepository = {
  save: jest.fn(() => {
    throw new Error();
  }),
};

describe('ImportInvoicesService', () => {
  it('should return an error if save on repository get an error', async () => {
    const importInvoicesService = new ImportInvoicesService(
      new CSVFileReader(),
      invoiceRepository,
    );
    await expect(
      importInvoicesService.import('import-success.csv'),
    ).rejects.toThrow();
  });
});
