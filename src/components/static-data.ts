import type {
  Column,
  CSVData,
  Transaction,
  TransactionStatus,
} from "#components/types";

export const ROW_OPTIONS = [5, 10, 15] as const;

export const approvers = [
  "Tessa Watson",
  "Miley Knicks",
  "Steve Harcins",
] as const;

export const columns: readonly Column[] = [
  { id: "transactionDate", label: "Transaction Date" },
  { id: "accountNumber", label: "Account Number" },
  {
    id: "accountHolderName",
    label: "Account Holder Name",
  },
  {
    id: "amount",
    label: "Amount",
  },
  {
    id: "status",
    label: "Status",
  },
] as const;

export const initialValues: CSVData = {
  batchName: "",
  approver: "",
  transactions: [],
  fileName: "",
} as const;

export const statuses = [
  {
    name: "Settled" as TransactionStatus,
  },
  {
    name: "Pending" as TransactionStatus,
  },
  {
    name: "Failed" as TransactionStatus,
    error: "Transaction has been declined.",
  },
] as const;

export const initialTransactions: readonly Transaction[] = [
  {
    id: "seed-000",
    transactionDate: "2024-01-15",
    accountNumber: "ACC-011890999-23",
    accountHolderName: "Alice Johnson",
    amount: "1.00",
    status: {
      name: "Settled",
    },
  },
  {
    id: "seed-001",
    transactionDate: "2024-01-18-s",
    accountNumber: "ACC-007890911-23",
    accountHolderName: "Bob Martinez",
    amount: "340.75",
    status: {
      name: "Failed",
      error: "Transaction has been declined.",
    },
  },
  {
    id: "seed-002",
    transactionDate: "2024-01-20",
    accountNumber: "ACC-007110999-23",
    accountHolderName: "Clara Thompson",
    amount: "5800",
    status: {
      name: "Failed",
      error: "Transaction has been declined.",
    },
  },
  {
    id: "seed-003",
    transactionDate: "2024-01-22",
    accountNumber: "ACC-007340999-23",
    accountHolderName: "David Lee",
    amount: "99.99",
    status: {
      name: "Pending",
    },
  },
  {
    id: "seed-004",
    transactionDate: "2024-01-25",
    accountNumber: "ACC-007890999-23",
    accountHolderName: "Emma Wilson",
    amount: "3123",
    status: {
      name: "Failed",
      error: "Transaction has been declined.",
    },
  },
  {
    id: "seed-005",
    transactionDate: "2024-02-01",
    accountNumber: "ACC-007890999-53",
    accountHolderName: "Frank Garcia",
    amount: "750",
    status: {
      name: "Settled",
    },
  },
  {
    id: "seed-006",
    transactionDate: "2024-02-03",
    accountNumber: "ACC-0067assad",
    accountHolderName: "Grace Kim",
    amount: "430.2",
    status: {
      name: "Settled",
    },
  },
  {
    id: "seed-007",
    transactionDate: "2024-02-07",
    accountNumber: "ACC-007890999-26",
    accountHolderName: "Henry Patel",
    amount: "12500",
    status: {
      name: "Pending",
    },
  },
  {
    id: "seed-008",
    transactionDate: "2024-02-10",
    accountNumber: "ACC-007890999-22",
    accountHolderName: "Isabella Nguyen",
    amount: "60",
    status: {
      name: "Pending",
    },
  },
  {
    id: "seed-009",
    transactionDate: "2024-02-14",
    accountNumber: "ACC-007890999-21",
    accountHolderName: "James Robinson",
    amount: "3300",
    status: {
      name: "Settled",
    },
  },
] as const;
