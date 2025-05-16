export type ExpenseCategory = 
  | 'FIXED_EXPENSES' 
  | 'TEMPORARY_EXPENSES' 
  | 'TRANSPORTATION' 
  | 'EDUCATION'
  | 'HEALTH'
  | 'LEISURE'
  | 'PERSONAL';

export interface ExpenseItem {
  id: string;
  name: string;
  category: ExpenseCategory;
  subcategory?: string;
  amount: number;
  date: string;
  month: number;
  year: number;
}

export interface Income {
  id: string;
  name: string;
  amount: number;
  date: string;
  month: number;
  year: number;
}

export interface MonthData {
  month: number;
  year: number;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export interface CategoryTotal {
  category: ExpenseCategory;
  total: number;
  color: string;
  percentage: number;
}

export interface SubcategoryData {
  category: ExpenseCategory;
  items: {
    subcategory: string;
    expenses: ExpenseItem[];
    total: number;
  }[];
  total: number;
}

export type Debt = {
  id: string;
  name: string;
  institution: string;
  installmentValue: number;
  totalValue: number;
};
