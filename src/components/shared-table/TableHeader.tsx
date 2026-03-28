import { memo } from "react";

import { columns } from "#components/static-data";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { TableCell, TableHead, TableRow } from "@mui/material";

const iconSx = {
  fontSize: 16,
  mb: 0.5,
  verticalAlign: "middle",
} as const;

function TableHeaderComponent() {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.id}>
            <b>{column.label}</b>
            {column.id === "amount" && <AttachMoneyIcon sx={iconSx} />}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default memo(TableHeaderComponent);
