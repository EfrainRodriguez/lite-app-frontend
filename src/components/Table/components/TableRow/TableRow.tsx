import React, { useState } from 'react';
import {
  TableCell,
  TableRow,
  Collapse,
  Checkbox,
  IconButton
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import type { TableCellSchema } from '../../models/table.model';

interface CustomTableRowProps {
  rowData?: any;
  rowClickable?: boolean;
  rowIndex?: number;
  isSelected?: boolean;
  hasCheckbox?: boolean;
  hasCollapse?: boolean;
  cellSchema: TableCellSchema[];
  onSelectRow?: (
    event: React.MouseEvent<unknown>,
    rowData: any,
    index: number
  ) => void;
  renderCollapsedContent?: (rowData: any) => JSX.Element | null;
}

const CustomTableRow = ({
  cellSchema,
  rowData = {},
  rowIndex = 0,
  rowClickable = false,
  isSelected = false,
  hasCollapse = false,
  hasCheckbox = false,
  onSelectRow = () => {},
  renderCollapsedContent = () => null
}: CustomTableRowProps) => {
  const [open, setOpen] = useState(false);

  const handleSelectedRow = (event: React.MouseEvent<unknown>) => {
    onSelectRow(event, rowData, rowIndex);
  };

  return (
    <>
      <TableRow
        hover={true}
        key={rowIndex}
        tabIndex={-1}
        role="checkbox"
        // cursor="pointer"
        sx={{
          cursor: rowClickable ? 'pointer' : 'default'
        }}
        selected={isSelected}
        aria-checked={isSelected}
        onClick={(event) => {
          handleSelectedRow(event);
        }}
      >
        {hasCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox checked={isSelected} />
          </TableCell>
        )}
        {hasCollapse && (
          <TableCell>
            <IconButton
              size="small"
              aria-label="expand row"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        )}
        {cellSchema.map((item) => (
          <TableCell key={item.key} {...item.cellProps}>
            {item.render != null
              ? item.render(rowData[item.key], rowData, rowIndex)
              : rowData[item.key]}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        {hasCollapse && (
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {renderCollapsedContent(rowData)}
            </Collapse>
          </TableCell>
        )}
      </TableRow>
    </>
  );
};

export default CustomTableRow;
