import { memo } from "react";

import type { Transaction } from "#components/types";

import { Tooltip, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const successSX = { color: "success.main" } as const;
const pendingSx = { color: "#fdd835" } as const;
const errorSx = {
  color: "error.main",
  "&:hover": { cursor: "pointer" },
} as const;

interface StatusCellComponentProps {
  row: Transaction;
}

function StatusCellComponent({ row }: StatusCellComponentProps) {
  return (
    <>
      {row.errors ? (
        row.errors.length > 0 ? (
          <Tooltip title={row.errors.join(", ")} arrow placement="top">
            <ErrorIcon sx={errorSx} />
          </Tooltip>
        ) : (
          <CheckCircleIcon sx={successSX} />
        )
      ) : row?.status?.error && row?.status?.name === "Failed" ? (
        <Tooltip title={row?.status?.error} arrow placement="top">
          <Typography variant="caption" sx={errorSx}>
            <b>{row?.status?.name}</b>
          </Typography>
        </Tooltip>
      ) : (
        <Typography
          variant="caption"
          sx={row?.status?.name === "Settled" ? successSX : pendingSx}
        >
          <b>{row?.status?.name}</b>
        </Typography>
      )}
    </>
  );
}

export default memo(StatusCellComponent);
