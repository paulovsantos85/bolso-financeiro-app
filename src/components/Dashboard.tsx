
import { useState } from 'react';
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  Cell, 
  Legend, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  getCategoryName, 
  getCategoryTotals, 
  getMonthData,
  mockIncome
} from '@/utils/mockData';
import { 
  formatCurrency 
} from '@/utils/formatters';

interface DashboardProps {
  month: number;
  year: number;
}

export function Dashboard({ month, year }: DashboardProps) {
  const monthData = getMonthData(month, year);
  const categoryTotals = getCategoryTotals(month, year);
  
  // Filter out categories with zero expenses
  const filteredCategories = categoryTotals.filter(cat => cat.total > 0);
  
  // Prepare data for income and expenses comparison chart
  const incomeVsExpensesData = [
    { name: 'Receitas', value: monthData.totalIncome, fill: '#10B981' },
    { name: 'Despesas', value: monthData.totalExpenses, fill: '#EF4444' }
  ];
  
  // Prepare data for income breakdown chart
  const incomeData = mockIncome
    .filter(income => income.month === month && income.year === year)
    .map(income => ({
      name: income.name,
      value: income.amount,
      fill: '#10B981'
    }));
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Renda Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-blue">
              {formatCurrency(monthData.totalIncome)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Despesa Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-red">
              {formatCurrency(monthData.totalExpenses)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Saldo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${monthData.balance >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
              {formatCurrency(monthData.balance)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expenses by Category Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Despesas por Categoria</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-80">
            {filteredCategories.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={filteredCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${Math.round(percent * 100)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="total"
                    nameKey="category"
                  >
                    {filteredCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), "Total"]} 
                    labelFormatter={(label: string) => getCategoryName(label as any)}
                  />
                  <Legend 
                    formatter={(value: string) => getCategoryName(value as any)}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Sem despesas para mostrar neste mês</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Income vs Expenses Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Receitas x Despesas</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={incomeVsExpensesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="value">
                  {incomeVsExpensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Income Breakdown Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento de Rendimentos</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-80">
            {incomeData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={incomeData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 70,
                  }}
                >
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="value" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Sem rendimentos para mostrar neste mês</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
