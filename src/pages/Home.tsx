
import { useState } from "react";
import { Link } from "react-router-dom";
import YearDashboard from "@/components/YearDashboard";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentDate={currentDate} onDateChange={setCurrentDate} />
      
      <main className="container mx-auto p-4 pb-20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Resumo Anual</h1>
          <Link to="/debts">
            <Button className="bg-finance-yellow text-finance-darkgray hover:bg-finance-darkyellow">
              <CreditCard size={18} />
              <span>Adicionar Dívidas</span>
            </Button>
          </Link>
        </div>
        
        <YearDashboard year={currentYear} />
      </main>
    </div>
  );
};

export default Home;
