import { IError } from '../../domain/models/error.interface';
import { InvoiceStatus } from '../../domain/models/invoice.interface';
import { invoiceStatusStringToEnum } from './invoiceStatusStringToEnum';

const validateRowToInvoice = (row: string[]): IError[] => {
  const errors: IError[] = [];
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
  if (!code) {
    errors.push({
      property: 'code',
      message: 'required',
    });
  } else {
    const regex = /^F\d+$/;
    if (!regex.test(code)) {
      errors.push({
        property: 'code',
        message: 'must start with "F" and any number of digits',
      });
    }
  }
  if (!issuedDate) {
    errors.push({
      property: 'issuedDate',
      message: 'required',
    });
  } else {
    const isValidDate = (date: string) => {
      const d = new Date(date);
      return date === d.toISOString().split('T')[0];
    };
    if (!isValidDate(issuedDate)) {
      errors.push({
        property: 'issuedDate',
        message: 'must be a valid date in format YYYY-MM-DD',
      });
    }
  }
  if (!ownerName) {
    errors.push({
      property: 'ownerName',
      message: 'required',
    });
  }
  if (!contactName) {
    errors.push({
      property: 'contactName',
      message: 'required',
    });
  }
  if (!subtotal) {
    errors.push({
      property: 'subtotal',
      message: 'required',
    });
  } else {
    if (isNaN(parseFloat(subtotal))) {
      errors.push({
        property: 'subtotal',
        message: 'invalid',
      });
    }
  }
  if (!taxes) {
    errors.push({
      property: 'taxes',
      message: 'required',
    });
  } else {
    if (isNaN(parseFloat(taxes))) {
      errors.push({
        property: 'taxes',
        message: 'invalid',
      });
    }
  }
  if (!total) {
    errors.push({
      property: 'total',
      message: 'required',
    });
  } else {
    if (isNaN(parseFloat(total))) {
      errors.push({
        property: 'total',
        message: 'invalid',
      });
    }
  }
  if (!status) {
    errors.push({
      property: 'status',
      message: 'required',
    });
  } else {
    if (invoiceStatusStringToEnum(status) === InvoiceStatus.INVALID) {
      errors.push({
        property: 'status',
        message: 'invalid',
      });
    }
  }

  return errors;
};

export { validateRowToInvoice };
