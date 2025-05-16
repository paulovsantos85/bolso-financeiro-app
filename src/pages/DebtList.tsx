
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/utils/formatters";
import { Debt } from "@/utils/types";

const DEFAULT_DEBTS = [
  { id: "1", name: "Cheque especial Banco 1", institution: "", installmentValue: 0, totalValue: 0 },
  { id: "2", name: "Cheque especial Banco 2", institution: "", installmentValue: 0, totalValue: 0 },
  { id: "3", name: "Cheque especial Banco 3", institution: "", installmentValue: 0, totalValue: 0 },
  { id: "4", name: "Cartão 1", institution: "", installmentValue: 0, totalValue: 0 },
  { id: "5", name: "Cartão 2", institution: "", installmentValue: 0, totalValue: 0 },
  { id: "6", name: "Cartão 3", institution: "", installmentValue: 0, totalValue: 0 },
  { id: "7", name: "Empréstimo 1", institution: "", installmentValue: 0, totalValue: 0 },
  { id: "8", name: "Empréstimo 2", institution: "", installmentValue: 0, totalValue: 0 },
  { id: "9", name: "Empréstimo 3", institution: "", installmentValue: 0, totalValue: 0 },
  { id: "10", name: "Outros", institution: "", installmentValue: 0, totalValue: 0 },
];

const DebtList = () => {
  const [debts, setDebts] = useState<Debt[]>(DEFAULT_DEBTS);
  const { toast } = useToast();

  const handleUpdateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(prevDebts => 
      prevDebts.map(debt => 
        debt.id === id ? { ...debt, [field]: value } : debt
      )
    );
  };

  const getTotalDebt = () => {
    return debts.reduce((total, debt) => total + Number(debt.installmentValue), 0);
  };

  const getTotalValue = () => {
    return debts.reduce((total, debt) => total + Number(debt.totalValue), 0);
  };

  const handleAddNewDebt = () => {
    const newId = (debts.length + 1).toString();
    const newDebt: Debt = {
      id: newId,
      name: `Dívida ${newId}`,
      institution: "",
      installmentValue: 0,
      totalValue: 0
    };
    
    setDebts([...debts, newDebt]);
  };

  const handleDeleteDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
    toast({
      title: "Dívida removida",
      description: "A dívida foi removida com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/home" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={18} className="mr-1" />
            <span>Voltar</span>
          </Link>
          <h1 className="text-2xl font-bold">Dívidas</h1>
          <Button 
            onClick={handleAddNewDebt}
            variant="outline"
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            <span>Nova Dívida</span>
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="bg-finance-yellow">
            <CardTitle className="text-finance-darkgray">DÍVIDAS</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">NOME</TableHead>
                  <TableHead className="w-1/4">INSTITUIÇÃO</TableHead>
                  <TableHead className="w-1/6">VALOR DA PARCELA</TableHead>
                  <TableHead className="w-1/6">VALOR TOTAL</TableHead>
                  <TableHead className="w-1/12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {debts.map((debt) => (
                  <TableRow key={debt.id}>
                    <TableCell>
                      <Input 
                        value={debt.name}
                        onChange={(e) => handleUpdateDebt(debt.id, "name", e.target.value)}
                        className="border-0 focus-visible:ring-0 p-0 h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        value={debt.institution}
                        onChange={(e) => handleUpdateDebt(debt.id, "institution", e.target.value)}
                        className="border-0 focus-visible:ring-0 p-0 h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number"
                        value={debt.installmentValue || ""}
                        onChange={(e) => handleUpdateDebt(debt.id, "installmentValue", parseFloat(e.target.value) || 0)}
                        className="border-0 focus-visible:ring-0 p-0 h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number"
                        value={debt.totalValue || ""}
                        onChange={(e) => handleUpdateDebt(debt.id, "totalValue", parseFloat(e.target.value) || 0)}
                        className="border-0 focus-visible:ring-0 p-0 h-8"
                      />
                    </TableCell>
                    <TableCell>
                      {debt.id !== "1" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteDebt(debt.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-finance-yellow">
                  <TableCell colSpan={2} className="font-bold">TOTAL</TableCell>
                  <TableCell className="font-bold">{formatCurrency(getTotalDebt())}</TableCell>
                  <TableCell className="font-bold">{formatCurrency(getTotalValue())}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-gray-500">
          Copyright 2025 - Gestão Financeira
        </div>
      </div>
    </div>
  );
};

export default DebtList;
