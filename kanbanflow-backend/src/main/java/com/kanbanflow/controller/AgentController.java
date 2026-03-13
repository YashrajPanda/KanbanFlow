package com.kanbanflow.controller;

import com.kanbanflow.service.TaskMonitorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/agent")
@RequiredArgsConstructor
public class AgentController {

    private final TaskMonitorService taskMonitorService;

    @PostMapping("/audit")
    public ResponseEntity<String> triggerAudit() {
        taskMonitorService.performAudit();
        return ResponseEntity.ok("Agent audit triggered successfully.");
    }
}
