import { IInvoiceProps } from '../../domain/models/invoice.interface';
import { IInvoiceRepository } from '../../domain/services/invoiceRepository.port';

export class InvoiceInMemoryRepository implements IInvoiceRepository {
  async save(invoice: IInvoiceProps): Promise<IInvoiceProps> {
    // Dummy implementation
    return invoice;
  }
}
