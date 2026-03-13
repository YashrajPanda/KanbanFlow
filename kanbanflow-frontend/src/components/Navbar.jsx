import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isDark, setIsDark] = useState(
        localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <nav className="glass sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between border-b border-white/10 dark:border-white/10 shadow-lg mb-8">
            <Link to="/" className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-105 active:scale-95">
                <div className="bg-gradient-to-br from-neonBlue to-fuchsia p-2 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] transition-shadow">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                    Kanban<span className="text-neonBlue">Flow</span>
                </span>
            </Link>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                    aria-label="Toggle Dark Mode"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                {user && (
                    <div className="hidden sm:flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-500 flex items-center justify-center font-bold text-sm text-slate-700 dark:text-white shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                            {user.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
