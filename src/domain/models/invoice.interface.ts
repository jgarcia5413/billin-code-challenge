//TODO :: Check it. Enums've been setted according to the test data provided (`bad status` is considered invalid).
export enum InvoiceStatus {
  ISSUED = 'issued',
  DRAFT = 'draft',
  INVALID = 'invalid',
}

export interface IInvoiceProps {
  code: string;
  issuedDate: string;
  ownerName: string;
  contactName: string;
  subtotal: number;
  taxes: number;
  total: number;
  status: InvoiceStatus;
}
