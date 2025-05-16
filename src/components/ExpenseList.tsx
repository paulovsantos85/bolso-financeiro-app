
import { useState } from "react";
import { 
  getCategoryColors, 
  getCategoryName, 
  getSubcategoryData 
} from "@/utils/mockData";
import { ExpenseCategory } from "@/utils/types";
import { formatCurrency } from "@/utils/formatters";
import CategoryCard from "./CategoryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExpenseListProps {
  month: number;
  year: number;
}

export function ExpenseList({ month, year }: ExpenseListProps) {
  const subcategoryData = getSubcategoryData(month, year);
  const categoryColors = getCategoryColors();
  
  // Filter out categories with no expenses
  const filteredCategories = subcategoryData.filter(cat => cat.total > 0);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Despesas</h2>
      
      <Tabs defaultValue="list">
        <TabsList className="w-full">
          <TabsTrigger value="list" className="flex-1">Lista</TabsTrigger>
          <TabsTrigger value="categories" className="flex-1">Categorias</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="pt-4 space-y-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <CategoryCard
                key={category.category}
                category={category.category}
                subcategories={category.items}
                total={category.total}
                color={categoryColors[category.category]}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhuma despesa registrada para este mês
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="categories" className="pt-4">
          <div className="grid gap-4">
            {Object.entries(getCategoryColors()).map(([category, color]) => {
              const categoryData = subcategoryData.find(
                (c) => c.category === category
              );
              const total = categoryData?.total || 0;
              
              return (
                <div 
                  key={category} 
                  className="flex items-center justify-between p-4 bg-card border rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: color }} 
                    />
                    <span>
                      {getCategoryName(category as ExpenseCategory)}
                    </span>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(total)}
                  </span>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ExpenseList;
