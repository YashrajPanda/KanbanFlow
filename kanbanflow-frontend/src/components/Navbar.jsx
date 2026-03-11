import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="glass sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between border-b border-white/10 shadow-lg mb-8">
            <Link to="/" className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-105 active:scale-95">
                <div className="bg-gradient-to-br from-neonBlue to-fuchsia p-2 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] transition-shadow">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Kanban<span className="text-neonBlue">Flow</span>
                </span>
            </Link>

            <div className="flex items-center gap-4">
                {/* Placeholder for future global controls or user profile */}
                <div className="hidden sm:flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        JD
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
