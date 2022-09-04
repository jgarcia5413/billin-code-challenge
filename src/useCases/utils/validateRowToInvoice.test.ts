import { validateRowToInvoice } from './validateRowToInvoice';

describe('validateRowToInvoice', () => {
  it('should return an empty array when the row is valid', () => {
    const row = [
      'F001',
      '2021-04-17',
      'John Doe S.L.',
      'Jaen Roe',
      '100.00',
      '21.00',
      '121.00',
      'issued',
    ];
    const result = validateRowToInvoice(row);
    expect(result).toEqual([]);
  });

  it('should return a required error if any field is empty', () => {
    const row: string[] = [];
    const result = validateRowToInvoice(row);
    const invoiceProps = [
      'code',
      'issuedDate',
      'ownerName',
      'contactName',
      'subtotal',
      'taxes',
      'total',
      'status',
    ];
    const errors = invoiceProps.map((prop) => ({
      property: prop,
      message: 'required',
    }));

    expect(result).toEqual(errors);
  });

  it('should return a format error if the code is not valid', () => {
    const row = [
      'A001',
      '2021-04-17',
      'John Doe S.L.',
      'Jaen Roe',
      '100.00',
      '21.00',
      '121.00',
      'issued',
    ];
    const result = validateRowToInvoice(row);
    expect(result).toEqual([
      {
        property: 'code',
        message: 'must start with "F" and any number of digits',
      },
    ]);
  });

  it('should return a format error if the issuedDate is not valid', () => {
    const row = [
      'F001',
      '2021-04-17T00:00:00.000Z',
      'John Doe S.L.',
      'Jaen Roe',
      '100.00',
      '21.00',
      '121.00',
      'issued',
    ];
    const result = validateRowToInvoice(row);
    expect(result).toEqual([
      {
        property: 'issuedDate',
        message: 'must be a valid date in format YYYY-MM-DD',
      },
    ]);
  });

  it('should return a format error if number property is not valid number', () => {
    const row = [
      'F001',
      '2021-04-17',
      'John Doe S.L.',
      'Jaen Roe',
      'invalid subtotal',
      'invalid taxes',
      'invalid total',
      'issued',
    ];
    const result = validateRowToInvoice(row);
    expect(result).toEqual([
      {
        property: 'subtotal',
        message: 'invalid',
      },
      {
        property: 'taxes',
        message: 'invalid',
      },
      {
        property: 'total',
        message: 'invalid',
      },
    ]);
  });

  it('should return an error if status is not valid status', () => {
    const row = [
      'F001',
      '2021-04-17',
      'John Doe S.L.',
      'Jaen Roe',
      '100.00',
      '21.00',
      '121.00',
      'invalid',
    ];
    const result = validateRowToInvoice(row);
    expect(result).toEqual([
      {
        property: 'status',
        message: 'invalid',
      },
    ]);
  });
});
