import {
  IInvoiceProps,
  InvoiceStatus,
} from '../../domain/models/invoice.interface';
import { InvoiceInMemoryRepository } from './InvoiceInMemoryRepository.adapter';

describe('InvoiceInMemoryRepository', () => {
  const invoiceRepository = new InvoiceInMemoryRepository();
  it('should save an invoice', async () => {
    const invoice: IInvoiceProps = {
      code: 'F001',
      issuedDate: '2021-04-17',
      ownerName: 'John Doe S.L.',
      contactName: 'Jaen Roe',
      subtotal: 100,
      taxes: 21,
      total: 121,
      status: InvoiceStatus.ISSUED,
    };
    const result = await invoiceRepository.save(invoice);
    expect(result).toEqual(invoice);
  });
});
