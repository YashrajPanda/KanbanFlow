import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';
import Navbar from '../components/Navbar';
import BoardColumn from '../components/BoardColumn';
import TaskModal from '../components/TaskModal';
import { getBoard, getTasks, updateTaskStatus, getUsers, createTask, updateTask, deleteTask } from '../services/api';
import { ArrowLeft, Loader2, Plus } from 'lucide-react';

const COLUMNS = ['TODO', 'IN_PROGRESS', 'DONE'];

const BoardPage = () => {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [tasks, setTasks] = useState({ TODO: [], IN_PROGRESS: [], DONE: [] });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // newTask state
    const [isCreatingNewTask, setIsCreatingNewTask] = useState(false);
    const [newTaskColumn, setNewTaskColumn] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');

    useEffect(() => {
        fetchBoardData();
    }, [id]);

    const fetchBoardData = async () => {
        try {
            setLoading(true);
            const [boardRes, tasksRes, usersRes] = await Promise.all([
                getBoard(id),
                getTasks(id),
                getUsers()
            ]);

            setBoard(boardRes.data);
            setUsers(usersRes.data);

            const groupedTasks = { TODO: [], IN_PROGRESS: [], DONE: [] };
            tasksRes.data.forEach(task => {
                if (groupedTasks[task.status]) {
                    groupedTasks[task.status].push(task);
                }
            });
            setTasks(groupedTasks);
        } catch (error) {
            console.error('Failed to fetch board data:', error);
        } finally {
            setLoading(false);
        }
    };

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const sourceColumn = source.droppableId;
        const destColumn = destination.droppableId;

        // Optistic UI update
        const sourceTasks = Array.from(tasks[sourceColumn]);
        const destTasks = sourceColumn === destColumn ? sourceTasks : Array.from(tasks[destColumn]);

        const [movedTask] = sourceTasks.splice(source.index, 1);
        movedTask.status = destColumn;
        destTasks.splice(destination.index, 0, movedTask);

        setTasks(prev => ({
            ...prev,
            [sourceColumn]: sourceTasks,
            [destColumn]: destTasks,
        }));

        try {
            if (sourceColumn !== destColumn) {
                await updateTaskStatus(draggableId, destColumn);
            }
            // Re-fetching could happen here but optimistic UI handles it for now.
        } catch (error) {
            console.error('Failed to update task status:', error);
            fetchBoardData(); // Revert back on error
        }
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleSaveModal = async (updatedTask) => {
        try {
            await updateTask(updatedTask.id, updatedTask);
            setIsModalOpen(false);
            fetchBoardData();
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setIsModalOpen(false);
            fetchBoardData();
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleQuickCreateMode = (columnStr) => {
        setNewTaskColumn(columnStr);
        setIsCreatingNewTask(true);
        setNewTaskTitle('');
    };

    const submitNewTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) {
            setIsCreatingNewTask(false);
            return;
        }

        try {
            const newTask = {
                title: newTaskTitle,
                description: '',
                priority: 'MEDIUM',
                status: newTaskColumn,
                boardId: id
            };
            await createTask(newTask);
            setIsCreatingNewTask(false);
            fetchBoardData();
        } catch (error) {
            console.error('Failed to create task:', error);
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center">
                <Navbar />
                <div className="flex-1 flex justify-center items-center">
                    <Loader2 className="w-12 h-12 text-neonBlue animate-spin" />
                </div>
            </div>
        );
    }

    if (!board) return <div className="dark:text-white text-slate-900 text-center mt-20 text-xl font-semibold">Board not found</div>;

    return (
        <div className="h-screen flex flex-col pb-0 overflow-hidden">
            <Navbar />

            <main className="flex-1 px-4 sm:px-6 md:px-8 overflow-hidden flex flex-col max-w-[1600px] w-full mx-auto">
                <header className="mb-6 flex justify-between items-end flex-none fade-in duration-300">
                    <div className="flex flex-col gap-2">
                        <Link to="/" className="text-sm font-semibold text-slate-400 hover:text-white flex items-center gap-1 w-fit transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Boards
                        </Link>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                            {board.boardName}
                        </h1>
                    </div>

                    <div className="hidden sm:flex -space-x-3 items-center">
                        {users.slice(0, 4).map(u => (
                            <div key={u.id} className="w-10 h-10 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800 shadow-md">
                                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${u.name}&backgroundColor=0f172a,1e1b4b,312e81`} alt={u.name} className="w-full h-full object-cover" />
                            </div>
                        ))}
                        {users.length > 4 && (
                            <div className="w-10 h-10 rounded-full border-2 border-slate-900 font-bold bg-slate-800 text-xs flex items-center justify-center text-slate-300 shadow-md">
                                +{users.length - 4}
                            </div>
                        )}
                    </div>
                </header>

                <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar shrink min-h-0">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="flex items-start gap-6 h-full min-w-max px-2">
                            {COLUMNS.map(columnId => (
                                <div key={columnId} className="flex flex-col h-full w-[350px]">
                                    <BoardColumn
                                        title={columnId}
                                        column={{ id: columnId }}
                                        tasks={tasks[columnId] || []}
                                        users={users}
                                        onTaskClick={handleTaskClick}
                                    />

                                    {isCreatingNewTask && newTaskColumn === columnId ? (
                                        <form onSubmit={submitNewTask} className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <input
                                                type="text"
                                                autoFocus
                                                placeholder="Task title..."
                                                value={newTaskTitle}
                                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                                onBlur={() => {
                                                    if (!newTaskTitle) setIsCreatingNewTask(false);
                                                }}
                                                className="w-full bg-white dark:bg-slate-800 border-2 border-neonBlue rounded-xl px-4 py-3 focus:outline-none text-slate-900 dark:text-slate-100 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                                            />
                                        </form>
                                    ) : (
                                        <button
                                            onClick={() => handleQuickCreateMode(columnId)}
                                            className="mt-4 flex items-center gap-2 justify-center py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/10 text-slate-500 dark:text-slate-400 font-semibold hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white dark:hover:border-white/30 hover:border-slate-400 transition-all group"
                                        >
                                            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" /> Add Task
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </DragDropContext>
                </div>
            </main>

            <TaskModal
                task={selectedTask}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                users={users}
                onSave={handleSaveModal}
                onDelete={handleDeleteTask}
            />
        </div>
    );
};

export default BoardPage;
