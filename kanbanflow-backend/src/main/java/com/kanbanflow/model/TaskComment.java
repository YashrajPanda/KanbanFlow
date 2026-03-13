package com.kanbanflow.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "task_comments")
public class TaskComment {
    @Id
    private String id;
    private String taskId;
    private String userId; // System agent or normal user
    private String message;
    private LocalDateTime createdAt;
}
