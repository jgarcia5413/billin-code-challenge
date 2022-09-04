export interface IError {
  property: string;
  message: string;
}

export interface IErrorLine {
  line: number;
  errors: IError[];
}
