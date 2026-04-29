"use client";
import Link from 'next/link';
import { useState } from 'react';
import Icon from '@mdi/react'; 
import { 
  mdiMenu, 
  mdiChevronLeft, 
  mdiPageLayoutBody, 
  mdiReceiptText, 
  mdiChartPie, 
  mdiLogout, 
  mdiHome,
  mdiAccount
} from '@mdi/js'; 
import { useRouter } from 'next/navigation';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const router = useRouter(); // Inicializa el router

  const handleLogout = async () => {
    try {
      // Llamamos a nuestra API de Next.js que borra la cookie
      const res = await fetch('/api/logout', { method: 'POST' });
      
      if (res.ok) {
        // Limpiamos cualquier rastro y mandamos al login
        // Usamos window.location para asegurar un "reset" total del estado
        window.location.href = '/login'; 
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <aside 
      className={`bg-primary text-white hidden md:flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Botón para contraer / Título */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!isCollapsed && <span className="text-xl font-bold overflow-hidden">Finanzas</span>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-slate-700 rounded-lg mx-auto"
        >
          {/* Usamos el componente <Icon /> y le pasamos el path en la prop 'path' */}
          <Icon path={isCollapsed ? mdiMenu : mdiChevronLeft} size={1} />
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem href="/dashboard" icon={mdiHome} label="Inicio" isCollapsed={isCollapsed} />
        <SidebarItem href="/transaction/" icon={mdiReceiptText} label="Transacciones" isCollapsed={isCollapsed} />
        <SidebarItem href="/reporte" icon={mdiChartPie} label="Reportes" isCollapsed={isCollapsed} />
        <SidebarItem href='/users' icon={mdiAccount} label='Usuarios' isCollapsed={isCollapsed}/>
      </nav>

      {/* Botón Salir */}
      <div className="p-4 border-t border-slate-700">
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-4 w-full p-2 text-white hover:text-red-300 transition-all"
        >
          <Icon path={mdiLogout} size={1} />
          {!isCollapsed && <span className="whitespace-nowrap">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  href: string;
  icon: string; 
  label: string;
  isCollapsed: boolean;
}

function SidebarItem({ href, icon, label, isCollapsed }: SidebarItemProps) {
  return (
    <Link href={href} className="flex items-center gap-4 p-3 rounded hover:bg-slate-700 transition-all">
      <div className="min-w-[24px]">
        <Icon path={icon} size={0.8} />
      </div>
      {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
    </Link>
  );
}