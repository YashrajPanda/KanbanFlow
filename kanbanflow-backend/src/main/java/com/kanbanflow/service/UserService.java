package com.kanbanflow.service;

import com.kanbanflow.model.User;
import com.kanbanflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }
    
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (password == null || !password.equals(user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return user;
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }
}
