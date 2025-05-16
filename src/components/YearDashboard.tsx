
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid,
  Cell, 
  ComposedChart,
  Legend, 
  Line,
  LineChart,
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
  getMonthlyTotals,
  getYearCategoryTotals, 
  getYearData, 
  mockIncome
} from '@/utils/mockData';
import { 
  formatCurrency 
} from '@/utils/formatters';
import { ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

interface YearDashboardProps {
  year: number;
}

export function YearDashboard({ year }: YearDashboardProps) {
  const yearData = getYearData(year);
  const categoryTotals = getYearCategoryTotals(year);
  const monthlyData = getMonthlyTotals(year);
  
  // Filter out categories with zero expenses
  const filteredCategories = categoryTotals.filter(cat => cat.total > 0);
  
  // Prepare data for income by source
  const incomeBySource = mockIncome
    .filter(income => income.year === year)
    .reduce((acc: {name: string, value: number}[], income) => {
      const existingSource = acc.find(src => src.name === income.name);
      if (existingSource) {
        existingSource.value += income.amount;
      } else {
        acc.push({
          name: income.name,
          value: income.amount
        });
      }
      return acc;
    }, []);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resumo Anual de {year}</h1>
        <Link 
          to="/"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Dashboard Mensal <ArrowRight size={14} />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Renda Total Anual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-blue">
              {formatCurrency(yearData.totalIncome)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Despesa Total Anual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-red">
              {formatCurrency(yearData.totalExpenses)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Saldo Anual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${yearData.balance >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
              {formatCurrency(yearData.balance)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Income vs Expenses Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Receitas x Despesas (Mensal)</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)} 
                />
                <Legend />
                <Bar dataKey="income" name="Receita" fill="#10B981" />
                <Bar dataKey="expenses" name="Despesa" fill="#EF4444" />
                <Line type="monotone" dataKey="balance" name="Saldo" stroke="#2563EB" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Expenses by Category Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Despesas por Categoria (Anual)</CardTitle>
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
                  <p className="text-muted-foreground">Sem despesas para mostrar neste ano</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Income by Source Breakdown Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Fontes de Rendimento (Anual)</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              {incomeBySource.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={incomeBySource}
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
                    <Bar dataKey="value" fill="#10B981" name="Valor" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Sem rendimentos para mostrar neste ano</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accumulated Balance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Saldo Acumulado</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData.map((data, index, array) => {
                  // Calcula o saldo acumulado somando todos os saldos anteriores
                  const accumulatedBalance = array
                    .slice(0, index + 1)
                    .reduce((sum, item) => sum + item.balance, 0);
                  
                  return {
                    ...data,
                    accumulatedBalance
                  };
                })}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area 
                  type="monotone" 
                  dataKey="accumulatedBalance" 
                  name="Saldo Acumulado"
                  stroke="#2563EB" 
                  fill="#93C5FD" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default YearDashboard;
