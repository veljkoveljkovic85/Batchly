import { useState, useCallback, useMemo } from "react";

import type { CSVData, Step, Transaction } from "#components/types";
import { initialValues, statuses } from "#components/static-data";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import FormComponent from "#components/modal/Form";
import ReviewRecordsComponent from "#components/modal/ReviewRecords";
import SummaryComponent from "#components/modal/Summary";

const paperSx = { height: 400 } as const;
const paperSlotProps = { paper: { sx: paperSx } } as const;
const dialogTitleSx = { fontSize: 28 };
const closeButtonSx = { position: "absolute", right: 8, top: 8 } as const;
const titles = ["Transfer Details", "Review Records", "Summary"] as const;

interface ModalComponentProps {
  open: boolean;
  handleClose: () => void;
  addTransactions: (transactions: Transaction[]) => void;
}

export default function ModalComponent({
  open,
  handleClose,
  addTransactions,
}: ModalComponentProps) {
  const [step, setStep] = useState<Step>(1);
  const [csvData, setCsvData] = useState<CSVData>(initialValues);

  const checkErrors = useMemo(() => {
    return csvData.transactions.filter(
      (transaction) => transaction?.errors?.length,
    );
  }, [csvData.transactions]);

  const handleAddTransactions = useCallback(() => {
    const transactions = csvData.transactions.map(
      ({ errors: _errors, ...transaction }) => {
        const index = Math.floor(Math.random() * 3);

        return { ...transaction, status: statuses[index] };
      },
    );

    addTransactions(transactions);
    setCsvData(initialValues);
    setStep(1);
  }, [addTransactions, csvData.transactions]);

  const handleCloseModal = useCallback(() => {
    handleClose();
    setCsvData(initialValues);
    setStep(1);
  }, [handleClose]);

  const renderStepComponents = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <FormComponent
            cachedValues={{
              approver: csvData.approver,
              batchName: csvData.batchName,
              fileName: csvData.fileName,
            }}
            setCsvData={setCsvData}
          />
        );
      case 2:
        return <ReviewRecordsComponent transactions={csvData.transactions} />;
      case 3:
        return <SummaryComponent csvData={csvData} />;
    }
  }, [step, csvData]);

  const goToStep1 = useCallback(() => setStep(1), []);
  const goToStep2 = useCallback(() => setStep(2), []);
  const goToStep3 = useCallback(() => setStep(3), []);

  const renderButtons = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <Button
            variant="outlined"
            onClick={goToStep2}
            disabled={!csvData.transactions.length}
          >
            Next
          </Button>
        );
      case 2:
        return (
          <>
            <Button variant="outlined" onClick={goToStep1}>
              Previous
            </Button>
            <Button
              variant="outlined"
              onClick={goToStep3}
              disabled={!!checkErrors.length}
            >
              Next
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <Button variant="outlined" onClick={goToStep2}>
              Previous
            </Button>
            <Button variant="outlined" onClick={handleAddTransactions}>
              Add transactions
            </Button>
          </>
        );
    }
  }, [
    step,
    csvData.transactions.length,
    checkErrors.length,
    goToStep1,
    goToStep2,
    goToStep3,
    handleAddTransactions,
  ]);

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      fullWidth
      maxWidth="md"
      slotProps={paperSlotProps}
    >
      <DialogTitle sx={dialogTitleSx}>
        {titles[step - 1]}
        {!!checkErrors.length && step === 2 && " - Invalid Batch"}
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={closeButtonSx}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{renderStepComponents}</DialogContent>
      <DialogActions>{renderButtons}</DialogActions>
    </Dialog>
  );
}
