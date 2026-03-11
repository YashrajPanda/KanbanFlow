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
            User user1 = User.builder().name("Alice Smith").email("alice@example.com").role("Developer").build();
            User user2 = User.builder().name("Bob Jenkins").email("bob@example.com").role("Designer").build();
            User user3 = User.builder().name("Charlie Brown").email("charlie@example.com").role("Product Manager").build();
            User user4 = User.builder().name("Diana Prince").email("diana@example.com").role("QA Engineer").build();

            userRepository.saveAll(Arrays.asList(user1, user2, user3, user4));

            List<String> userIds = Arrays.asList(user1.getId(), user2.getId(), user3.getId(), user4.getId());

            // 2. Seed Board
            Board board = Board.builder()
                    .boardName("KanbanFlow Development")
                    .createdAt(LocalDateTime.now())
                    .members(userIds)
                    .build();
            
            boardRepository.save(board);

            // 3. Seed Tasks
            Task task1 = Task.builder()
                    .title("Setup React UI")
                    .description("Initialize Vite and configure Tailwind CSS.")
                    .priority(Priority.HIGH)
                    .assignedUser(user1.getId())
                    .status(TaskStatus.DONE)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now().minusDays(2))
                    .build();

            Task task2 = Task.builder()
                    .title("Create MongoDB Schemas")
                    .description("Design documents for Users, Boards, and Tasks.")
                    .priority(Priority.HIGH)
                    .assignedUser(user1.getId())
                    .status(TaskStatus.DONE)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now().minusDays(2))
                    .build();

            Task task3 = Task.builder()
                    .title("Build Spring REST APIs")
                    .description("Create controllers and services for basic CRUD.")
                    .priority(Priority.HIGH)
                    .assignedUser(user1.getId())
                    .status(TaskStatus.IN_PROGRESS)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now().minusDays(1))
                    .build();

            Task task4 = Task.builder()
                    .title("Design Glassmorphism Theme")
                    .description("Use fuchsia and blue accents with transparent backgrounds.")
                    .priority(Priority.MEDIUM)
                    .assignedUser(user2.getId())
                    .status(TaskStatus.IN_PROGRESS)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now().minusDays(1))
                    .build();

            Task task5 = Task.builder()
                    .title("Setup React Board Component")
                    .description("Create columns and map tasks into them.")
                    .priority(Priority.HIGH)
                    .assignedUser(user1.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task6 = Task.builder()
                    .title("Implement Drag and Drop")
                    .description("Integrate hello-pangea/dnd for moving tasks between columns.")
                    .priority(Priority.HIGH)
                    .assignedUser(user1.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task7 = Task.builder()
                    .title("Write Product Requirements Document")
                    .description("Outline MVP features for KanbanFlow.")
                    .priority(Priority.LOW)
                    .assignedUser(user3.getId())
                    .status(TaskStatus.DONE)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now().minusDays(5))
                    .build();

            Task task8 = Task.builder()
                    .title("Write Backend Unit Tests")
                    .description("Ensure 80% coverage on Service layer.")
                    .priority(Priority.MEDIUM)
                    .assignedUser(user4.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task9 = Task.builder()
                    .title("Add User Avatars to UI")
                    .description("Fetch and display user avatars or initials on task cards.")
                    .priority(Priority.LOW)
                    .assignedUser(user2.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task10 = Task.builder()
                    .title("Implement Task Click Modal")
                    .description("Show task details when a card is clicked.")
                    .priority(Priority.MEDIUM)
                    .assignedUser(user1.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            // Adding extra 10 tasks to reach 20
            Task task11 = Task.builder()
                    .title("Setup GitHub Actions")
                    .description("Automate CI/CD pipeline")
                    .priority(Priority.MEDIUM)
                    .assignedUser(user4.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();
            
            Task task12 = Task.builder()
                    .title("Create Custom Hooks")
                    .description("Extract logic to `useTasks` and `useBoards` hooks.")
                    .priority(Priority.MEDIUM)
                    .assignedUser(user1.getId())
                    .status(TaskStatus.IN_PROGRESS)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task13 = Task.builder()
                    .title("Fix CORS issues")
                    .description("Ensure WebMvcConfigurer is properly setup.")
                    .priority(Priority.HIGH)
                    .assignedUser(user1.getId())
                    .status(TaskStatus.DONE)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task14 = Task.builder()
                    .title("Configure Axios Instance")
                    .description("Set base URL and default headers.")
                    .priority(Priority.LOW)
                    .assignedUser(user1.getId())
                    .status(TaskStatus.DONE)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task15 = Task.builder()
                    .title("Dockerize Application")
                    .description("Create Dockerfile for backend and frontend.")
                    .priority(Priority.LOW)
                    .assignedUser(user4.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task16 = Task.builder()
                    .title("Review DB Indexes")
                    .description("Ensure fields are properly indexed.")
                    .priority(Priority.MEDIUM)
                    .assignedUser(user1.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task17 = Task.builder()
                    .title("Responsive Navbar")
                    .description("Ensure the navbar works on mobile devices.")
                    .priority(Priority.MEDIUM)
                    .assignedUser(user2.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task18 = Task.builder()
                    .title("User Profile Page")
                    .description("Page to edit user details.")
                    .priority(Priority.LOW)
                    .assignedUser(user3.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task19 = Task.builder()
                    .title("Analytics Dashboard")
                    .description("Simple pie chart for task distribution.")
                    .priority(Priority.LOW)
                    .assignedUser(user3.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            Task task20 = Task.builder()
                    .title("Final QA Pass")
                    .description("Test the entire application flow.")
                    .priority(Priority.HIGH)
                    .assignedUser(user4.getId())
                    .status(TaskStatus.TODO)
                    .boardId(board.getId())
                    .createdAt(LocalDateTime.now())
                    .build();

            taskRepository.saveAll(Arrays.asList(
                    task1, task2, task3, task4, task5, 
                    task6, task7, task8, task9, task10,
                    task11, task12, task13, task14, task15,
                    task16, task17, task18, task19, task20
            ));

            log.info("Successfully seeded users, a board, and 20 tasks.");
        }
    }
}
