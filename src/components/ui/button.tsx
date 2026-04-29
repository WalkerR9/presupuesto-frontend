interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string; // El texto que dirá el botón
}

export const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="
      w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
      text-white 
      bg-primary hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-focus 
      transition-colors"
    >
      {label}
    </button>
  );
};