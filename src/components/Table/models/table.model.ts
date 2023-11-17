import { type TableCellProps } from '@mui/material';

export type TableOrderType = 'asc' | 'desc';

export interface TableCellSchema {
  key: string;
  label?: string;
  cellProps?: TableCellProps;
  columnProps?: TableCellProps;
  render?: (value: any, row: any, rowIndex: number) => React.ReactNode;
}
