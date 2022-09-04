import { IInvoiceProps } from '../models/invoice.interface';

export interface IInvoiceRepository {
  save(invoice: IInvoiceProps): Promise<IInvoiceProps>;
}
