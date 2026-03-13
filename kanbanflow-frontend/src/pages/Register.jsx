import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register } from '../services/api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await register({ name, email, password, role: 'Member' });
            loginUser(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-1/4 -right-20 w-72 h-72 bg-neonBlue/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-fuchsia/20 rounded-full blur-[100px]" />
            
            <div className="glass-card w-full max-w-md p-8 rounded-2xl border border-white/10 z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-neonBlue to-fuchsia bg-clip-text text-transparent mb-2">Join KanbanFlow</h1>
                    <p className="text-slate-400">Create an account to get started.</p>
                </div>

                {error && <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-sm mb-6">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition"
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <button type="submit" className="w-full bg-gradient-to-r from-neonBlue to-fuchsia hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] active:scale-[0.98] mt-4">
                        Register
                    </button>
                </form>

                <p className="text-center text-slate-400 text-sm mt-6">
                    Already have an account? <Link to="/login" className="text-neonBlue hover:text-fuchsia transition-colors font-semibold">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
