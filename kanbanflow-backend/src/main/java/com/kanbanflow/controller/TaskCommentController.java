package com.kanbanflow.controller;

import com.kanbanflow.model.TaskComment;
import com.kanbanflow.repository.TaskCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskCommentController {

    private final TaskCommentRepository taskCommentRepository;

    @GetMapping("/{taskId}/comments")
    public ResponseEntity<List<TaskComment>> getCommentsForTask(@PathVariable String taskId) {
        return ResponseEntity.ok(taskCommentRepository.findByTaskIdOrderByCreatedAtDesc(taskId));
    }
}
