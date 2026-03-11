import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const getColumnColor = (title) => {
    switch (title) {
        case 'TODO': return 'from-slate-800 to-slate-900 border-t-slate-500';
        case 'IN_PROGRESS': return 'from-blue-900/40 to-slate-900 border-t-neonBlue';
        case 'DONE': return 'from-purple-900/40 to-slate-900 border-t-fuchsia';
        default: return 'from-slate-800 to-slate-900 border-t-slate-500';
    }
};

const formatTitle = (title) => {
    return title.replace('_', ' ');
};

const BoardColumn = ({ column, tasks, users, title, onTaskClick }) => {
    return (
        <div className={`glass rounded-2xl flex flex-col w-full min-w-[300px] h-[calc(100vh-12rem)] border-t-4 bg-gradient-to-b ${getColumnColor(title)} shadow-xl overflow-hidden`}>
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                <h3 className="font-bold text-lg text-slate-100 tracking-wide">
                    {formatTitle(title)}
                </h3>
                <span className="bg-slate-800 text-slate-300 text-xs font-bold px-2.5 py-1 rounded-full border border-white/10">
                    {tasks.length}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`min-h-[150px] transition-colors duration-200 rounded-xl ${snapshot.isDraggingOver ? 'bg-white/5 ring-1 ring-white/20' : ''
                                }`}
                        >
                            {tasks.map((task, index) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    user={users.find(u => u.id === task.assignedUser)}
                                    onClick={onTaskClick}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
};

export default BoardColumn;
