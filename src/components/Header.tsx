
import { useState } from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const Header = ({ currentDate, onDateChange }: HeaderProps) => {
  const formattedMonth = format(currentDate, 'MMMM yyyy', { locale: pt });

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange(newDate);
  };

  return (
    <header className="bg-finance-yellow p-4 sticky top-0 z-10">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-finance-darkgray mb-1">
          Gestão Financeira
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-finance-darkgray hover:text-finance-darkgray hover:bg-finance-darkyellow"
              onClick={handlePreviousMonth}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-finance-darkgray font-medium capitalize">
                {formattedMonth}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-finance-darkgray hover:text-finance-darkgray hover:bg-finance-darkyellow"
              onClick={handleNextMonth}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
