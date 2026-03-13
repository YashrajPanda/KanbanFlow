package com.kanbanflow.repository;

import com.kanbanflow.model.TaskComment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskCommentRepository extends MongoRepository<TaskComment, String> {
    List<TaskComment> findByTaskIdOrderByCreatedAtDesc(String taskId);
}
