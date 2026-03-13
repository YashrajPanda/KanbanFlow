package com.kanbanflow.service;

import com.kanbanflow.model.Board;
import com.kanbanflow.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final com.kanbanflow.repository.TaskRepository taskRepository;

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public List<Board> getBoardsByUserId(String userId) {
        return boardRepository.findByMembersContaining(userId);
    }

    public Optional<Board> getBoardById(String id) {
        return boardRepository.findById(id);
    }

    public Board createBoard(Board board) {
        if (board.getCreatedAt() == null) {
            board.setCreatedAt(LocalDateTime.now());
        }
        return boardRepository.save(board);
    }

    public Board updateBoard(String id, Board updatedBoard) {
        return boardRepository.findById(id).map(board -> {
            board.setBoardName(updatedBoard.getBoardName());
            return boardRepository.save(board);
        }).orElseThrow(() -> new RuntimeException("Board not found"));
    }

    public void deleteBoard(String id) {
        // Delete all tasks associated with this board
        java.util.List<com.kanbanflow.model.Task> tasksToDelete = taskRepository.findByBoardId(id);
        taskRepository.deleteAll(tasksToDelete);
        boardRepository.deleteById(id);
    }
}
