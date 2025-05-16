
import { useState } from "react";
import YearDashboard from "@/components/YearDashboard";
import Header from "@/components/Header";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentDate={currentDate} onDateChange={setCurrentDate} />
      
      <main className="container mx-auto p-4 pb-20">
        <YearDashboard year={currentYear} />
      </main>
    </div>
  );
};

export default Home;
