import { IInvoiceProps } from './invoice.interface';
import { IErrorLine } from './error.interface';

export interface ResultImportInvoices {
  ok: IInvoiceProps[];
  ko: IErrorLine[];
}
