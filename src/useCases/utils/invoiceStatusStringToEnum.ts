import { InvoiceStatus } from '../../domain/models/invoice.interface';

const invoiceStatusStringToEnum = (status: string): InvoiceStatus => {
  switch (status) {
    case 'issued':
      return InvoiceStatus.ISSUED;
    case 'draft':
      return InvoiceStatus.DRAFT;
    default:
      return InvoiceStatus.INVALID;
  }
};

export { invoiceStatusStringToEnum };
