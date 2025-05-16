
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseCategory } from "@/utils/types";
import { getCategoryName } from "@/utils/mockData";
import { subcategories } from "@/utils/subcategories";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface ExpenseFormProps {
  month: number;
  year: number;
  onAddExpense: (expense: {
    name: string;
    category: ExpenseCategory;
    subcategory: string;
    amount: number;
    date: string;
  }) => void;
}

export function ExpenseForm({ month, year, onAddExpense }: ExpenseFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory | "">("");
  const [subcategory, setSubcategory] = useState("");
  const [date, setDate] = useState("");
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);

  // Update subcategories when category changes
  useEffect(() => {
    if (category) {
      setAvailableSubcategories(subcategories[category]);
      setSubcategory(""); // Reset subcategory when category changes
    } else {
      setAvailableSubcategories([]);
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !amount || !category || !subcategory || !date) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    onAddExpense({
      name,
      category: category as ExpenseCategory,
      subcategory,
      amount: parseFloat(amount),
      date,
    });

    // Reset form
    setName("");
    setAmount("");
    setCategory("");
    setSubcategory("");
    setDate("");
    setOpen(false);
    
    toast.success("Despesa adicionada com sucesso!");
  };

  const categories: ExpenseCategory[] = [
    "FIXED_EXPENSES",
    "TEMPORARY_EXPENSES",
    "TRANSPORTATION",
    "EDUCATION",
    "HEALTH",
    "LEISURE",
    "PERSONAL",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Despesa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Despesa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Descrição
            </label>
            <Input
              id="name"
              placeholder="Ex: Supermercado"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Valor (R$)
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Categoria
            </label>
            <Select value={category} onValueChange={(value) => setCategory(value as ExpenseCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {getCategoryName(cat)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subcategory"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Subcategoria
            </label>
            <Select 
              value={subcategory} 
              onValueChange={setSubcategory} 
              disabled={!category}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder={category ? "Selecione uma subcategoria" : "Primeiro selecione uma categoria"} />
              </SelectTrigger>
              <SelectContent>
                {availableSubcategories.map((subcat) => (
                  <SelectItem key={subcat} value={subcat}>
                    {subcat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="date"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Data
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ExpenseForm;
