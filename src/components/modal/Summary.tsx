import { memo, useMemo } from "react";

import type { CSVData } from "#components/types";

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatNumber = (currency: number) => currencyFormatter.format(currency);

const listSx = { mt: 1, bgcolor: "background.paper" } as const;

interface SummaryComponentProps {
  csvData: CSVData;
}

function SummaryComponent({ csvData }: SummaryComponentProps) {
  const { totalAmount, averagePayment } = useMemo(() => {
    const transactions = csvData.transactions ?? [];
    const total = transactions.reduce((acc, t) => {
      const amount = parseFloat(t.amount) || 0;
      return amount > 0 ? acc + amount : acc;
    }, 0);
    return {
      totalAmount: total,
      averagePayment: transactions.length > 0 ? total / transactions.length : 0,
    };
  }, [csvData.transactions]);

  return (
    <List sx={listSx}>
      <ListItem>
        <ListItemIcon>
          <FileOpenIcon />
        </ListItemIcon>
        <ListItemText primary={`Batch transfer name: ${csvData.batchName}`} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <HowToRegIcon />
        </ListItemIcon>
        <ListItemText primary={`Approver: ${csvData.approver}`} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <PaidIcon />
        </ListItemIcon>
        <ListItemText primary={`Total amount: ${formatNumber(totalAmount)}`} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <PaymentsIcon />
        </ListItemIcon>
        <ListItemText
          primary={`Number of payments: ${csvData.transactions?.length ?? 0}`}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText
          primary={`Average payment value: ${formatNumber(averagePayment)}`}
        />
      </ListItem>
    </List>
  );
}

export default memo(SummaryComponent);
