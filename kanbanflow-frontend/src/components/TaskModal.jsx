import React, { useState, useEffect } from 'react';
import { expandTaskScope, getTaskComments } from '../services/api';
import { X, Calendar, AlignLeft, User as UserIcon, AlertCircle, MessageSquare } from 'lucide-react';
import UserAvatar from './UserAvatar';

const TaskModal = ({ task, isOpen, onClose, users, onSave, onDelete }) => {
    if (!isOpen || !task) return null;

    const [editMode, setEditMode] /* intentionally unused update func for pure UI, but we can make it editable */ = useState(false);
    const [formData, setFormData] = useState({ ...task });
    const [isExpanding, setIsExpanding] = useState(false);
    const [comments, setComments] = useState([]);

    // Update formdata when task changes
    useEffect(() => {
        setFormData({ ...task });
        if (task && task.id) {
            fetchComments(task.id);
        }
    }, [task]);

    const fetchComments = async (taskId) => {
        try {
            const res = await getTaskComments(taskId);
            setComments(res.data);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    };

    const handleExpandScope = async () => {
        setIsExpanding(true);
        try {
            const response = await expandTaskScope(task.id, formData.title);
            setFormData(prev => ({ 
                ...prev, 
                subtasks: response.data.subtasks,
                acceptanceCriteria: response.data.acceptanceCriteria,
                edgeCases: response.data.edgeCases
            }));
            onSave(response.data); // save and update parent
        } catch (error) {
            console.error("Failed to expand scope", error);
        } finally {
            setIsExpanding(false);
        }
    };

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
                <div className="p-6 md:w-2/3 border-b md:border-b-0 md:border-r border-white/10 max-h-[85vh] overflow-y-auto custom-scrollbar">
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
                            rows={3}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-300 focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition resize-none custom-scrollbar"
                            placeholder="Add a more detailed description..."
                        />
                        {(!formData.subtasks || formData.subtasks.length === 0) && (
                            <button 
                                onClick={handleExpandScope} 
                                disabled={isExpanding}
                                className="mt-2 text-xs bg-fuchsia/20 hover:bg-fuchsia/40 text-fuchsia border border-fuchsia/50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 w-full justify-center"
                            >
                                {isExpanding ? "Expanding..." : "✨ Expand Scope (AI)"}
                            </button>
                        )}
                        
                        {formData.subtasks && formData.subtasks.length > 0 && (
                            <div className="mt-6 space-y-4">
                                <div>
                                    <h4 className="font-semibold text-slate-200 mb-2 border-b border-white/10 pb-1">Subtasks</h4>
                                    <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">
                                        {formData.subtasks.map((item, idx) => <li key={idx}>{item}</li>)}
                                    </ul>
                                </div>
                                
                                {formData.acceptanceCriteria && formData.acceptanceCriteria.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-slate-200 mb-2 border-b border-white/10 pb-1">Acceptance Criteria</h4>
                                        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">
                                            {formData.acceptanceCriteria.map((item, idx) => <li key={idx}>{item}</li>)}
                                        </ul>
                                    </div>
                                )}
                                
                                {formData.edgeCases && formData.edgeCases.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-rose-300 mb-2 border-b border-white/10 pb-1">Edge Cases / Blockers</h4>
                                        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">
                                            {formData.edgeCases.map((item, idx) => <li key={idx}>{item}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {comments && comments.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2 text-slate-400 font-semibold uppercase text-sm mb-4">
                                    <MessageSquare className="w-4 h-4" /> Agent Audit Log
                                </div>
                                <div className="space-y-3">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="bg-slate-800/80 rounded-xl p-3 border border-indigo-500/20 shadow-sm relative overflow-hidden group">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-xl"></div>
                                            <div className="flex items-start justify-between gap-2 pl-2">
                                                <div className="flex-1">
                                                    <span className="text-xs font-bold text-indigo-400 block mb-1">
                                                        System Agent
                                                    </span>
                                                    <p className="text-sm text-slate-200">
                                                        {comment.message}
                                                    </p>
                                                </div>
                                                <span className="text-[10px] text-slate-500 whitespace-nowrap whitespace-nowrap shrink-0">
                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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
