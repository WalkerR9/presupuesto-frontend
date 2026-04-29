// src/app/(dashboard)/layout.tsx

import { Navbar } from "@/components/ui/navbar";
import { Sidebar } from "@/components/ui/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Tu componente Sidebar que ya tienes */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tu componente Navbar con un título dinámico o fijo */}
        <Navbar title="Panel de Control" />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}