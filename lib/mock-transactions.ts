export type MockTransaction = {
  date: string;
  description: string;
  type: "Credit" | "Debit";
  amount: string;
  balance: string;
};

export const MOCK_TRANSACTIONS: MockTransaction[] = [
  {
    date: "2026-03-02",
    description: "DIRECT DEP PAYROLL ACME CORP",
    type: "Credit",
    amount: "3,240.00",
    balance: "8,412.55",
  },
  {
    date: "2026-03-04",
    description: "POS PURCHASE WHOLE FOODS #441",
    type: "Debit",
    amount: "86.14",
    balance: "8,326.41",
  },
  {
    date: "2026-03-06",
    description: "ACH WITHDRAWAL UTILITIES",
    type: "Debit",
    amount: "142.80",
    balance: "8,183.61",
  },
  {
    date: "2026-03-09",
    description: "ZELLE FROM J. PATEL",
    type: "Credit",
    amount: "250.00",
    balance: "8,433.61",
  },
  {
    date: "2026-03-12",
    description: "ATM WITHDRAWAL 5TH AVE",
    type: "Debit",
    amount: "200.00",
    balance: "8,233.61",
  },
  {
    date: "2026-03-15",
    description: "ONLINE TRANSFER TO SAVINGS",
    type: "Debit",
    amount: "500.00",
    balance: "7,733.61",
  },
];
