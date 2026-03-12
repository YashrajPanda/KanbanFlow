import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getBoards, createBoard, updateBoard, deleteBoard } from '../services/api';
import { Layout, Plus, Loader2, Edit2, Trash2 } from 'lucide-react';

const Dashboard = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');
    const [renamingBoardId, setRenamingBoardId] = useState(null);
    const [editBoardName, setEditBoardName] = useState('');

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            const { data } = await getBoards();
            setBoards(data);
        } catch (error) {
            console.error('Failed to fetch boards:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBoard = async (e) => {
        e.preventDefault();
        if (!newBoardName.trim()) return;

        try {
            const { data } = await createBoard({ boardName: newBoardName });
            setBoards([...boards, data]);
            setNewBoardName('');
            setIsCreating(false);
        } catch (error) {
            console.error('Failed to create board:', error);
        }
    };

    const handleRenameClick = (e, board) => {
        e.preventDefault();
        e.stopPropagation();
        setRenamingBoardId(board.id);
        setEditBoardName(board.boardName);
    };

    const handleRenameSubmit = async (e, boardId) => {
        e.preventDefault();
        e.stopPropagation();
        if (!editBoardName.trim()) return;
        try {
            await updateBoard(boardId, { boardName: editBoardName });
            setBoards(boards.map(b => b.id === boardId ? { ...b, boardName: editBoardName } : b));
            setRenamingBoardId(null);
        } catch (error) {
            console.error('Failed to rename board:', error);
        }
    };

    const handleDeleteClick = async (e, boardId) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this board? All tasks will be permanently deleted.")) {
            try {
                await deleteBoard(boardId);
                setBoards(boards.filter(b => b.id !== boardId));
            } catch (error) {
                console.error('Failed to delete board:', error);
            }
        }
    };

    return (
        <div className="h-screen flex flex-col items-center">
            <Navbar />

            <main className="flex-1 w-full max-w-6xl px-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 mb-2">
                            Your Boards
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">Manage your projects and tasks across different boards.</p>
                    </div>

                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-neonBlue to-fuchsia hover:from-blue-600 hover:to-purple-600 px-5 py-2.5 rounded-xl font-semibold text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(217,70,239,0.4)] transition-all active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        New Board
                    </button>
                </header>

                {isCreating && (
                    <form onSubmit={handleCreateBoard} className="glass-card mb-8 p-6 rounded-2xl border border-neonBlue/30 animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Create New Board</h3>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={newBoardName}
                                onChange={(e) => setNewBoardName(e.target.value)}
                                placeholder="E.g., Website Redesign"
                                className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-6 py-2 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition"
                            >
                                Create
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="bg-transparent border border-slate-400 dark:border-white/20 text-slate-700 dark:text-white font-semibold px-6 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-10 h-10 animate-spin text-neonBlue" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {boards.map(board => (
                            <Link
                                key={board.id}
                                to={`/board/${board.id}`}
                                className="glass-card group p-6 rounded-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Decorative blob */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-fuchsia/20 rounded-full blur-3xl group-hover:bg-neonBlue/30 transition-colors duration-500"></div>

                                <div className="flex items-center justify-between mb-4 relative z-10 w-full">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="p-3 bg-slate-800 rounded-xl border border-white/5 shrink-0">
                                            <Layout className="w-6 h-6 text-neonBlue group-hover:text-fuchsia transition-colors" />
                                        </div>
                                        {renamingBoardId === board.id ? (
                                            <form onSubmit={(e) => handleRenameSubmit(e, board.id)} className="flex items-center gap-2 w-full">
                                                <input 
                                                    type="text" 
                                                    value={editBoardName} 
                                                    onChange={(e) => setEditBoardName(e.target.value)}
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                                    className="w-full bg-slate-900 border border-white/20 rounded px-2 py-1 text-white focus:outline-none focus:border-neonBlue"
                                                    autoFocus
                                                />
                                                <button type="submit" onClick={(e) => e.stopPropagation()} className="text-sm bg-neonBlue/20 text-neonBlue px-2 py-1 rounded hover:bg-neonBlue hover:text-white transition shrink-0">Save</button>
                                                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setRenamingBoardId(null); }} className="text-sm border border-white/20 px-2 py-1 rounded hover:bg-white/10 transition shrink-0">Cancel</button>
                                            </form>
                                        ) : (
                                            <h2 className="text-xl font-bold truncate pr-2 text-slate-900 dark:text-white">{board.boardName}</h2>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    {renamingBoardId !== board.id && (
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                                            <button 
                                                onClick={(e) => handleRenameClick(e, board)}
                                                className="p-2 bg-slate-800/80 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 rounded-lg transition"
                                                title="Rename Board"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={(e) => handleDeleteClick(e, board.id)}
                                                className="p-2 bg-slate-800/80 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg transition"
                                                title="Delete Board"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="text-slate-700 dark:text-slate-400 text-sm flex items-center justify-between relative z-10">
                                    <span>Created {new Date(board.createdAt).toLocaleDateString()}</span>
                                    <div className="font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-white/5 px-2 py-1 rounded">
                                        Open Board &rarr;
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {boards.length === 0 && !isCreating && (
                            <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
                                <p>No boards found. Create one to get started!</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
