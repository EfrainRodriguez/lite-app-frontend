import React from 'react';
// material
import {
  Checkbox,
  TableRow,
  TableCell,
  TableHead as MuiTableHead,
  TableSortLabel
} from '@mui/material';

import type { TableCellSchema, TableOrderType } from '../../models/table.model';

interface TableHeadProps {
  orderBy?: string;
  order?: TableOrderType;
  rowCount?: number;
  numSelected?: number;
  hasCheckbox?: boolean;
  hasCollapse?: boolean;
  cellSchema: TableCellSchema[];
  onOrder?: (key: string) => void;
  onSelectAll?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableHead = ({
  cellSchema,
  rowCount = 0,
  orderBy = '',
  order = 'asc',
  numSelected = 0,
  hasCheckbox = false,
  hasCollapse = false,
  onOrder = () => {},
  onSelectAll = () => {}
}: TableHeadProps) => {
  const handleOrder = (key: string) => {
    onOrder(key);
  };

  return (
    <MuiTableHead>
      <TableRow>
        {/* if you need a checkbox to select all items */}
        {hasCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAll}
            />
          </TableCell>
        )}

        {/* if you need a collapse button */}
        {hasCollapse && <TableCell> </TableCell>}

        {cellSchema.map((item) => (
          <TableCell
            key={item.key}
            sortDirection={orderBy === item.key ? order : false}
            {...item.columnProps}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === item.key}
              direction={orderBy === item.key ? order : 'asc'}
              onClick={() => {
                handleOrder(item.key);
              }}
            >
              {item.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;
