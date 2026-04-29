type NavbarProps = {
  title: string
}

export function Navbar({title}: NavbarProps) {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Usuario Activo</span>
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
          
        </div>
      </div>
    </header>
  );
}