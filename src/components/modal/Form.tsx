import {
  useRef,
  useState,
  useCallback,
  memo,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import Papa from "papaparse";

import type { CSVData, FormFields, Transaction } from "#components/types";

import { styled } from "@mui/material/styles";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { approvers } from "#components/static-data";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const accountHolderNamePattern = /^\S+.*$/;
const accountNumberPattern = /^\d{3}-\d{9}-\d{2}$/;
const amountPattern = /^(?!0+(\.0+)?$)\d+(\.\d+)?$/;
const ISODatePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const namePattern = /^[a-zA-Z0-9 '._-]+$/;

const flexSx = { flex: 1 } as const;
const marginSx = { "&&": { marginTop: "14px" } } as const;
const errorHelperSx = { color: "error.main", minHeight: 20 } as const;
const uploadBtnSx = { width: "200px" } as const;

interface FormComponentProps {
  cachedValues: Omit<CSVData, "transactions">;
  setCsvData: Dispatch<SetStateAction<CSVData>>;
}

function FormComponent({ cachedValues, setCsvData }: FormComponentProps) {
  const [formFields, setFormFields] = useState<FormFields>(() => ({
    batchName: cachedValues?.batchName ?? "",
    approver: cachedValues?.approver ?? "",
    batchNameError: "",
    approverError: "",
    fileError: "",
    fileName: cachedValues?.fileName ?? "",
  }));

  const formFieldsRef = useRef<FormFields>(formFields);

  const handleBatchNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let error = "";

      if (!value.trim()) {
        error = "Field is required";
      } else if (value.length > 50) {
        error = "Value is too long.";
      } else if (!namePattern.test(value)) {
        error = "Not a valid value.";
      }

      setFormFields((prev) => {
        const next = { ...prev, batchName: value, batchNameError: error };
        formFieldsRef.current = next;
        return next;
      });
    },
    [],
  );

  const handleApproverChange = useCallback((value: string) => {
    setFormFields((prev) => {
      const next = {
        ...prev,
        approver: value,
        approverError: value ? "" : "Field is required",
      };
      formFieldsRef.current = next;
      return next;
    });
  }, []);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file || !file.name.endsWith(".csv")) {
        setFormFields((prev) => ({
          ...prev,
          fileError: "File must be a .csv",
        }));
        return;
      }

      const transactions: Transaction[] = [];

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header: string) => {
          const joined = header.replace(/ /g, "");
          return joined.charAt(0).toLowerCase() + joined.slice(1);
        },
        step: (row: { data: Transaction }, parser: Papa.Parser) => {
          const emptyFields = Object.keys(row.data).filter((key) => {
            const value = row.data[key as keyof Transaction];
            return typeof value === "string" && value.trim() === "";
          });

          if (emptyFields.length > 0) {
            parser.abort();
            setFormFields((prev) => ({
              ...prev,
              fileError: `Invalid file empty fields:  ${emptyFields}!`,
            }));

            setCsvData((prev) => ({
              ...prev,
              batchName: "",
              approver: "",
              transactions: [],
            }));
            return;
          }

          transactions.push(row.data);
        },
        complete: () => {
          if (!transactions.length) {
            setFormFields((prev) => ({ ...prev, fileError: "File is empty!" }));
            return;
          }

          setFormFields((prev) => ({ ...prev, fileError: "" }));

          const mutatedTransactions = transactions.map((transaction) => {
            const errors: string[] = [];

            if (!ISODatePattern.test(transaction.transactionDate))
              errors.push("Date is invalid");
            if (!accountNumberPattern.test(transaction.accountNumber))
              errors.push("Account number is invalid");
            if (!accountHolderNamePattern.test(transaction.accountHolderName))
              errors.push("Account holder name is invalid");
            if (!amountPattern.test(transaction.amount))
              errors.push("Amount is invalid");

            return {
              ...transaction,
              id: crypto.randomUUID(),
              errors,
            } as Transaction;
          });

          const current = formFieldsRef.current;

          setCsvData((prev) => ({
            ...prev,
            batchName: current.batchName,
            approver: current.approver,
            transactions: mutatedTransactions,
            fileName: file.name,
          }));

          setFormFields((prev) => ({ ...prev, fileName: file.name }));
        },
        error: (err) =>
          setFormFields((prev) => ({ ...prev, fileError: err.message })),
      });
    },
    [setCsvData],
  );

  const isUploadDisabled =
    !!(formFields.batchNameError || formFields.approverError) ||
    !(formFields.batchName && formFields.approver);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} sx={marginSx}>
        <FormControl sx={flexSx}>
          <TextField
            id="batch-name"
            label="Batch Name"
            variant="outlined"
            size="small"
            value={formFields.batchName}
            onChange={handleBatchNameChange}
            error={!!formFields.batchNameError}
          />
          <FormHelperText sx={errorHelperSx}>
            {formFields.batchNameError}
          </FormHelperText>
        </FormControl>
        <FormControl sx={flexSx} size="small">
          <InputLabel id="approver-label">Approver</InputLabel>
          <Select
            labelId="approver-label"
            id="approver-select"
            value={formFields.approver}
            label="Approver"
            onChange={(e) => handleApproverChange(e.target.value)}
            error={!!formFields.approverError}
          >
            {approvers.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={errorHelperSx}>
            {formFields.approverError ?? " "}
          </FormHelperText>
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          component="label"
          sx={uploadBtnSx}
          variant="contained"
          startIcon={<CloudUploadIcon />}
          disabled={isUploadDisabled}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            accept=".csv"
          />
        </Button>
        {formFields.fileName && !formFields.fileError && (
          <Alert severity="success">File uploaded: {formFields.fileName}</Alert>
        )}
        {formFields.fileError && (
          <Alert severity="error">{formFields.fileError}</Alert>
        )}
      </Stack>
    </Stack>
  );
}

export default memo(FormComponent);
