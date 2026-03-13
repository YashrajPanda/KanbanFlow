package com.kanbanflow.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
public class Task {
    @Id
    private String id;
    private String title;
    private String description;
    private Priority priority;
    private LocalDateTime dueDate;
    private String assignedUser; // User ID
    private TaskStatus status;
    private String boardId;
    private LocalDateTime createdAt;
    
    private List<String> labels;
    
    private List<String> subtasks;
    private List<String> acceptanceCriteria;
    private List<String> edgeCases;
}
