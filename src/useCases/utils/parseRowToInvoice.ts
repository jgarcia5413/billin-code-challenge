import { IInvoiceProps } from '../../domain/models/invoice.interface';
import { invoiceStatusStringToEnum } from './invoiceStatusStringToEnum';

const parseRowToInvoice = (row: string[]): IInvoiceProps => {
  const [
    code,
    issuedDate,
    ownerName,
    contactName,
    subtotal,
    taxes,
    total,
    status,
  ] = row;
  return {
    code: code.trim(),
    issuedDate: issuedDate.trim(),
    ownerName: ownerName.trim(),
    contactName: contactName.trim(),
    subtotal: parseFloat(subtotal),
    taxes: parseFloat(taxes),
    total: parseFloat(total),
    status: invoiceStatusStringToEnum(status),
  };
};

export { parseRowToInvoice };
