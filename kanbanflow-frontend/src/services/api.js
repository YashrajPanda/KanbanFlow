import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getBoards = () => api.get('/boards');
export const getBoardsByUserId = (userId) => api.get(`/boards/user/${userId}`);
export const getBoard = (id) => api.get(`/boards/${id}`);
export const createBoard = (boardData) => api.post('/boards', boardData);
export const updateBoard = (id, boardData) => api.put(`/boards/${id}`, boardData);
export const deleteBoard = (id) => api.delete(`/boards/${id}`);

export const getTasks = (boardId) => api.get(`/tasks/board/${boardId}`);
export const createTask = (taskData) => api.post('/tasks', taskData);
export const updateTask = (taskId, taskData) => api.put(`/tasks/${taskId}`, taskData);
export const updateTaskStatus = (taskId, status) => api.patch(`/tasks/${taskId}/status`, { status });
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);
export const expandTaskScope = (taskId, prompt) => api.post(`/tasks/${taskId}/expand`, { prompt });
export const getTaskComments = (taskId) => api.get(`/tasks/${taskId}/comments`);
export const triggerAiAudit = () => api.post('/agent/audit');

export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

export default api;
