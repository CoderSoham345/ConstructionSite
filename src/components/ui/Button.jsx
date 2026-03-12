const Button = ({ children, onClick, variant = "primary", className = "", type = "button", isLoading = false, ...props }) => {
    const baseStyle = "w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex justify-center items-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-500/30",
        secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white",
        outline: "border-2 border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
    };
    return (
        <button 
            type={type} 
            onClick={onClick} 
            className={`${baseStyle} ${variants[variant]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

export default Button;