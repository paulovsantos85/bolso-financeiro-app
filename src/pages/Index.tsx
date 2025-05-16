
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import ExpenseList from "@/components/ExpenseList";
import ExpenseForm from "@/components/ExpenseForm";
import IncomeForm from "@/components/IncomeForm";
import { ExpenseCategory, ExpenseItem, Income } from "@/utils/types";
import { mockExpenses, mockIncome } from "@/utils/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expenses, setExpenses] = useState<ExpenseItem[]>(mockExpenses);
  const [income, setIncome] = useState<Income[]>(mockIncome);
  
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
  const currentYear = currentDate.getFullYear();

  const handleAddExpense = (expense: {
    name: string;
    category: ExpenseCategory;
    subcategory: string;
    amount: number;
    date: string;
  }) => {
    const date = new Date(expense.date);
    const newExpense: ExpenseItem = {
      id: uuidv4(),
      name: expense.name,
      category: expense.category,
      subcategory: expense.subcategory,
      amount: expense.amount,
      date: expense.date,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };

    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleAddIncome = (income: {
    name: string;
    amount: number;
    date: string;
  }) => {
    const date = new Date(income.date);
    const newIncome: Income = {
      id: uuidv4(),
      name: income.name,
      amount: income.amount,
      date: income.date,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };

    setIncome((prev) => [...prev, newIncome]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentDate={currentDate} onDateChange={setCurrentDate} />
      
      <main className="container mx-auto p-4 pb-20">
        <Tabs defaultValue="dashboard">
          <TabsList className="w-full">
            <TabsTrigger value="dashboard" className="flex-1">Dashboard</TabsTrigger>
            <TabsTrigger value="expenses" className="flex-1">Despesas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-4 space-y-6">
            <Dashboard month={currentMonth} year={currentYear} />
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ExpenseForm 
                month={currentMonth} 
                year={currentYear}
                onAddExpense={handleAddExpense} 
              />
              <IncomeForm 
                month={currentMonth} 
                year={currentYear}
                onAddIncome={handleAddIncome}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-4">
            <ExpenseList month={currentMonth} year={currentYear} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
