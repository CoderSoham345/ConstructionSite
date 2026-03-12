import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Sun, 
  Moon, 
  LogOut, 
  User, 
  HardHat, 
  Menu, 
  X 
} from 'lucide-react';

const Navbar = () => {
    const { user, logout, isDark, toggleTheme } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Don't show navbar on Login page
    if (location.pathname === '/login') return null;

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    
                    {/* LOGO */}
                    <div className="flex items-center gap-3">
                        <NavLink to="/" className="flex items-center gap-3">
                            <div className="bg-primary-600 text-white p-2 rounded-lg">
                                <HardHat size={24} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">BuildFlow</span>
                        </NavLink>
                    </div>

                    {/* DESKTOP CONTROLS (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-4">
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 pl-4 border-l border-slate-200 dark:border-slate-700">
                            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                                {user?.name.charAt(0)}
                            </div>
                            <span>{user?.name}</span>
                        </div>
                        
                        <button 
                            onClick={logout} 
                            className="p-2 text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium"
                            title="Logout"
                        >
                            <LogOut size={18} /> <span>Logout</span>
                        </button>
                    </div>

                    {/* MOBILE CONTROLS (Hamburger) */}
                    <div className="flex items-center md:hidden gap-2">
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE DROPDOWN MENU */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-lg animate-fade-in-down">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        
                        {/* User Profile in Mobile */}
                        <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-lg">
                                {user?.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</p>
                                <p className="text-xs text-slate-500">{user?.email}</p>
                            </div>
                        </div>

                        {/* Links could go here if you want "Dashboard", "Projects" links in the menu */}
                        {/* <NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">Dashboard</NavLink> */}

                        {/* Logout Button */}
                        <button 
                            onClick={() => {
                                logout();
                                setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                        >
                            <LogOut size={20} /> Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;