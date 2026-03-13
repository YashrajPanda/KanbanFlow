package com.kanbanflow.service;

import com.kanbanflow.model.Task;
import com.kanbanflow.model.TaskStatus;
import com.kanbanflow.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final AiService aiService;

    public List<Task> getTasksByBoardId(String boardId) {
        return taskRepository.findByBoardId(boardId);
    }

    public Task createTask(Task task) {
        if (task.getCreatedAt() == null) {
            task.setCreatedAt(LocalDateTime.now());
        }
        return taskRepository.save(task);
    }

    public Optional<Task> getTaskById(String taskId) {
        return taskRepository.findById(taskId);
    }

    public Task updateTask(String taskId, Task taskDetails) {
        return taskRepository.findById(taskId).map(task -> {
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setPriority(taskDetails.getPriority());
            task.setDueDate(taskDetails.getDueDate());
            task.setAssignedUser(taskDetails.getAssignedUser());
            task.setStatus(taskDetails.getStatus());
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
    }

    public Task updateTaskStatus(String taskId, TaskStatus status) {
        return taskRepository.findById(taskId).map(task -> {
            task.setStatus(status);
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
    }

    public void deleteTask(String taskId) {
        taskRepository.deleteById(taskId);
    }

    public com.kanbanflow.dto.AiExpansionResponse expandTaskScope(String taskId, String prompt) {
        return taskRepository.findById(taskId).map(task -> {
            com.kanbanflow.dto.AiExpansionResponse expanded = aiService.expandScope(prompt);
            task.setSubtasks(expanded.getSubtasks());
            task.setAcceptanceCriteria(expanded.getAcceptanceCriteria());
            task.setEdgeCases(expanded.getEdgeCases());
            taskRepository.save(task);
            return expanded;
        }).orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
    }
}
