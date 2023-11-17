import React, { useState } from 'react';
import {
  Box,
  Card,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  type Theme,
  CardContent,
  useMediaQuery,
  TablePagination,
  CircularProgress,
  Table as MuiTable
} from '@mui/material';
import _ from 'lodash';

import { tableOptions } from '@/utils/constants';

import type { TableOrderType, TableCellSchema } from './models/table.model';
import TableHead from './components/TableHead';
import CustomTableRow from './components/TableRow';
import { applySortFilter, getComparator } from './utils/tableSortFilter';

interface TableProps {
  page?: number;
  count?: number;
  selected?: any[];
  sourceData?: any[];
  isLoading?: boolean;
  rowsPerPage?: number;
  hasCollapse?: boolean;
  hasCheckbox?: boolean;
  rowClickable?: boolean;
  hasPagination?: boolean;
  labelRowsPerPage?: string;
  rowsPerPageOptions?: number[];
  cellSchema: TableCellSchema[];
  TableToolbar?: JSX.Element | null;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (rowsPerPage: number) => void;
  renderCollapsedContent?: (rowData: any) => JSX.Element | null;
  onSelect?: (event: React.ChangeEvent<unknown>, rowData: any) => void;
  renderMobileContent?: (rowData: any, index: number) => JSX.Element | null;
  onClickRow?: (
    event: React.MouseEvent<unknown>,
    rowData: any,
    index: number
  ) => void;
}

const Table = ({
  page = 0,
  count = 0,
  cellSchema,
  selected = [],
  sourceData = [],
  isLoading = false,
  TableToolbar = null,
  hasCollapse = false,
  hasCheckbox = false,
  rowClickable = false,
  hasPagination = false,
  rowsPerPage = tableOptions.rowsPerPageOptions[0],
  labelRowsPerPage = tableOptions.labelRowsPerPage,
  rowsPerPageOptions = tableOptions.rowsPerPageOptions,
  onSelect = () => {},
  onClickRow = () => {},
  onChangePage = () => {},
  onChangeRowsPerPage = () => {},
  renderMobileContent = () => null,
  renderCollapsedContent = () => null
}: TableProps) => {
  const [order, setOrder] = useState<TableOrderType>('asc');
  const [orderBy, setOrderBy] = useState('');

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const filteredProducts = applySortFilter(
    sourceData,
    getComparator(order, orderBy),
    ''
  );

  // functions to handle pagination

  const handleChangePage = (_event: any, newPage: number) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    onChangeRowsPerPage(rowsPerPage);
  };

  const handleOrder = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // functions to handle collapse

  const handleRenderCollapsedContent = (row: any) => {
    return renderCollapsedContent(row);
  };

  // functions to handle selected rows

  const handleSelected = (event: React.MouseEvent<unknown>, rowData: any) => {
    const selectedIndex = _.findIndex(selected, rowData);
    let newSelected: any[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowData);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    onSelect(event, newSelected);
  };

  const handleSelectRow = (
    event: React.MouseEvent<unknown>,
    rowData: any,
    rowIndex: number
  ) => {
    handleSelected(event, rowData);
    onClickRow(event, rowData, rowIndex);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = sourceData.map((n) => n);
      onSelect(event, newSelecteds);
      return;
    }
    onSelect(event, []);
  };

  const paginationComponentOptions = {
    page,
    count,
    rowsPerPage,
    rowsPerPageOptions,
    labelRowsPerPage: '',
    onPageChange: handleChangePage,
    onRowsPerPageChange: handleChangeRowsPerPage,
    sx: {
      height: 50,
      overflowY: 'hidden'
    }
  };

  const renderMobilePagination = () => (
    <Box mt={-2} display="flex" justifyContent="end">
      <Box>
        <TablePagination
          {...paginationComponentOptions}
          sx={{
            ...paginationComponentOptions.sx,
            borderTop: 'none'
          }}
        />
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && TableToolbar != null && (
        <Card sx={{ mb: 1 }}>
          <CardContent>{TableToolbar}</CardContent>
        </Card>
      )}
      {isMobile && filteredProducts.length >= 1 && (
        <>
          {hasPagination && renderMobilePagination()}
          {filteredProducts.map((row, index) => (
            <Card key={index} sx={{ mb: 1 }}>
              <CardContent>{renderMobileContent(row, index)}</CardContent>
            </Card>
          ))}
          {hasPagination && renderMobilePagination()}
        </>
      )}
      {isMobile && !isLoading && filteredProducts.length <= 0 && (
        <Typography variant="body2" color="text.secondary" align="center">
          {tableOptions.emptyRowsLabel}
        </Typography>
      )}
      {isMobile && isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 200
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isMobile && (
        <Card>
          <CardContent>
            {TableToolbar != null && <Box sx={{ mb: 2 }}>{TableToolbar}</Box>}
            <MuiTable>
              <TableHead
                order={order}
                orderBy={orderBy}
                cellSchema={cellSchema}
                hasCheckbox={hasCheckbox}
                hasCollapse={hasCollapse}
                rowCount={sourceData.length}
                numSelected={selected?.length ?? 0}
                onOrder={handleOrder}
                onSelectAll={handleSelectAll}
              />
              <TableBody>
                {filteredProducts.length >= 1 &&
                  filteredProducts.map((row, index) => {
                    const isSelected = _.findIndex(selected, row) !== -1;
                    return (
                      <CustomTableRow
                        key={index}
                        rowData={row}
                        rowIndex={index}
                        cellSchema={cellSchema}
                        isSelected={isSelected}
                        hasCheckbox={hasCheckbox}
                        hasCollapse={hasCollapse}
                        rowClickable={rowClickable}
                        onSelectRow={handleSelectRow}
                        renderCollapsedContent={handleRenderCollapsedContent}
                      />
                    );
                  })}
              </TableBody>
              {!isLoading && filteredProducts.length < 1 && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={12}>
                      <Box sx={{ py: 3 }}>
                        <Typography>{tableOptions.emptyRowsLabel}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
              {isLoading && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={12}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </MuiTable>
            {hasPagination && (
              <TablePagination
                {...paginationComponentOptions}
                component="div"
                labelRowsPerPage={labelRowsPerPage}
              />
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Table;
