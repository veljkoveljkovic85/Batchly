import { useState, useCallback, useMemo, memo } from "react";
import type { ChangeEvent } from "react";

import type { Transaction } from "#components/types";
import { columns, ROW_OPTIONS } from "#components/static-data";

import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";

import TableHeaderComponent from "#components/shared-table/TableHeader";
import StatusCellComponent from "#components/shared-table/StatusCell";

interface TransactionsTableComponentProps {
  transactions: Transaction[];
}

function TransactionsTableComponent({
  transactions,
}: TransactionsTableComponentProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    },
    [],
  );

  const pageCount = Math.ceil(transactions.length / rowsPerPage);
  const safePage = Math.min(page, Math.max(0, pageCount - 1));

  const visibleRows = useMemo(
    () =>
      transactions.slice(
        safePage * rowsPerPage,
        safePage * rowsPerPage + rowsPerPage,
      ),
    [transactions, safePage, rowsPerPage],
  );

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="transactions table">
          <TableHeaderComponent />
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow hover key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === "status" ? (
                      <StatusCellComponent row={row} />
                    ) : (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ROW_OPTIONS}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default memo(TransactionsTableComponent);
