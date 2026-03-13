package com.kanbanflow.config;

import com.kanbanflow.model.*;
import com.kanbanflow.repository.BoardRepository;
import com.kanbanflow.repository.TaskRepository;
import com.kanbanflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final TaskRepository taskRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0 && boardRepository.count() == 0 && taskRepository.count() == 0) {
            log.info("No data found. Seeding initial data...");

            // 1. Seed Users
            User user1 = User.builder().name("Yashraj Panda").email("yashraj@example.com").password("password").role("Admin").build();
            User user2 = User.builder().name("Developer").email("dev@example.com").password("password").role("Developer").build();

            userRepository.saveAll(Arrays.asList(user1, user2));

            List<String> userIds = Arrays.asList(user1.getId(), user2.getId());

            // 2. Seed Board
            Board board = Board.builder()
                    .boardName("My First Board")
                    .createdAt(LocalDateTime.now())
                    .members(userIds)
                    .build();
            
            boardRepository.save(board);

            // 3. Seed welcome tasks
            Task task1 = Task.builder()
                    .title("Welcome to KanbanFlow!")
                    .description("This is your new custom board. Feel free to drag tasks around.")
                    .priority(Priority.HIGH)
                    .assignedUser(user1.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task2 = Task.builder()
                    .title("Create your own tasks")
                    .description("Use the Add Task button to create new tasks.")
                    .priority(Priority.MEDIUM)
                    .assignedUser(user1.getId())
                    .status(TaskStatus.IN_PROGRESS)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            taskRepository.saveAll(Arrays.asList(task1, task2));

            log.info("Successfully seeded users, a board, and 2 welcome tasks.");
        }
    }
}
