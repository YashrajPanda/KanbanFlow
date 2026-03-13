import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import UserAvatar from './UserAvatar';
import { expandTaskScope } from '../services/api';

const priorityColors = {
    LOW: 'border-l-4 border-l-emerald-400',
    MEDIUM: 'border-l-4 border-l-amber-400',
    HIGH: 'border-l-4 border-l-rose-500'
};

const priorityBadges = {
    LOW: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    MEDIUM: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    HIGH: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
};

const TaskCard = ({ task, index, user, onClick }) => {
    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const [isExpanding, setIsExpanding] = React.useState(false);

    const handleExpandAction = async (e) => {
        e.stopPropagation(); // prevent opening modal
        setIsExpanding(true);
        try {
            const response = await expandTaskScope(task.id, task.title);
            if (onClick) {
                 window.location.reload(); 
            }
        } catch (error) {
            console.error("Failed to expand scope", error);
        } finally {
            setIsExpanding(false);
        }
    };

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onClick(task)}
                    className={`glass-card p-4 rounded-xl mb-3 cursor-grab active:cursor-grabbing transition-all duration-200 group hover:shadow-lg hover:shadow-neonBlue/20 ${priorityColors[task.priority] || 'border-l-4 border-l-slate-500'} ${snapshot.isDragging ? 'shadow-2xl shadow-neonBlue/40 scale-105 z-50 ring-2 ring-fuchsia/50' : ''
                        }`}
                    style={{
                        ...provided.draggableProps.style,
                    }}
                >
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-slate-100 group-hover:text-neonBlue transition-colors line-clamp-2">
                            {task.title}
                        </h4>
                        {task.labels && task.labels.includes("BLOCKER") && (
                            <span className="bg-red-500/20 text-red-400 border border-red-500/50 text-[10px] uppercase font-bold px-2 py-0.5 rounded ml-2 whitespace-nowrap">
                                BLOCKER
                            </span>
                        )}
                    </div>

                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                        {task.description}
                    </p>

                    {(!task.subtasks || task.subtasks.length === 0) && (
                        <button 
                            onClick={handleExpandAction}
                            disabled={isExpanding}
                            className="w-full mb-4 text-xs bg-fuchsia/20 hover:bg-fuchsia/40 text-fuchsia border border-fuchsia/50 px-2 py-1.5 rounded-lg transition-colors flex justify-center items-center gap-1"
                        >
                            {isExpanding ? "Expanding..." : <><Sparkles className="w-3 h-3"/> Expand Scope (AI)</>}
                        </button>
                    )}

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex gap-2 items-center">
                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md ${priorityBadges[task.priority]}`}>
                                {task.priority || 'NONE'}
                            </span>

                            {task.dueDate && (
                                <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-md">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(task.dueDate)}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex -space-x-2">
                            {user && <UserAvatar user={user} className="w-7 h-7" />}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
