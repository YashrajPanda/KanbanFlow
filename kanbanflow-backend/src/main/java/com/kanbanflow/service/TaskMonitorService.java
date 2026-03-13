package com.kanbanflow.service;

import com.kanbanflow.model.*;
import com.kanbanflow.repository.BoardRepository;
import com.kanbanflow.repository.TaskCommentRepository;
import com.kanbanflow.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskMonitorService {

    private final TaskRepository taskRepository;
    private final BoardRepository boardRepository;
    private final TaskCommentRepository taskCommentRepository;
    
    private final Random random = new Random();
    
    private static final List<String> PASSIVE_AGGRESSIVE_COMMENTS = Arrays.asList(
            "Friendly reminder: This task appears to be aging in the In Progress column.",
            "Status update requested. This task has exceeded its expected completion time.",
            "Agent notice: This task might be blocked or forgotten.",
            "Just checking in... is this still being worked on?",
            "This task is gathering dust. Need any help moving it along?"
    );

    @Scheduled(fixedRate = 30000)
    public void monitorTasks() {
        log.info("Starting scheduled task audit...");
        performAudit();
        log.info("Completed scheduled task audit.");
    }
    
    public void performAudit() {
        List<Task> stalledTasks = taskRepository.findByStatusAndDueDateBefore(TaskStatus.IN_PROGRESS, LocalDateTime.now());
        
        for (Task task : stalledTasks) {
            log.info("Auditing stalled task: {}", task.getId());
            
            // Action 1: Reassign Task
            reassignTask(task);
            
            // Action 2: Generate Passive-Aggressive Comment
            addAgentComment(task);
            
            // Action 3: Add Blocker Label
            addBlockerLabel(task);
            
            // Save updated task
            taskRepository.save(task);
        }
    }
    
    private void reassignTask(Task task) {
        if (task.getBoardId() != null) {
            boardRepository.findById(task.getBoardId()).ifPresent(board -> {
                List<String> members = board.getMembers();
                if (members != null && !members.isEmpty()) {
                    List<String> availableMembers = new ArrayList<>(members);
                    if (task.getAssignedUser() != null && availableMembers.size() > 1) {
                        availableMembers.remove(task.getAssignedUser());
                    }
                    String newAssignee = availableMembers.get(random.nextInt(availableMembers.size()));
                    task.setAssignedUser(newAssignee);
                    log.info("Reassigned task {} to user {}", task.getId(), newAssignee);
                }
            });
        }
    }
    
    private void addAgentComment(Task task) {
        String commentMessage = PASSIVE_AGGRESSIVE_COMMENTS.get(random.nextInt(PASSIVE_AGGRESSIVE_COMMENTS.size()));
        TaskComment comment = TaskComment.builder()
                .taskId(task.getId())
                .userId("system-agent")
                .message(commentMessage)
                .createdAt(LocalDateTime.now())
                .build();
                
        taskCommentRepository.save(comment);
        log.info("Added agent comment to task {}", task.getId());
    }
    
    private void addBlockerLabel(Task task) {
        task.setPriority(Priority.HIGH);
        
        List<String> labels = task.getLabels();
        if (labels == null) {
            labels = new ArrayList<>();
        }
        if (!labels.contains("BLOCKER")) {
            labels.add("BLOCKER");
        }
        task.setLabels(labels);
        log.info("Added BLOCKER label and HIGH priority to task {}", task.getId());
    }
}
