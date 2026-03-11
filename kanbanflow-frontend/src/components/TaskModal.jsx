import React, { useState, useEffect } from 'react';
import { X, Calendar, AlignLeft, User as UserIcon, AlertCircle } from 'lucide-react';
import UserAvatar from './UserAvatar';

const TaskModal = ({ task, isOpen, onClose, users, onSave, onDelete }) => {
    if (!isOpen || !task) return null;

    const [editMode, setEditMode] /* intentionally unused update func for pure UI, but we can make it editable */ = useState(false);
    const [formData, setFormData] = useState({ ...task });

    // Update formdata when task changes
    useEffect(() => {
        setFormData({ ...task });
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    const assignedUserInfo = users.find(u => u.id === formData.assignedUser);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 text-slate-100 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="absolute inset-0 z-0"
                onClick={onClose}
            ></div>

            <div className="glass-card relative z-10 w-full max-w-2xl rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Main Content Area */}
                <div className="p-6 md:w-2/3 border-b md:border-b-0 md:border-r border-white/10">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="bg-transparent border-none outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 w-full text-slate-100"
                            />
                        </h2>
                        <button onClick={onClose} className="md:hidden p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
                            <X className="w-5 h-5 text-slate-300" />
                        </button>
                    </div>

                    <div className="mb-6 space-y-3">
                        <div className="flex items-center gap-2 text-slate-400 font-semibold uppercase text-sm mb-2">
                            <AlignLeft className="w-4 h-4" /> Description
                        </div>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-300 focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition resize-none custom-scrollbar"
                            placeholder="Add a more detailed description..."
                        />
                    </div>
                </div>

                {/* Sidebar Info Area */}
                <div className="p-6 md:w-1/3 bg-slate-900/30">
                    <button onClick={onClose} className="hidden md:flex absolute top-4 right-4 p-2 bg-slate-800/80 rounded-full hover:bg-slate-700 transition border border-white/5">
                        <X className="w-4 h-4 text-slate-300" />
                    </button>

                    <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4 tracking-wider">Task Details</h3>

                    <div className="space-y-5">
                        <div>
                            <label className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                                <AlertCircle className="w-3 h-3" /> Priority
                            </label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-fuchsia"
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                                <UserIcon className="w-3 h-3" /> Assignee
                            </label>
                            <select
                                name="assignedUser"
                                value={formData.assignedUser || ''}
                                onChange={handleChange}
                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-fuchsia"
                            >
                                <option value="">Unassigned</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                            {assignedUserInfo && (
                                <div className="flex items-center gap-2 mt-2 px-2">
                                    <UserAvatar user={assignedUserInfo} className="w-6 h-6" />
                                    <span className="text-xs text-slate-300">{assignedUserInfo.name}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-10 space-y-3">
                        <button
                            onClick={handleSave}
                            className="w-full bg-gradient-to-r from-neonBlue to-fuchsia hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2.5 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all hover:shadow-[0_0_20px_rgba(217,70,239,0.5)] active:scale-95"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold py-2.5 rounded-xl transition-all active:scale-95"
                        >
                            Delete Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
