
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { ExpenseCategory } from "@/utils/types";
import { getCategoryName } from "@/utils/mockData";

interface CategoryCardProps {
  category: ExpenseCategory;
  subcategories: {
    subcategory: string;
    total: number;
  }[];
  total: number;
  color: string;
}

export function CategoryCard({ 
  category, 
  subcategories, 
  total, 
  color 
}: CategoryCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <CardHeader
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: color }} 
            />
            <CardTitle className="text-lg">
              {getCategoryName(category)}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {formatCurrency(total)}
            </span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <ul className="space-y-2">
            {subcategories.map((subcat, index) => (
              <li key={index} className="flex justify-between">
                <span className="text-muted-foreground">
                  {subcat.subcategory}
                </span>
                <span>{formatCurrency(subcat.total)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
}

export default CategoryCard;
