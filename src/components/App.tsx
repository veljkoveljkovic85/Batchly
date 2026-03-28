import { useState, useCallback, useEffect, lazy, Suspense } from "react";

import type { Transaction } from "#components/types";
import { initialTransactions } from "#components/static-data";

import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import { Box, Button, Container, Divider, Typography } from "@mui/material";

import TransactionsTableComponent from "#components/transactions-table";
const ModalComponent = lazy(() => import("#components/modal"));

const boxSx = { display: "flex", justifyContent: "center", m: 3 } as const;

function App() {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const stored = localStorage.getItem("transactions");
      return stored ? JSON.parse(stored) : initialTransactions;
    } catch {
      return initialTransactions;
    }
  });

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const addTransactions = useCallback((newTransactions: Transaction[]) => {
    if (!newTransactions?.length) return;

    setTransactions((prev) =>
      [...prev, ...newTransactions].sort((a, b) =>
        (a.accountHolderName ?? "").localeCompare(b.accountHolderName ?? ""),
      ),
    );
    setOpen(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center">
          Batchly <BatchPredictionIcon />
        </Typography>
        <Divider />
        <Box sx={boxSx}>
          <Button variant="outlined" onClick={handleOpen}>
            Upload CSV File
          </Button>
        </Box>
        <TransactionsTableComponent transactions={transactions} />
      </Container>
      <Suspense fallback={null}>
        {open && (
          <ModalComponent
            open={open}
            handleClose={handleClose}
            addTransactions={addTransactions}
          />
        )}
      </Suspense>
    </>
  );
}

export default App;
