import { memo } from "react";

import type { Transaction } from "#components/types";
import { columns } from "#components/static-data";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import TableHeaderComponent from "#components/shared-table/TableHeader";
import StatusCellComponent from "#components/shared-table/StatusCell";

interface ReviewRecordsProps {
  transactions: Transaction[];
}

function ReviewRecordsComponent({ transactions }: ReviewRecordsProps) {
  return (
    <TableContainer>
      <Table stickyHeader aria-label="review records table">
        <TableHeaderComponent />
        <TableBody>
          {transactions.map((row) => (
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
  );
}

export default memo(ReviewRecordsComponent);
