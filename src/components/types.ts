export type Step = 1 | 2 | 3;

export type TransactionStatus = "Settled" | "Pending" | "Failed";

type RowKeys =
  | "transactionDate"
  | "accountNumber"
  | "accountHolderName"
  | "amount";

export type Transaction = {
  id: string;
  transactionDate: string;
  accountNumber: string;
  accountHolderName: string;
  amount: string;
  status?: {
    name: TransactionStatus;
    error?: string;
  };
  errors?: string[];
};

export type Column = {
  id: RowKeys | "status";
  label: string;
};

export type CSVData = {
  batchName: string;
  approver: string;
  transactions: Transaction[];
  fileName?: string;
};

export type FormFields = {
  batchName: string;
  approver: string;
  batchNameError: string;
  approverError: string;
  fileError: string;
  fileName: string;
};
