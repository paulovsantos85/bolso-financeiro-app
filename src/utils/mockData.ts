import { CategoryTotal, ExpenseCategory, ExpenseItem, Income, MonthData, SubcategoryData } from "./types";

export const mockExpenses: ExpenseItem[] = [
  {
    id: "1",
    name: "Aluguel",
    category: "FIXED_EXPENSES",
    subcategory: "Moradia",
    amount: 1200,
    date: "2025-01-05",
    month: 1,
    year: 2025,
  },
  {
    id: "2",
    name: "Energia",
    category: "FIXED_EXPENSES",
    subcategory: "Moradia",
    amount: 150,
    date: "2025-01-10",
    month: 1,
    year: 2025,
  },
  {
    id: "3",
    name: "Água",
    category: "FIXED_EXPENSES",
    subcategory: "Moradia",
    amount: 80,
    date: "2025-01-15",
    month: 1,
    year: 2025,
  },
  {
    id: "4",
    name: "Internet",
    category: "FIXED_EXPENSES",
    subcategory: "Moradia",
    amount: 100,
    date: "2025-01-20",
    month: 1,
    year: 2025,
  },
  {
    id: "5",
    name: "Supermercado",
    category: "FIXED_EXPENSES",
    subcategory: "Alimentação",
    amount: 600,
    date: "2025-01-05",
    month: 1,
    year: 2025,
  },
  {
    id: "6",
    name: "Restaurante",
    category: "LEISURE",
    subcategory: "Alimentação fora",
    amount: 200,
    date: "2025-01-12",
    month: 1,
    year: 2025,
  },
  {
    id: "7",
    name: "Combustível",
    category: "TRANSPORTATION",
    subcategory: "Carro",
    amount: 350,
    date: "2025-01-08",
    month: 1,
    year: 2025,
  },
  {
    id: "8",
    name: "Faculdade",
    category: "EDUCATION",
    subcategory: "Mensalidade",
    amount: 900,
    date: "2025-01-10",
    month: 1,
    year: 2025,
  },
  {
    id: "9",
    name: "Plano de Saúde",
    category: "HEALTH",
    subcategory: "Plano",
    amount: 300,
    date: "2025-01-15",
    month: 1,
    year: 2025,
  },
  {
    id: "10",
    name: "Passeio",
    category: "LEISURE",
    subcategory: "Entretenimento",
    amount: 150,
    date: "2025-01-22",
    month: 1,
    year: 2025,
  },
];

export const mockIncome: Income[] = [
  {
    id: "1",
    name: "Salário",
    amount: 4000,
    date: "2025-01-05",
    month: 1,
    year: 2025,
  },
  {
    id: "2",
    name: "Freelance",
    amount: 1000,
    date: "2025-01-15",
    month: 1,
    year: 2025,
  },
];

export const getMonthData = (month: number, year: number): MonthData => {
  const filteredExpenses = mockExpenses.filter(
    (expense) => expense.month === month && expense.year === year
  );
  const filteredIncome = mockIncome.filter(
    (income) => income.month === month && income.year === year
  );

  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalIncome = filteredIncome.reduce(
    (sum, income) => sum + income.amount,
    0
  );

  return {
    month,
    year,
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  };
};

export const getYearData = (year: number): MonthData => {
  let totalIncome = 0;
  let totalExpenses = 0;
  
  // Filtrar despesas e rendimentos do ano especificado
  const yearExpenses = mockExpenses.filter(expense => expense.year === year);
  const yearIncome = mockIncome.filter(income => income.year === year);
  
  // Calcular totais
  totalExpenses = yearExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalIncome = yearIncome.reduce((sum, income) => sum + income.amount, 0);
  
  return {
    month: 0, // 0 representa o ano inteiro
    year,
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  };
};

export const getCategoryColors = (): Record<ExpenseCategory, string> => {
  return {
    FIXED_EXPENSES: "#3B82F6", // Blue
    TEMPORARY_EXPENSES: "#10B981", // Green
    TRANSPORTATION: "#F59E0B", // Amber
    EDUCATION: "#8B5CF6", // Purple
    HEALTH: "#EC4899", // Pink
    LEISURE: "#F97316", // Orange
    PERSONAL: "#6366F1", // Indigo
  };
};

export const getCategoryTotals = (
  month: number,
  year: number
): CategoryTotal[] => {
  const filteredExpenses = mockExpenses.filter(
    (expense) => expense.month === month && expense.year === year
  );
  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categoryColors = getCategoryColors();
  
  const categories: ExpenseCategory[] = [
    "FIXED_EXPENSES",
    "TEMPORARY_EXPENSES",
    "TRANSPORTATION",
    "EDUCATION",
    "HEALTH",
    "LEISURE",
    "PERSONAL"
  ];

  return categories.map((category) => {
    const expenses = filteredExpenses.filter((e) => e.category === category);
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const percentage = totalAmount > 0 ? (total / totalAmount) * 100 : 0;

    return {
      category,
      total,
      color: categoryColors[category],
      percentage,
    };
  });
};

export const getYearCategoryTotals = (year: number): CategoryTotal[] => {
  const filteredExpenses = mockExpenses.filter(expense => expense.year === year);
  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categoryColors = getCategoryColors();
  
  const categories: ExpenseCategory[] = [
    "FIXED_EXPENSES",
    "TEMPORARY_EXPENSES",
    "TRANSPORTATION",
    "EDUCATION",
    "HEALTH",
    "LEISURE",
    "PERSONAL"
  ];

  return categories.map((category) => {
    const expenses = filteredExpenses.filter((e) => e.category === category);
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const percentage = totalAmount > 0 ? (total / totalAmount) * 100 : 0;

    return {
      category,
      total,
      color: categoryColors[category],
      percentage,
    };
  });
};

export const getMonthlyTotals = (year: number) => {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  return months.map(month => {
    const monthData = getMonthData(month, year);
    return {
      name: getMonthName(month),
      income: monthData.totalIncome,
      expenses: monthData.totalExpenses,
      balance: monthData.balance
    };
  });
};

export const getMonthName = (month: number): string => {
  const monthNames = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];
  
  // Os meses em JavaScript são baseados em zero (0-11)
  return monthNames[month - 1] || "";
};

export const getSubcategoryData = (
  month: number,
  year: number
): SubcategoryData[] => {
  const filteredExpenses = mockExpenses.filter(
    (expense) => expense.month === month && expense.year === year
  );
  
  const categories: ExpenseCategory[] = [
    "FIXED_EXPENSES",
    "TEMPORARY_EXPENSES",
    "TRANSPORTATION",
    "EDUCATION",
    "HEALTH",
    "LEISURE",
    "PERSONAL"
  ];

  return categories.map((category) => {
    const categoryExpenses = filteredExpenses.filter(
      (expense) => expense.category === category
    );

    // Group by subcategory
    const subcategories = Array.from(
      new Set(categoryExpenses.map((e) => e.subcategory || "Outros"))
    );

    const items = subcategories.map((subcategory) => {
      const expenses = categoryExpenses.filter(
        (e) => (e.subcategory || "Outros") === subcategory
      );
      const total = expenses.reduce((sum, e) => sum + e.amount, 0);

      return {
        subcategory,
        expenses,
        total,
      };
    });

    const total = items.reduce((sum, item) => sum + item.total, 0);

    return {
      category,
      items,
      total,
    };
  });
};

export const getCategoryName = (category: ExpenseCategory): string => {
  switch (category) {
    case "FIXED_EXPENSES":
      return "Despesas Fixas";
    case "TEMPORARY_EXPENSES":
      return "Despesas Temporárias";
    case "TRANSPORTATION":
      return "Transporte";
    case "EDUCATION":
      return "Educação";
    case "HEALTH":
      return "Saúde";
    case "LEISURE":
      return "Lazer";
    case "PERSONAL":
      return "Despesas Pessoais";
    default:
      return "Outros";
  }
};
